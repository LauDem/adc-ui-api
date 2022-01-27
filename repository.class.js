const http = require('axios');
const moment = require('moment');
const {apiRoutes} = require('./config/apiUrls');
const {getHeaders} = require('./config/headers');

class Repository {

    static instanciable = false;

    constructor(tenant, login, password, version = 2, env = "uat") {

        // if(!Repository.instanciable) throw new Error('Repository cannot be constructed directly')

        this.tenant = tenant;
        this.login = login;
        this.password = password;
        this.version = version;
        this.env = env;
        this.apiRoute = new apiRoutes()
        // Repository.instanciable = false;
    }

    async call(endpoint, payload = {}) {

        // console.log(this.outdatedHeaders())

        if(this.outdatedHeaders()) {
            this.headers = await getHeaders(this.tenant, this.login, this.password)
            this.headersDate = new Date()
        }

        // console.log("Headers :", this.headers)

        try {

            let url = this.apiRoute.for(endpoint);

            let resp = await http.post(url, payload, this.headers);

            return resp.data;
    
            
        } catch (error) {
            
            if(error.isAxiosError) {
                // error = error.response;
                console.log(error.request.res.responseUrl, "\n---------\n", error.response.status, error.response.statusText, "\n---------\n",error.response.headers)
                throw new Error(error.response.status, error.response.statusText)
            }

            console.log(error, Object.keys(error))
            
            throw new Error(error)
        }

        
    }

    outdatedHeaders() {

        if(!this.headersDate) {
            console.log("requires token")
            return true;
        }

        let headerIsOlderThan3mins = moment(this.headersDate).add(3, 'm').isBefore(moment());

        if(headerIsOlderThan3mins) {
            console.log("require token refresh")
            return true;
        }


        return false;
    }

}
module.exports = {Repository}