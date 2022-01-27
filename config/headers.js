const {getToken} = require('./auth');

let getHeaders = async () => {

    console.log("building headers")

    try {
        var token = await getToken("XCU8", "adcadmin", "sk0reZero");
        var headers =  {headers :
            {
                'X-Tenant': "XCU8",
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                "X-Token" : token
            }
        } 
        
        
    } catch (error) {
        console.log(error, Object.keys(error))
    }

    return headers;

}

module.exports = {getHeaders}