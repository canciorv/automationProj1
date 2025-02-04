import {LoginData} from '../tests/e2e.spec';
import {Payload} from '../tests/productSearch.spec';

export class APiUtil {
    apiContext: any;
    payload: LoginData | Payload;

    constructor(apiContext: any, payload: LoginData| Payload){
        this.apiContext = apiContext;
        this.payload = payload;
    };

    async getToken(): Promise<string>{
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data:this.payload
        });

        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    };

    async filterCategory(token: string):Promise<string[]>{
        const filterResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/product/get-all-products',
        {
             
            headers: {
                Authorization: token
              },
              data: this.payload
            
        });
        const filterResponseJson = await filterResponse.json();
        console.log(filterResponseJson.data);
        return filterResponseJson.data.map(product => product.productCategory);

    };
};

export default APiUtil;