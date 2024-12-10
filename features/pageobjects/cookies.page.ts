import { $ } from '@wdio/globals'
import Page from '../pageobjects/page';

class CookiesPage extends Page {

    get cookies() { return $(`[data-testid="uc-accept-all-button"]`); }

    public async acceptTheCookies() {
        const acceptCookiesButton = this.cookies;
        try {
            const isDisplayed = await acceptCookiesButton.waitForDisplayed({ timeout: 8000, reverse: false });

            if (isDisplayed) {
                await acceptCookiesButton.click();
            } else {
                console.log('Cookies button not displayed. Skipping.');
            }
        } catch (error) {
            console.log('Cookies button not found within the timeout. Skipping.');
        }
    }
}

export default new CookiesPage();
