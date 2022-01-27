const http = require('axios');
// const {payload} = require('./allSchedulesPayload');
const {buildHeaders, buildUrl} = require("./config/builder");

const payload = require('./payload.1634451008681.json')

var toUpdate = {
    105713373 : 10,
    105713411 : 10,
    111744766 : 10,
    110825767 : 10,
    105615239 : 8,
    105615183 : 8,
    105615167 : 8,
    105615212 : 8,
    105630447 : 8,
    112121835 : 8,
    111813725 : 12,
    111813741 : 12,
    105628646 : 12
}

let schedules = []

for(let schedule of payload) {

    if(schedule.StartTime != "10:00") continue;

    let items = []

    for(let item of schedule.Items) {

        if(item.SKUNum == 106779278) items.push({
            SKUNum : item.SKUNum,
            ActionCode : "D"
        })



    }

    if(items.length > 0) {

        delete schedule.Items;
        delete schedule.Active;
        delete schedule.ShowInventoryOnHand;
        schedule.Items = items;
        schedules.push(schedule)
        continue;
    }

    console.log(schedule)


}

console.log(schedules[0], schedules.length)

let conf = {
    headers : buildHeaders("X7MD", "production", true)
}

let url = buildUrl("X7MD", "production","ImportProductionSchedule", true);

let update = async (schedules) => {

    for(let i =0; i< schedules.length; i++) {
        try { 
            let test = await http.post(url, [schedules[i]], conf)
            console.log(
                schedules[i]["StoreNumber"],
                schedules[i]["ProductionAreaNumber"],
                schedules[i]["Day"],
                schedules[i]["StartTime"],
                "isValid : "+test.data.isValid)
        } catch (err) {
            console.log(err, Object.keys(err))
            throw "error"
        }
    
    }
    
}

update(schedules)




return;
// const {getToken} = require('./auth');

// payload = {Stores: [17], Days: [0]}

let pastries = [
    110249860,
    110270191,
    111200136,
    107391540,
    104738325,
    109706912,
    105775591
];



( async () => {

    console.log("booting")

    

    return;

    let token = await getToken();

    let uiHeaders = {
        'X-Tenant': "X7MD",
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        // 'Ocp-Apim-Subscription-Key': this.uat ? uat[module].keys : api[module].keys
        "X-Token" : token
    } 
    
    let planId = "612ea182c70ab7278e249e72"

    let items = await http.post("https://proxy.freshiq.com/uat/productionplanning/productionschdulesitems/getitems", {id:392, _id:planId} ,{headers: uiHeaders})

    console.log(items)
    
    return;

    /**
     * Below to remove / add pastries from existing plans
     */


    let schedules = []

    let all = await http.post("https://proxy.freshiq.com/uat/productionplanning/schedules/get", payload ,{headers: uiHeaders})

    console.log(all.data.uiList)

    for(let schedule of all.data.uiList) {
        if( schedule["ProductionAreaNum"] != 265) continue;
        // if(![114,122,171,258,500,691].includes(schedule["StoreNum"])) continue;
        // if(![165,500].includes(schedule["StoreNum"])) continue;

        console.log(schedule["ProductionAreaNum"], schedule["StoreNum"], schedule["ProductionAreaNum"]==265 &&  schedule["StoreNum"] == 122 )

        mySched = {
            StoreNumber: schedule["StoreNum"],
            ProductionAreaNumber: schedule["ProductionAreaNum"],
            Day: schedule["DayOfWeek"],
            StartTime: schedule["StartTimeDisplay"].split(' ')[0],
            Description: schedule["Description"],
            Items: []
    
        }

        for(let pas of pastries) {

            mySched.Items.push({
                SKUNum: pas
            })
        
        }
    
        schedules.push(mySched)
    }

    // console.log(schedules[1], schedules.length)

    let conf = {
        headers : buildHeaders("X7MD", "production", true)
    }

    let url = buildUrl("X7MD", "production","ImportProductionSchedule", true);

    console.log(conf, url)

    /*

    for(let i = 0; i< schedules.length; i++) {

        try { 
            let test = await http.post(url, [schedules[i]], conf)
            console.log(
                schedules[i]["StoreNumber"],
                schedules[i]["ProductionAreaNumber"],
                schedules[i]["Day"],
                schedules[i]["StartTime"],
                "isValid : "+test.data.isValid)
        } catch (err) {
            console.log(err, Object.keys(err))
            throw "error"
        }
    
        
    }
    
    */
    

})()


