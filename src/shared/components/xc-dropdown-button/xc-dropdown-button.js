import Vue from 'vue';
import { mergeData } from 'vue-functional-data-merge';

Vue.component('xc-dropdown-button', {
    functional: true,
    render: function (h, { props, data, parent, children }) {
        return h(
            'button', mergeData(data, {
                props,
                staticClass: 'dropdown-item',
                attrs: {
                    type: 'button',
                    role: props.role,
                    disabled: props.disabled
                },
                on: {
                    keydown(e) {
                        // If we're trying to tab inside of the dropdown, close it
                        if(e.keyCode === 9 || (e.keyCode === 16 && e.keyCode === 9)) {
                            parent.$root.$emit('clicked::link', e);
                        }
                    },
                    click(e) {
                        parent.$root.$emit('clicked::link', e);
                    }
                }
            }),
            children
        );
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            default: 'option'
        }
    }
});
