class apiRoutes {

    constructor(env = "uat", version = 2) {

        env = env.toLocaleLowerCase();

        if(!["prod","uat"].includes(env)) throw new Error("Cannot construct API Routes. Environment can be either 'prod' or 'uat', "+env+" given.");

        if(![1,2].includes(version)) throw new Error("Cannot construct API Routes. Version can be either '1' or '2', "+version+" given.");

        env == "uat" ? this.env = "uat/" : this.env = "";
    }
    
    apiUrl = "https://proxy.freshiq.com/";

    endpoints = {
        storeSave : "masterdata/stores/save",
        storeEdit : "masterdata/stores/edit",
        organizationGet:"masterdata/organization/get",
        scaleSave:"masterdata/scales/save",
        scaleEdit:"masterdata/scales/edit"
    }

    for (endpoint)  {

        if(!this.endpoints[endpoint]) throw new Error(

            String(endpoint)+
            " : unknown API Endpoint. \n Possible endpoints are : "+
            Object.keys(this.endpoints) + 
            "\n"+ String(endpoint)+
            " : unknown API Endpoint."
            )

        return this.apiUrl+this.env+this.endpoints[endpoint];
    }
}

module.exports = {apiRoutes}