export class APiUtil {
    apiContext: any;
    payload: string;

    constructor(apiContext, payload){
        this.apiContext = apiContext;
        this.payload = payload;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data:this.payload
        });

        const loginResponseJson = await loginResponse.json();
        const token =loginResponseJson.token;
        return token;
    }

}

module.exports = {APiUtil};