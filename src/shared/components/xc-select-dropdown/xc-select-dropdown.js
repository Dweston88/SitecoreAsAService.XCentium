import { idMixin } from 'bootstrap-vue/src/mixins';
import dropdownMixin from '@/mixins/xc-dropdown';

export default {
    mixins: [idMixin, dropdownMixin],
    render(h) {
        const toggle = h(
            'button', {
                ref: 'toggle',
                attrs: {
                    id: this.safeId('_BV_toggle_'),
                    'aria-haspopup': 'true',
                    'aria-expanded': this.visible ? 'true' : 'false',
                    type: 'button'
                },
                class: this.toggleClasses,
                on: {
                    click: this.toggle,
                    keydown: this.toggle
                }
            }, [this.buttonText]
        );

        const arrow = h(
            'span', {
                ref: 'arrow',
                attrs: {
                    'x-arrow': ''
                },
                class: 'c-nav-dropdown__arrow'
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
                on: {
                    keydown: this.onKeydown // tab, up, down, esc
                }
            }, [this.$slots.dropdown, this.arrow ? arrow : null]
        );

        const hiddenInput = h(
            'input', {
                attrs: {
                    type: 'hidden',
                    value: this.hiddenValue,
                    name: this.inputName
                }
            }
        );

        return h(
            'div', {
                ref: 'dropdown',
                attrs: {
                    id: this.safeId()
                },
                class: this.dropdownClasses
            }, [toggle, hiddenInput, menu]
        );
    },
    data() {
        return {
            hiddenValue: null,
            displayText: null,
            dropdownItems: {}
        };
    },
    props: {
        value: {
            required: false
        },
        defaultValue: {
            type: String,
            required: true
        },
        toggleClass: {
            type: String,
            default: ''
        },
        role: {
            type: String,
            default: 'menu'
        },
        arrow: {
            type: Boolean,
            default: false
        },
        inputName: {
            type: String,
            default: 'searchCategory'
        },
        boundary: {
            // String: `scrollParent`, `window` or `viewport`
            // Object: HTML Element reference
            type: [String, Object],
            default: 'scrollParent'
        }
    },
    mounted() {
        this.$on('selected', this.clickListener);
        this.$on('register', this.registerDropdownItem);

        // Set the default dropdown value if specified
        if(this.defaultValue) {
            this.hiddenValue = this.defaultValue;
        }
    },
    methods: {
        clickListener: function(value, text) {
            if(typeof value !== 'undefined') {
                this.hiddenValue = value;
                this.displayText = text;

                this.$emit('input', this.hiddenValue);
            }
        },
        registerDropdownItem: function(value, text) {
            this.dropdownItems[value] = text;
        }
    },
    watch: {
        value: function(val) {
            // If the value is trying to be set programmatically, check the registered dropdown items
            if(typeof this.dropdownItems[val] !== 'undefined') {
                this.hiddenValue = val;
                this.displayText = this.dropdownItems[val];
            }
        }
    },
    computed: {
        buttonText() {
            return this.displayText || this.defaultValue;
        },
        dropdownClasses() {
            let position = '';
            // Position `static` is needed to allow menu to "breakout" of the scrollParent boundaries
            // when boundary is anything other than `scrollParent`
            // See https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
            if(this.boundary !== 'scrollParent' || !this.boundary) {
                position = 'position-static';
            }

            return [
                'c-select-dropdown__container',
                this.visible ? 'show' : '',
                position
            ];
        },
        menuClasses() {
            return [
                'c-select-dropdown',
                'dropdown-menu',
                this.right ? 'dropdown-menu-right' : ''
            ];
        },
        toggleClasses() {
            return [this.toggleClass];
        }
    }
};
