import {expect, type Locator,type Page} from '@playwright/test';

let message1 : string = 'Hello';
message1 = 'bye';
console.log(message1);
let age1 : number = 20;
console.log(age1);
let isActive : boolean = false;

let numbers1: number[] = [1,2,3];

let data: any = 'this could be anything';
data = 42;

console.log(data);

const add = (a: number,b: number) : number =>{
    return a+b;
};

console.log(add(3,4));

let user1: {name: string, age: number, location: string} = { name: "Bob", age: 34, location: 'Philippines'};

class CartPage {

    page: Page;
    cartItems: Locator;
    checkoutButton: Locator;
    countryDropdown: Locator;
    dropdownResults: Locator;
    emailText: Locator;
    placeOrderButton: Locator;
    orderText: Locator;
    constructor(page: any){

        this.page = page;
        this.cartItems = page.locator("div li");
        this.checkoutButton = page.locator("text=Checkout");
        this.countryDropdown = page.locator("[placeholder*='Country']");
        this.dropdownResults = page.locator(".ta-results");
        this.emailText = page.locator(".user__name [type='text']"); 
        this.placeOrderButton = page.locator(".action__submit");
        this.orderText = page.locator("h3:has-text('ZARA COAT 3')");
    };
};