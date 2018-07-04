import Popper from 'popper.js';
import clickoutMixin from 'bootstrap-vue/src/mixins/clickout';
import listenOnRootMixin from 'bootstrap-vue/src/mixins/listen-on-root';
import { from as arrayFrom } from 'bootstrap-vue/src/utils/array';
import { warn } from 'bootstrap-vue/src/utils';
import { isVisible, selectAll, getAttr, eventOn, eventOff } from 'bootstrap-vue/src/utils/dom';
import KeyCodes from '../utils/key-codes';

// Return an Array of visible items
function filterVisible(els) {
    return (els || []).filter(isVisible);
}

// Dropdown item CSS selectors
const ITEM_SELECTOR = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]';

// eslint-disable-next-line
const VISIBLE_EVENT_TYPES = {
    MOUSE: 'mouse',
    KEYBOARD: 'keyboard'
};

// Popper attachment positions
const AttachmentMap = {
    BOTTOM: 'bottom',
    // Dropdown left Align
    BOTTOMSTART: 'bottom-start',
    // Dropdown Right Align
    BOTTOMEND: 'bottom-end'
};

export default {
    mixins: [clickoutMixin, listenOnRootMixin],
    props: {
        text: {
            // Button label
            type: String,
            default: ''
        },
        dropup: {
            // place on top if possible
            type: Boolean,
            default: false
        },
        position: {
            // Right align menu (default is left align)
            type: String,
            default: AttachmentMap.BOTTOMSTART
        },
        offset: {
            // Number of pixels to offset menu, or a CSS unit value (i.e. 1px, 1rem, etc)
            type: [Number, String],
            default: 0
        },
        popperOpts: {
            type: Object,
            default: () => {}
        },
        disableMenuEvents: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: false,
            inNavbar: null,
            visibleEventType: null
        };
    },
    created() {
        // Create non-reactive property
        this._popper = null;
    },
    mounted() {
        // To keep one dropdown opened on page
        this.listenOnRoot('bv::dropdown::shown', this.rootCloseListener);
        // Hide when clicked on links
        this.listenOnRoot('clicked::link', this.rootCloseListener);
        // Use new namespaced events
        this.listenOnRoot('bv::link::clicked', this.rootCloseListener);
    },
    /* istanbul ignore next: not easy to test */
    deactivated() {
        // In case we are inside a `<keep-alive>`
        this.visible = false;
        this.setTouchStart(false);
        this.removePopper();
    },
    /* istanbul ignore next: not easy to test */
    beforeDestroy() {
        this.visible = false;
        this.setTouchStart(false);
        this.removePopper();
    },
    watch: {
        visible(state, old) {
            if(state === old) {
                // Avoid duplicated emits
                return;
            }

            // IE11 loves to flicker so we need to actually show the menu after popperJS has calculated the position
            if(state) {
                this.$refs.menu.classList.add('is-shown');

                this.showMenu();

                this.$nextTick(() => {
                    this.$refs.menu.classList.add('is-visible');
                });
            } else {
                this.hideMenu();

                this.$refs.menu.classList.remove('is-shown');

                this.$nextTick(() => {
                    this.$refs.menu.classList.remove('is-visible');
                });
            }
        },
        disabled(state, old) {
            if(state !== old && state && this.visible) {
                // Hide dropdown if disabled changes to true
                this.visible = false;
            }
        }
    },
    computed: {
        toggler() {
            return this.$refs.toggle.$el || this.$refs.toggle;
        }
    },
    methods: {
        showMenu() {
            if(this.disabled) {
                return;
            }
            // TODO: move emit show to visible watcher, to allow cancelling of show
            this.$emit('show');

            // Ensure other menus are closed
            this.emitOnRoot('bv::dropdown::shown', this);

            if(this.position !== 'none') {
                /* istnbul ignore next: can't test popper in JSDOM */
                if(typeof Popper === 'undefined') {
                    warn('b-dropdown: Popper.js not found. Falling back to CSS positioning.');
                } else {
                    // for dropup with alignment we use the parent element as popper container
                    let element = this.$refs.toggle;

                    // Make sure we have a reference to an element, not a component!
                    element = element.$el || element;

                    // Instantiate popper.js
                    this.createPopper(element);
                }
            } else {
                if(typeof this.$refs.arrow !== 'undefined') {
                    let arrow = this.$refs.arrow;
                    let toggle = this.$refs.toggle;

                    this.$nextTick(() => {
                        let arrowPosition = arrow.getBoundingClientRect();
                        let togglePosition = toggle.getBoundingClientRect();

                        arrow.style.left = toggle.offsetLeft + (togglePosition.width / 2) - (arrowPosition.width / 2) + 'px';
                    });
                }
            }

            this.setTouchStart(true);
            this.$emit('shown');

            // Only Focus on the first item if it's a keyboard event
            if(this.visibleEventType === VISIBLE_EVENT_TYPES.KEYBOARD) {
                this.$nextTick(() => {
                    this.$nextTick(this.focusFirstItem);
                });
            }
        },
        hideMenu() {
            // TODO: move emit hide to visible watcher, to allow cancelling of hide
            this.$emit('hide');
            this.setTouchStart(false);
            this.emitOnRoot('bv::dropdown::hidden', this);
            this.$emit('hidden');
            this.removePopper();
        },
        createPopper(element) {
            this.removePopper();

            this._popper = new Popper(element, this.$refs.menu, this.getPopperConfig());
        },
        removePopper() {
            if(this._popper) {
                // Ensure popper event listeners are removed cleanly
                this._popper.destroy();
            }
            this._popper = null;
        },
        getPopperConfig() {
            let placement = AttachmentMap.BOTTOMSTART;

            if(this.position === 'right') {
                // dropdown + right
                placement = AttachmentMap.BOTTOMEND;
            }

            if(this.position === 'center') {
                placement = AttachmentMap.BOTTOM;
            }

            const popperConfig = {
                placement,
                modifiers: {
                    computeStyle: {
                        gpuAcceleration: false
                    },
                    flip: {
                        enabled: false
                    },
                    preventOverflow: {
                        enabled: true,
                        escapeWithReference: true
                    }
                }
            };

            return popperConfig;
        },
        setTouchStart(on) {
            /*
             * If this is a touch-enabled device we add extra
             * empty mouseover listeners to the body's immediate children;
             * only needed because of broken event delegation on iOS
             * https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
             */
            if('ontouchstart' in document.documentElement) {
                const children = arrayFrom(document.body.children);
                children.forEach(el => {
                    if(on) {
                        eventOn('mouseover', this._noop);
                    } else {
                        eventOff('mouseover', this._noop);
                    }
                });
            }
        },
        /* istanbul ignore next: not easy to test */
        _noop() {
            // Do nothing event handler (used in touchstart event handler)
        },
        rootCloseListener(vm) {
            if(vm !== this) {
                this.visible = false;
            }
        },
        clickOutListener() {
            this.visible = false;
        },
        show() {
            // Public method to show dropdown
            if(this.disabled) {
                return;
            }
            this.visible = true;
        },
        hide() {
            // Public method to hide dropdown
            if(this.disabled) {
                return;
            }

            this.visible = false;
        },
        toggle(evt) {
            // Called only by a button that toggles the menu
            evt = evt || {};
            const type = evt.type;
            const key = evt.keyCode;

            // make sure to close the dropdown if we're on the toggle button
            if(type === 'keydown' && key === KeyCodes.ESC) {
                this.visible = false;
                return;
            }

            if(type !== 'click' && !(type === 'keydown' && (key === KeyCodes.ENTER || key === KeyCodes.SPACE || key === KeyCodes.DOWN))) {
                // We only toggle on Click, Enter, Space, and Arrow Down
                return;
            }

            if(typeof evt.keyCode === 'undefined' && this.visible === false) {
                this.visibleEventType = VISIBLE_EVENT_TYPES.MOUSE;
            } else {
                this.visibleEventType = VISIBLE_EVENT_TYPES.KEYBOARD;
            }

            evt.preventDefault();
            evt.stopPropagation();

            if(this.disabled) {
                this.visible = false;
                return;
            }

            // Toggle visibility
            this.visible = !this.visible;
        },
        click(evt) {
            // Calle only in split button mode, for the split button
            if(this.disabled) {
                this.visible = false;
                return;
            }

            this.$emit('click', evt);
        },
        /* istanbul ignore next: not easy to test */
        onKeydown(evt) {
            // Called from dropdown menu context
            const key = evt.keyCode;
            const target = evt.target;

            if(key === KeyCodes.ESC) {
                // Close on ESC
                this.onEsc(evt);
            }

            if(!this.disableMenuEvents) {
                if(key === KeyCodes.TAB) {
                    // Close on tab out
                    this.onTab(evt);
                } else if(key === KeyCodes.DOWN) {
                    // Down Arrow
                    this.focusNext(evt, false);
                } else if(key === KeyCodes.UP) {
                    // Up Arrow
                    this.focusNext(evt, true);
                }
            }

            // If menu events are disabled, still close the dropdown when tabbing off
            if(this.disableMenuEvents) {
                const firstItem = this.getFirstItem();
                const lastItem = this.getLastItem();

                if(target === firstItem && (key === KeyCodes.TAB && evt.shiftKey)) {
                    this.visible = false;
                }

                if(target === lastItem && (key === KeyCodes.TAB && !(key === KeyCodes.TAB && evt.shiftKey))) {
                    this.visible = false;
                }
            }
        },
        /* istanbul ignore next: not easy to test */
        onEsc(evt) {
            if(this.visible) {
                this.visible = false;
                evt.preventDefault();
                evt.stopPropagation();

                // Return focus to original trigger button
                this.$nextTick(this.focusToggler);
            }
        },
        /* istanbul ignore next: not easy to test */
        onTab(evt) {
            if(this.visible) {
                // TODO: Need special handler for dealing with form inputs
                // Tab, if in a text-like input, we should just focus next item in the dropdown
                // Note: Inputs are in a special .dropdown-form container
                this.visible = false;
            }
        },
        onFocusOut(evt) {
            if(this.$refs.menu.contains(evt.relatedTarget)) {
                return;
            }

            this.visible = false;
        },
        focusNext(evt, up) {
            if(!this.visible) {
                return;
            }

            evt.preventDefault();
            evt.stopPropagation();

            this.$nextTick(() => {
                const items = this.getItems();
                if(items.length < 1) {
                    return;
                }

                let index = items.indexOf(evt.target);

                if(up && index > 0) {
                    index--;
                } else if(!up && index < items.length - 1) {
                    index++;
                }

                if(index < 0) {
                    index = 0;
                }

                this.focusItem(index, items);
            });
        },
        focusItem(idx, items) {
            let el = items.find((el, i) => i === idx);

            if(el && getAttr(el, 'tabindex') !== '-1') {
                el.focus();
            }
        },
        getItems() {
            // Get all items
            return filterVisible(selectAll(ITEM_SELECTOR, this.$refs.menu));
        },
        getFirstItem() {
            // Get the first non-disabled item
            let item = this.getItems()[0];
            return item || null;
        },
        getLastItem() {
            const items = this.getItems();
            // Get the first non-disabled item
            let item = items[items.length - 1];
            return item || null;
        },
        focusFirstItem() {
            const item = this.getFirstItem();

            if(item) {
                this.focusItem(0, [item]);
            }
        },
        focusToggler() {
            let toggler = this.toggler;

            if(toggler && toggler.focus) {
                toggler.focus();
            }
        }
    }
};
