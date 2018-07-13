import { idMixin, listenOnRootMixin } from 'bootstrap-vue/src/mixins';
import { reflow } from 'bootstrap-vue/src/utils/dom';
import dropdownMixin from '@/mixins/xc-dropdown';

export default {
    mixins: [idMixin, dropdownMixin, listenOnRootMixin],
    render(h) {
        const toggle = h(
            'button', {
                ref: 'toggle',
                attrs: {
                    id: this.safeId('_BV_toggle_'),
                    'aria-haspopup': 'true',
                    'aria-expanded': this.visible ? 'true' : 'false'
                },
                class: this.extraClasses,
                on: {
                    click: this.toggle,
                    keydown: this.toggle
                }
            }, [this.$slots.default]
        );

        const arrow = h(
            'span', {
                ref: 'arrow',
                attrs: {
                    'x-arrow': ''
                },
                class: this.arrowClass
            }
        );

        const menu = h(
            'div', {
                ref: 'menu',
                class: this.menuClasses,
                attrs: {
                    role: this.role,
                    'aria-labelledby': this.safeId('_BV_toggle_')
                },
                directives: [{
                    name: 'show',
                    value: this.visible
                }],
                on: {
                    keydown: this.onKeydown // tab, up, down, esc
                }
            }, [this.$slots.dropdown, this.arrow ? arrow : null]
        );

        const transition = h(
            'transition', {
                props: {
                    enterClass: '',
                    enterActiveClass: 'collapsing',
                    enterToClass: '',
                    leaveClass: '',
                    leaveActiveClass: 'collapsing',
                    leaveToClass: ''
                },
                on: {
                    enter: this.onEnter,
                    afterEnter: this.onAfterEnter,
                    leave: this.onLeave,
                    afterLeave: this.onAfterLeave
                }
            }, [menu]
        );

        return h(
            'div', {
                ref: 'dropdown',
                attrs: {
                    id: this.safeId()
                },
                class: this.dropdownClasses
            }, [toggle, this.transition ? transition : menu]
        );
    },
    data() {
        return {
            transitioning: false
        };
    },
    props: {
        target: {
            // String ID of element, or element/component reference
            type: [String, Object]
        },
        size: {
            type: String,
            default: null
        },
        extraClasses: {
            type: String,
            default: ''
        },
        arrowClass: {
            type: String,
            default: 'c-nav-dropdown__arrow'
        },
        role: {
            type: String,
            default: 'menu'
        },
        arrow: {
            type: Boolean,
            default: true
        },
        transition: {
            type: Boolean,
            default: false
        },
        boundary: {
            // String: `scrollParent`, `window` or `viewport`
            // Object: HTML Element reference
            type: [String, Object],
            default: 'scrollParent'
        }
    },
    mounted: function() {
        this.listenOnRoot('xc::hide::dropdown', this.hideHandler);
    },
    methods: {
        hideHandler: function hideHandler(id) {
            if(id === this.id) {
                this.hide();
            }
        },
        onEnter (el) {
            el.style.height = 0;
            reflow(el);
            el.style.height = el.scrollHeight + 'px';
            this.transitioning = true;
            // This should be moved out so we can add cancellable events
            this.$emit('show');
        },
        onAfterEnter (el) {
            el.style.height = null;
            this.transitioning = false;
            this.$emit('shown');
        },
        onLeave (el) {
            el.style.height = 'auto';
            el.style.display = 'block';
            el.style.height = el.getBoundingClientRect().height + 'px';
            reflow(el);
            this.transitioning = true;
            el.style.height = 0;
            // This should be moved out so we can add cancellable events
            this.$emit('hide');
        },
        onAfterLeave (el) {
            el.style.height = null;
            this.transitioning = false;
            this.$emit('hidden');
        }
    },
    computed: {
        dropdownClasses() {
            let position = '';
            // Position `static` is needed to allow menu to "breakout" of the scrollParent boundaries
            // when boundary is anything other than `scrollParent`
            // See https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
            if(this.boundary !== 'scrollParent' || !this.boundary) {
                position = 'position-static';
            }

            return [
                'c-nav-dropdown__container',
                position
            ];
        },
        menuClasses() {
            return [
                'c-nav-dropdown',
                'dropdown-menu',
                this.right ? 'dropdown-menu-right' : '',
                this.isNav ? 'navbar-collapse' : '',
                this.transitioning ? '' : 'collapse',
                this.visible && !this.transitioning ? 'show' : ''
            ];
        },
        toggleClasses() {
            return [{
                'dropdown-toggle': !this.noCaret || this.split,
                'dropdown-toggle-split': this.split
            },
            this.toggleClass];
        }
    }
};
