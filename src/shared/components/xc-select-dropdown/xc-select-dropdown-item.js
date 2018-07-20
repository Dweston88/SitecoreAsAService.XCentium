import { KeyCodes } from 'bootstrap-vue/src/utils';

export default {
    render(h) {
        const vm = this;

        return h(
            'button', {
                on: {
                    keydown(e) {
                        if(e.keyCode === KeyCodes.ENTER) {
                            vm.emitEvents(e, vm.inputValue, vm.text);
                        }

                        // If we're trying to tab inside of the dropdown, close it
                        if(e.keyCode === 9 || (e.keyCode === 16 && e.keyCode === 9)) {
                            vm.$root.$emit('clicked::link', e);
                        }
                    },
                    click(e) {
                        vm.emitEvents(e, vm.inputValue, vm.text);
                    }
                },
                attrs: {
                    type: 'button'
                },
                class: this.itemClass
            }, [this.$slots.default]
        );
    },
    mounted() {
        this.$nextTick(() => {
            this.$parent.$emit('register', this.inputValue, this.text);
        });

        if(this.selected) {
            this.$nextTick(() => {
                this.$parent.$emit('selected', this.inputValue, this.text);
            });
        }
    },
    props: {
        value: {
            type: String
        },
        text: {
            type: String,
            required: true
        },
        itemClass: {
            type: String
        },
        selected: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        inputValue () {
            return this.value || this.text;
        }
    },
    methods: {
        emitEvents: function(e, value, text) {
            this.$parent.$emit('selected', value, text);
            this.$root.$emit('clicked::link', e, value);
        }
    }
};
