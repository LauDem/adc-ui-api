const http = require('axios');
let url = "https://proxy.freshiq.com/uat/auth/user/authenticate"
// let url = "https://prod-ue2-proxy.azurewebsites.net/prod/auth/user/authenticate"


let getToken = async (tenant = "X7MD", userSignon = "adcadmin", password = "adcadmin", ipAddress = "145.53.34.72") => {

    let payload = {tenantId: tenant, userSignon: userSignon, password: password, /*ipAddress: ipAddress*/ }

    let auth = await http.post(url, payload)

    return auth.data.jwt
}

module.exports = {getToken}