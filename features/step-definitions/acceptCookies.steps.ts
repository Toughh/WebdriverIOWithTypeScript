import { Given, When } from '@cucumber/cucumber';
import Page from '../pageobjects/page.ts';

Given('the user navigates to the website', async () => {
    await Page.navigate();
});

When('the user clicks the "Accept Cookies" button', async () => {
    await Page.acceptCookies();
});
