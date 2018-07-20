export default function setSsoInterceptLinks(linkId) {
    const anchors = document.querySelectorAll('a[href]:not(#sso-intercept-link)');
    const ssoIntercept = document.querySelector(linkId);

    window.activeSssoIntercept = null;

    Array.from(anchors).forEach((element, index) => {
        if(!element.hasAttribute('sso-intercept-set') && element.getAttribute('href').match(/sso\.heart\.org/)) {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                window.activeSssoIntercept = event.currentTarget;
                ssoIntercept.setAttribute('href', event.currentTarget.getAttribute('href'));

                // Call the hidden Vue link
                ssoIntercept.click();
            });

            element.setAttribute('sso-intercept-set', '');
        }
    });
}
