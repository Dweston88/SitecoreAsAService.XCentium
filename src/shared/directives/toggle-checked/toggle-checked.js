export default {
    inserted: function (el, binding) {
        let isChecked = false;

        el.setAttribute('role', 'checkbox');
        el.setAttribute('aria-checked', 'false');
        el.setAttribute('tabindex', 0);

        el.addEventListener('click', () => {
            toggleChecked();
        });

        el.addEventListener('keypress', (evt) => {
            if(evt.keyCode === 13) {
                toggleChecked();
            }
        });

        function toggleChecked() {
            isChecked = !isChecked;
            el.classList.toggle('is-checked');

            el.setAttribute('aria-checked', isChecked.toString());
        }
    }
};
