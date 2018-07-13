export default function setSpeedBumpClassLinks(speedBumpSelector, linkId) {
    const speedBumps = document.querySelectorAll(speedBumpSelector);
    const speedBumpLink = document.querySelector(linkId);

    window.activeSpeedBumpLink = null;

    Array.from(speedBumps).forEach((element, index) => {
        if(!element.hasAttribute('speed-bump-set')) {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                window.activeSpeedBumpLink = event.currentTarget;
                speedBumpLink.setAttribute('href', event.currentTarget.getAttribute('href'));

                // Call the hidden Vue speedbump
                speedBumpLink.click();
            });

            element.setAttribute('speed-bump-set', '');
        }
    });
}
