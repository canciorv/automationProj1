const {test, expect, request} = require('@playwright/test');
const dataSet = JSON.parse(JSON.stringify(require('../utils/ClientAppPO-TestData.json')));

for(const data of dataSet){
test(`Security test request intercept ${data.productName}`, async({page})=>{

    //login and reach orders page   
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(data.username);
    await page.locator("#userPassword").fill(data.password);
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    async route=> route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'}));
  
    await page.locator('button:has-text("View")').first().click();
    await expect(page.locator('.blink_me')).toHaveText('You are not authorize to view this order');


});
}