const {CartPage} = require ('./CartPage');
const {DashboardPage} = require ('./DashboardPage');
const {LoginPage} = require ('./LoginPage');
const {OrderConfirmationPage} = require ('./OrderConfirmationPage');
const {OrdersPage} = require ('./OrdersPage');

class POManager{
    constructor(page, productName){
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