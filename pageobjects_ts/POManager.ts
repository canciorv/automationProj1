import {type Page} from '@playwright/test';
import {CartPage} from './CartPage';
import {DashboardPage} from './DashboardPage';
import {LoginPage} from './LoginPage';
import {OrderConfirmationPage} from './OrderConfirmationPage';
import {OrdersPage} from './OrdersPage';

export class POManager{
    loginPage: LoginPage;
    cartPage: CartPage;
    dashboardPage: DashboardPage;
    orderConfirmationPage: OrderConfirmationPage;
    ordersPage: OrdersPage;
    page: Page;

    constructor(page: Page, productName){
        this.page = page;
        this.cartPage = new CartPage(this.page, productName);
        this.dashboardPage = new DashboardPage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);

    }

    getCartPage(){
        return this.cartPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getloginPage(){
        return this.loginPage;
    }

    getOrderConfirmationPage(){
        return this.orderConfirmationPage;
    }

    getOrdersPage(orderId){
        return this.ordersPage = new OrdersPage(this.page,orderId);
    }
}

module.exports = {POManager};