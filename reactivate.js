const http = require('axios');
const {getToken} = require('./auth');

const allPlans = require('./data/all-plans');

(async ()=> {var schedIds = []

for(let i=0; i<allPlans.length; i++) {
    let plan = allPlans[i];

    if(![265,273].includes(plan.ProductionAreaNum)) continue;
    console.log(plan.ProductionAreaNum)

    schedIds.push(plan.ObjectId);
}

console.log(schedIds.length)
// console.log(schedIds[Math.floor(Math.random() * schedIds.length)])

let token = await getToken()

for(let schedId of schedIds) {

    let url = "https://proxy.freshiq.com/uat/productionplanning/schedules/edit"

    // let payload = {"id":6714,"TenantCode":"X7MD"}
    let payload = {"id":schedId,"TenantCode":"X7MD"}


    let uiHeaders = {
        'X-Tenant': "X7MD",
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        "X-Token" : token
    } 


    try {
        var resp = await http.post(url, payload, {headers : uiHeaders})
        
    } catch (err) {
        console.log(err)
    }

    console.log(resp.data)

    let schedule = resp.data.value;

    payload = {
        "Description": schedule.description,
        "StoreId": schedule.storeId,
        "ProductionAreaNum": schedule.productionAreaNum,
        "DayOfWeek": schedule.dayOfWeek,
        "StartTime": schedule.startTime,
        "ShowInventoryOnHand": schedule.showInventoryOnHand,
        "ShowAverageItemWeight": schedule.showAverageItemWeight,
        "ShowAverageQtySold": schedule.showAverageQtySold,
        "IsActive": true,
        "TenantCode": "X7MD",
        "ScheduleId": schedule.scheduleId
    }

    url = "https://proxy.freshiq.com/uat/productionplanning/schedules/save";

    try {
        resp = await http.post(url, payload, {headers : uiHeaders})
        console.log(resp.data == 0)
        
    } catch (err) {
        console.log(err)
        console.log(payload)
        throw "ERROR"
    }

    // console.log(resp)


}





})()