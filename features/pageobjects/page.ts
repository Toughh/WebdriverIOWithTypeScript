class Page {

    public async navigate() {
        await browser.deleteAllCookies();
        await browser.url('/de');
        await browser.maximizeWindow();
    }

    public async acceptCookies() {
        const acceptCookiesButton = $('[data-testid="uc-accept-all-button"]');
        try {
            const isDisplayed = await acceptCookiesButton.waitForDisplayed({ timeout: 8000, reverse: false });
        
            if (isDisplayed) {
                await acceptCookiesButton.click(); // Click the button if displayed
                console.log('Cookies accepted.');
            } else {
                console.log('Cookies button not displayed. Skipping.');
            }
        } catch (error) {
            // Handle case where the element is not present at all (i.e., waitForDisplayed timeout)
            console.log('Cookies button not found within the timeout. Skipping.');
        }
        // const acceptCookiesButton = $('[data-testid="uc-accept-all-button"]');
        // await acceptCookiesButton.waitForDisplayed({ timeout: 8000 });
        // await acceptCookiesButton.click();
    }
}

export default new Page();
