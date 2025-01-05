import {test, expect} from '@playwright/test' 
import {POManager} from '../pageobjects_ts/POManager'

const productList = JSON.parse(JSON.stringify(require('../utils/productList.json')));

for(const products of productList){
test(`Search Product${products.item}`, async({page})=>{
    const poManager = new POManager(page);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("testernew@test.com");
    await page.locator("#userPassword").fill("Tester2024");
    await page.locator("#login").click();
    const homePage = poManager.getHomePage();
    await homePage.searchProduct(products.item);

});
};