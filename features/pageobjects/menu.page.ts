import { $ } from '@wdio/globals'
import Page from '../pageobjects/page';

class MenuPage extends Page {

    get parentMenu() { return (menu: string) => $(`a[href^="/de/c/${menu}/"]`); }
    get dropdownList() { return $(`.facet__title`) }
    get dropdownMenu() { return (index: number) => $$(`.facet__title`)[index]; }
    get dropdownSubMenu() { return $(`.facet__menu-content`); }
    get checkBoxMenu() { return (option: string) => $(`//a[contains(@class, 'facet-option')]//div[contains(text(), '${option}')]`); }
    get productTile() { return $(`.product-tile--is-pop-tile`) }
    get multipleProductTile() { return $$(`.product-tile--is-pop-tile`) }
    get dropdownMenuList() { return $(`.facet__menu`) }
    public findItem(res: string): string {
        const locatorMap: { [key: string]: string } = {
            'Sale': `.//div[contains(@class, 'eyecatcher') and contains(normalize-space(text()), '${res}')]`,
            'NEU': `.//div[contains(@class, 'eyecatcher') and contains(normalize-space(text()), '${res}')]`,
            '4711': `.//div[contains(@class, 'text top-brand') and contains(normalize-space(text()), '${res}')]`,
            'Abercrombie & Fitch': `.//div[contains(@class, 'text top-brand') and contains(normalize-space(text()), '${res}')]`,
        };
        return locatorMap[res];  // Return the corresponding locator based on 'res'
    }


    public async clickMenu(menu: string) {
        const selectMenu = this.parentMenu(menu);
        await selectMenu.waitForDisplayed({ timeout: 5000 });
        await selectMenu.click();
    }

    public async clickMenuDropdown(dropdownIndex: number) {
        const listOfDropDown = this.dropdownList;
        await listOfDropDown.waitForExist({ timeout: 20000 });
        const dropdown = this.dropdownMenu(dropdownIndex);
        await dropdown.waitForExist({ timeout: 20000 });
        await dropdown.click();
    }

    public async clickDropdownSubMenu(options: string) {
        const dropdownMenu = this.dropdownSubMenu;
        await dropdownMenu.waitForExist();
        const checkBoxValue = this.checkBoxMenu(options);
        await checkBoxValue.waitForClickable();
        await checkBoxValue.click();
    }

    public async validateFilteredResults(res: string) {
        const viewElement = this.findItem(res);

        const dropdownMenu = this.dropdownMenuList;
        await dropdownMenu.waitForDisplayed({ reverse: true, timeout: 20000 });

        const firstProductTile = this.productTile;
        await firstProductTile.waitForDisplayed({ timeout: 20000 });
        const productTiles = this.multipleProductTile;

        if (await productTiles.length === 0) {
            throw new Error('No product tiles found');
        }
        await Promise.all(await productTiles.map(async (productTile) => {
            const selectedTag = productTile.$(viewElement);
            await selectedTag.waitForExist({ timeout: 20000 });
            const tagText = await selectedTag.getText();
            expect(tagText.toLowerCase()).toEqual(res.toLowerCase());
        }));
    }
}

export default new MenuPage();
