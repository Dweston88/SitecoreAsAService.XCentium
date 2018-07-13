import { browserDetails } from './utils';

export function isTlsAvailable() {
    const browser = browserDetails();
    let isSecure = true;

    switch (browser.name) {
        case 'Chrome':
            if(browser.mobile) {
                if(browser.version < 4.1) {
                    isSecure = false;
                }
            } else {
                if(browser.version < 31) {
                    isSecure = false;
                }
            }

            break;

        case 'Safari':
            if(browser.mobile) {
                if(browser.version < 5) {
                    isSecure = false;
                }
            } else {
                if(browser.version < 7) {
                    isSecure = false;
                }
            }

            break;

        case 'MSIE':
            if(browser.mobile) {
                if(browser.version < 10) {
                    isSecure = false;
                }
            } else {
                if(browser.version < 10) {
                    isSecure = false;
                }
            }

            break;

        case 'Opera':
            if(browser.version < 10) {
                isSecure = false;
            }

            break;

        case 'Firefox':
            if(browser.version < 24) {
                isSecure = false;
            }

            break;
    }

    return isSecure;
}
