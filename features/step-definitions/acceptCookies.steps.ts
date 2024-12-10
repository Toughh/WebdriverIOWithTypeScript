import { Given, When } from '@cucumber/cucumber';
import Page from '../pageobjects/page';
import Cookies from '../pageobjects/cookies.page';

Given('the user navigates to the website', async () => {
    const page = new Page();
    await page.navigate();
});

When('the user clicks the "Accept Cookies" button', async () => {
    await Cookies.acceptTheCookies();
});
