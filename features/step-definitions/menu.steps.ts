import { When, Then } from '@cucumber/cucumber';
import Menu from '../pageobjects/menu.page';

When('user click on parent {string}', async (menu: string) => {
    await Menu.clickMenu(menu);
});

When('user select an option {string} from dropdown {int}', async (option: string, index: number) => {
    await Menu.clickMenuDropdown(index);
    await Menu.clickDropdownSubMenu(option);
});

Then('all displayed items should have the selected filter {string}', async (filterOption: string) => {
    await Menu.validateFilteredResults(filterOption);
});
