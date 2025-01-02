const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');
const dataSet = JSON.parse(JSON.stringify(require('../utils/Network-TestData.json')));

let response;
test.beforeAll( async()=>
{
    console.log();
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,dataSet.loginPayLoad);
   response =  await apiUtils.createOrder(dataSet.orderPayLoad);

})


//create order is success
test('Place the order', async ({page})=>
{
    page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client/");
await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
 async route=>{
    const response = await page.request.fetch(route.request());
    let body = JSON.stringify(dataSet.fakePayloadOrders);
    route.fulfill({
        response,
        body,
    })    
    //intercepting response - API response -> { playwright fake response} -> browser-> render data on front end
 }
 );

 await page.locator("button[routerlink*='myorders']").click();
 await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');

await expect(page.locator(".mt-4")).toContainText('You have No Orders to show at this time.');


});
