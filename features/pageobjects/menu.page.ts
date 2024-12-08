import { $ } from '@wdio/globals'
// import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MenuPage {

    public async clickMenu(menu: string) {
        const selectMenu = $(`a[href^="/de/c/${menu}/"]`);
        await selectMenu.waitForDisplayed({ timeout: 5000 });
        await selectMenu.click();
    }

    public async clickMenuDropdown(dropdownIndex: number) {
        const dropdownMenu = $(`.facet__title`);
        await dropdownMenu.waitForExist({ timeout: 20000 });
        const dropdown = $$(`.facet__title`)[dropdownIndex];
        await dropdown.waitForDisplayed({ timeout: 10000 });
        await dropdown.click();
    }

    public async clickDropdownSubMenu(options: string) {
        const dropdownMenu = $('.facet__menu-content');
        await dropdownMenu.waitForExist();
        const checkBoxValue = $(`//a[contains(@class, 'facet-option')]//div[contains(text(), '${options}')]`);
        await checkBoxValue.waitForClickable();
        await checkBoxValue.click();
        const dropdownMen = $(`.facet__title`);
        await dropdownMen.waitForExist();
    }

    public async validateFilteredResults(res: string) {
        const tagElement = `.product-tile--is-pop-tile`;

        const locatorsMap: { [key: string]: string } = {
            'Sale': `.//div[contains(@class, 'eyecatcher') and contains(normalize-space(text()), '${res}')]`,
            'NEU': `.//div[contains(@class, 'eyecatcher') and contains(normalize-space(text()), '${res}')]`,
            '4711': `.//div[contains(@class, 'text top-brand') and contains(normalize-space(text()), '${res}')]`,
            'Abercrombie & Fitch' : `.//div[contains(@class, 'text top-brand') and contains(normalize-space(text()), '${res}')]`,
        };

        const viewElement = locatorsMap[res];

        const dropdownMenu = $('.facet__menu');
        await dropdownMenu.waitForDisplayed({ reverse: true, timeout: 10000 });

        const firstProductTile = $(tagElement);
        await firstProductTile.waitForDisplayed({ timeout: 5000 });
        const productTiles = $$(tagElement);

        if (await productTiles.length === 0) {
            throw new Error('No product tiles found');
        }
        await Promise.all(await productTiles.map(async (productTile) => {
            const selectedTag = productTile.$(viewElement);
            await selectedTag.waitForExist({ timeout: 5000 });
            if (!selectedTag) {
                throw new Error(`Tag "${res}" not found in one of the product tiles.`);
            }
            console.log('Tab text: ', await selectedTag.getText());
            const tagText = await selectedTag.getText();
            expect(tagText.toLowerCase()).toEqual(res.toLowerCase());
        }));
    }
}

export default new MenuPage();
