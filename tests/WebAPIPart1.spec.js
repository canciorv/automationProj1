const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');
const dataSet = JSON.parse(JSON.stringify(require('../utils/Network-TestData.json')));

let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext, dataSet.loginPayLoad);
   response =  await apiUtils.createOrder(dataSet.orderPayLoad);

})


//create order is success
test('@API Place the order', async ({page})=>
{
    page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client/");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");


for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});

//Verify if order created is showing in history page
// Precondition - create order -