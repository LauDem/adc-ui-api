const http = require('axios');
const {getToken} = require('./auth');
const requests = require('./data/requests.json')


const url = "https://prod-ue2-proxy.azurewebsites.net/prod/masterdata/productionscheduleitem/save";

let updateSchedules = async () => {

    let count = 0;
    let token;
    let headers;

    for(let key in requests) {

        if(count%200 == 0) {
            token = await getToken("FSPR", "adcadmin", "adcadmin")
    
            headers =  {headers :
                {
                    'X-Tenant': "FSPR",
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    "X-Token" : token
                }
            } 
        }

        try{
            await http.post(url, requests[key], headers)
            console.log("schedule "+key+" updated")
        } catch (e) {
            console.log(e);
            // console.log("stopped at schedule "+ key)
            throw "error at schedule "+key
        }

        // break;
    }

     
}

updateSchedules()