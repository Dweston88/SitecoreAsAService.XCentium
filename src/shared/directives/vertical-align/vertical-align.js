import { debounce } from '@/utils/utils';

const state = new WeakMap();
const resizeEvent = 'resize';

export default {
    bind(el) {
        state.set(el, {
            resizeEventListener: null
        });
    },
    inserted (el, directive, vnode) {
        const data = state.get(el);
        const resizeEventHandler = debounce(() => {
            // hardcoding for now unless we find another use-case
            if(window.innerWidth < 576) {
                el.style.top = 'auto';
                el.style.marginTop = 'auto';
            } else {
                el.style.top = '50%';
                el.style.marginTop = '-' + (el.clientHeight / 2) + 'px';
            }
        }, 50);

        data.resizeEventListener = resizeEventHandler;
        window.addEventListener(resizeEvent, resizeEventHandler);
        resizeEventHandler();

        vnode.context.$on('v-vertical-align-reset', () => {
            resizeEventHandler();
        });
    },
    unbind(el) {
        const data = state.get(el);

        window.removeEventListener(resizeEvent, data.resizeEventListener);
    }
};
