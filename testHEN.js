const http = require('axios');

let headers = {
    'X-Tenant': "UKED",
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Ocp-Apim-Subscription-Key': "8d88374611e543c3988e6a940e88df92"
}

// let payload = {"OrgUnitNumber":1001,"DepartmentNumber":1,"ItemNumber":1234,"ItemDescription":"TestArticle 1","Active":true,"Saleable":true,"BarcodeList":[{"BarcodeType":9,"BarcodeNumber":"0021234000000","UsedInLabelling":true}]}

// let payload = {"DepartmentNumber": 1};
let pal = {
    a: "",
    b: ""
}
// let payload = [{"OrgUnitNumber":1001,"DepartmentNumber":1,"ItemNumber":9991,"ItemDescription":"Weighted 1","Weighted":true,"Active":true,"Saleable":true,"BarcodeList":[{"BarcodeType":9,"BarcodeNumber":"0027891000000","UsedInLabelling":true}]}]
// let payload = [{"OrgUnitNumber":1001,"DepartmentNumber":1,"ItemNumber":9991,"ItemDescription":"Weighted 1","Weighted":true,"Active":true,"Saleable":true,"BarcodeList":[{"BarcodeType":9,"BarcodeNumber":"0027891000000","UsedInLabelling":true}]}]

let url = "https://freshiq.azure-api.net/recipes-uat/v2/productionitem/getdata"

// let url = "https://freshiq.azure-api.net/recipes-uat/v2/productionitem/getdata";

// let payload = {"BusinessUnits": [1079]}
let payload = {myAss: "upYours"}

http
    .post(url, payload, {headers : headers})
    .then(response => {
        console.log(
            response.status+" "+response.statusText,'\n',
            response.headers,'\n',
            Object.keys(response.config),'\n',
            response.config.headers,'\n',
            response.config.url,'\n',
            response.config.validateStatus,'\n',
            // response.request,
            response.data, '\n')
    })
    .catch(err => {
        console.log(err.response.status, err.response.statusText, err.response.headers)
    })