import { test, expect, request} from "@playwright/test";
import { POManager } from "../pageobjects_ts/POManager";
import { APiUtil } from "../utils/APiUtil";

const loginData = JSON.parse(JSON.stringify(require("../utils/loginData.json")));
const productList = JSON.parse(JSON.stringify(require("../utils/productList.json")));


let token;
for(const credentials of loginData){

    for(const product of productList){
        test(`E2E ${credentials.userEmail} ${product.item}`, async ({ page }) => {
            const poManager = new POManager(page);
            const payload = credentials;
            console.log(payload);
            const apiContext = await request.newContext();
            const apiUtil = new APiUtil(apiContext, payload);
            token = await apiUtil.getToken();
            await page.addInitScript((value) => {
                window.localStorage.setItem("token", value);
              }, token);   
            if(token !== undefined){
                const loginPage = poManager.getLoginPage();
                await loginPage.goTo();
                const homePage = poManager.getHomePage();
                const productFound = await homePage.searchProduct(product.item);
                if(productFound){
                    const productDetailsPage = poManager.getProductDetailsPage();
                    await productDetailsPage.goTo();
                    await productDetailsPage.validateDetails(product.item);
                    await productDetailsPage.addToCart();
                    const myCartPage = poManager.getCartPage();
                    await myCartPage.goTo();
                    await myCartPage.checkout();
                } else {
                    page.close()
                }
                
            } else {
                page.close()
            }

          });    
    }
}