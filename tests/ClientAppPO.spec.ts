 import {test, expect} from '@playwright/test' 
 import {POManager} from '../pageobjects_ts/POManager' 
 //json -> string -> js object
 const dataSet = JSON.parse(JSON.stringify(require('../utils/ClientAppPO-TestData.json')));

for(const data of dataSet){
 test(`Client App login ${data.productName}`, async ({page})=>
 {
    //js file- Login js, DashboardPage
    const username = data.username;
    const password = data.password;
    const productName = data.productName;
     const poManager  = new POManager(page, productName);
     const orderConfirmationText = " Thankyou for the order. ";
     const loginPage = poManager.getloginPage();
     await loginPage.goTo();
     await loginPage.validLogin(username, password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(productName);
     await dashboardPage.navigateToCart();

     const cartPage = poManager.getCartPage();
     await cartPage.checkout();
     await cartPage.placeOrder(username);

     const orderConfirmationPage = poManager.getOrderConfirmationPage();
     const orderId = await orderConfirmationPage.validateOrderId(orderConfirmationText);
     const ordersPage = poManager.getOrdersPage(orderId);
     await ordersPage.validateTableOrderId();

 });


}
// test files will trigger in parallel 
// individual tests in the file will run in sequence



 

