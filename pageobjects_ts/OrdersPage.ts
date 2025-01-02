import {expect, type Page, type Locator} from '@playwright/test';

export class OrdersPage {

    orderButton: Locator;
    tableBody: Locator;
    tableRows: Locator;
    orderIdDetails: Locator;
    orderId: string;
    page: Page;

    constructor(page: Page,orderId: string){
        this.orderButton = page.locator("button[routerlink*='myorders']");
        this.tableBody = page.locator("tbody");
        this.tableRows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
        this.orderId = orderId;
    }

    async validateTableOrderId(){
        await this.orderButton.click();
        await this.tableBody.waitFor();
        const rows = await this.tableRows;
      
      
       for(let i =0; i<await rows.count(); ++i)
       {
          const rowOrderId =await rows.nth(i).locator("th").textContent();
          if(rowOrderId !== null){
            if ((await this.orderId).includes(rowOrderId))
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }
          }
       }
       const orderIdDetails =await this.orderIdDetails.textContent();
       if(orderIdDetails !== null){
        expect((await this.orderId).includes(orderIdDetails)).toBeTruthy();
       }

    }

}

module.exports = {OrdersPage};