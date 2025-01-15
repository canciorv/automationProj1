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

    async filterCategory(token){
        const filterResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/product/get-all-products',
        {
            
            headers: {
                Authorization: token
              },
              data: this.payload
            
        });
        const filterResponseJson = await filterResponse.json();
        const productCategoryCount = await filterResponseJson.data.length;

        let responseData: any[] = []
        for(let i=0; i < productCategoryCount; i++){
            responseData.push(filterResponseJson.data[i].productCategory)
        }
        return responseData;

    }
}

module.exports = {APiUtil};