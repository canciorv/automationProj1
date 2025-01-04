import {test, expect} from '@playwright/test' 
import {POManager} from '../pageobjects_ts/POManager'

const dataSet = JSON.parse(JSON.stringify(require('../utils/loginData.json')));

for(const data of dataSet){
test(`Login ${data.username}`, async({page})=>{
    const email: string = data.username;
    const password: string = data.password;
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.userLogin(email, password);
});
};