
export default function skipToLink(selector) {
    const skipLink = document.querySelector(selector);

    if(skipLink) {
        skipLink.addEventListener('click', function(evt) {
            evt.preventDefault();

            const target = document.querySelector(evt.target.getAttribute('href'));
            target.focus();
        });
    }
}
