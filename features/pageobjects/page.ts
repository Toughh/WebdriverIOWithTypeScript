class Page {

    public async navigate() {
        await browser.deleteAllCookies();
        await browser.url('/de');
        await browser.maximizeWindow();
    }
}

export default Page;
