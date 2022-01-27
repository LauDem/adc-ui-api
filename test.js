const allPlans = require('./data/v2.all-plans');
const pieShopSchedules = require('./data/v1.pieShopPlans.json');
const scottishStores = require('./scottishStores'); 
const http = require('axios');
const {getToken} = require('./auth');
const fs = require('fs');

const toBeAdded = require('./data/toBeAdded');

// console.log(scottishStores, scottishStores.length, pieShopSchedules.length)

let allScheduleIds = [];
let scotScheduleIds = [];

for(let sched of pieShopSchedules) {
    allScheduleIds.push(sched.scheduleId)
    if(scottishStores.includes(sched.storeNum)) scotScheduleIds.push(sched.scheduleId)
}

let requests = {}

for(let sched of pieShopSchedules) {

    requests[sched.scheduleId] = {ProductionPointID : sched.scheduleId, Items:[]}

    for(let index in toBeAdded) {

        let item = toBeAdded[index]

        if(item.stores == "Sco" & !scottishStores.includes(sched.storeNum)) continue;

        if(item.mirror) {

            let schedItems = []

            for(let i of sched.scheduleItems) {
                schedItems.push(i.itemNumber)
            }

            if(!schedItems.includes(item.mirror)) continue;
        }

        requests[sched.scheduleId].Items.push({
                ItemAutoId:item.ItemAutoId,
                Priority:"",
                MinCaseQty:"0.000",
                SafetyStock:"2.000"
        })


    }

    // break;

}

console.log(Object.keys(requests).length)

fs.writeFile('./data/requests.json', JSON.stringify(requests, null, 4), ()=>{console.log("requests written")})


/**
 * BELOW : 
 * verification only
 */


let itemAutoIds = []

for(let a in toBeAdded) {
    itemAutoIds.push(toBeAdded[a].ItemAutoId)
}
var found = false;

for(let sched of pieShopSchedules) {
    if(!scottishStores.includes(sched.storeNum)) continue;
    for(let it of sched.scheduleItems) {
        if(it.itemNumber == 109540457) {
            var testSched = sched.scheduleId;
            found = true;
            // console.log("testSchedule : ",testSched)
            break;
        }
    }
    if(found) break;
    
}

// console.log(testSched)


for(let r in requests) {

    if(r != testSched) continue;

    let req = requests[r];

    if(req.Items.length != 14) {

        let notAdded = [];
        let thisAutoIds = []

        for(let i of req.Items) {
            thisAutoIds.push(i.ItemAutoId)
        }

        for(iai of itemAutoIds){
            if(!thisAutoIds.includes(iai)) notAdded.push(iai)
        }
        // console.log(req, testSched,r, notAdded); 
        break;
    }
}



let addXMasItems = async()=>{
    
    let token = await getToken("FSPR", "adcadmin", "adcadmin")
    
    const headers =  {headers :
    {
        'X-Tenant': "FSPR",
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        "X-Token" : token
    }
} 


    let pieShopSchedules = []

    // for(let plan of allPlans) {
    //     if(plan.ProductionAreaNum == 392) pieShopPlans.push(plan)
    // }

    let payload = {"Stores":[306,309,311,318,411,483,527,576,633,12,191,205,302,303,304,305,307,313,373,410,479,30,46,54,69,83,99,100,106,111,116,154,232,233,234,235,236,237,246,288,368,387,414,608,628,656,321,322,323,325,328,329,330,331,332,333,334,335,336,338,339,344,347,366,372,490,496,499,560,81,86,103,115,275,277,278,279,280,282,283,285,286,385,439,471,491,511,556,655,657,1,85,92,118,126,276,281,284,287,290,291,296,299,301,314,317,319,388,449,482,485,486,518,549,571,586,644,84,142,143,300,320,324,326,327,340,341,342,343,346,348,349,359,363,436,538,559,575,634,672,678,113,140,158,293,294,295,297,298,315,316,356,360,402,413,441,447,520,558,572,642,643,50,67,73,78,121,125,127,159,231,238,239,243,244,251,253,256,260,262,392,448,484,504,674,345,351,352,353,354,355,358,361,362,364,367,404,423,424,429,480,522,539,546,553,630,640,641,82,87,95,96,130,157,166,240,247,248,252,254,258,266,268,269,270,273,274,337,407,468,469,573,652,692,24,63,90,153,241,242,245,250,257,259,261,263,264,393,401,442,545,547,552,554,585,658,691,9313,2,3,4,7,8,10,11,15,17,36,56,65,76,89,108,110,133,137,155,224,226,230,419,694,5,38,41,45,59,60,66,74,97,104,134,138,151,212,213,218,384,394,398,493,557,651,35,64,147,148,150,167,168,173,174,175,176,177,182,187,200,201,203,207,379,381,409,450,500,510,648,19,21,22,28,37,57,71,93,105,119,122,149,208,209,215,216,217,377,383,391,461,508,574,26,40,47,55,58,80,88,91,94,102,124,128,132,146,202,204,206,214,221,223,389,474,478,567,635,668,49,68,77,120,129,131,210,220,255,265,267,271,272,395,397,416,417,425,440,497,509,551,561,598,677,135,145,152,160,161,162,163,164,178,180,184,188,189,193,194,195,197,452,487,582,647,23,27,29,31,39,48,52,61,62,72,75,98,101,112,114,225,229,289,460,472,512,580,649,650,670,14,32,33,34,42,51,53,70,79,107,109,123,144,219,227,228,350,430,437,475,533,555,563,583,605,44,117,136,139,156,165,169,170,171,172,179,181,183,185,190,192,196,198,199,374,375,438,492,516,664,693],"Days":[0,1,2,3,4,5,6]};

    let response = await http.post("https://prod-ue2-proxy.azurewebsites.net/prod/masterdata/schedules/get", payload, headers);

    let allSchedules = response.data.uiList
    let stores = []

    for(let sched of allSchedules) {

        if(sched.productionAreaNum == 392) {
            pieShopSchedules.push(sched)
            if(!stores.includes(sched.storeNum)) stores.push(sched.storeNum)
        }

    }

    fs.writeFile('./data/v1.pieShopPlans.json', JSON.stringify(pieShopSchedules, null, 4), ()=>{console.log("v1.pieShopPlans.json written")})

    // console.log(allSchedules.length, pieShopSchedules.length)

    console.log(stores.length)

    // console.log(Array.isArray(schedules))
}

//addXMasItems()

let count = 0;
let stores = []

for(let s of allPlans) {
    if (s.ProductionAreaNum == 392) {
        count ++;
        if(!stores.includes(s.StoreNum)) stores.push(s.StoreNum)

    }
}

let payload = {"Stores":[306,309,311,318,411,483,527,576,633,12,191,205,302,303,304,305,307,313,373,410,479,30,46,54,69,83,99,100,106,111,116,154,232,233,234,235,236,237,246,288,368,387,414,608,628,656,321,322,323,325,328,329,330,331,332,333,334,335,336,338,339,344,347,366,372,490,496,499,560,81,86,103,115,275,277,278,279,280,282,283,285,286,385,439,471,491,511,556,655,657,1,85,92,118,126,276,281,284,287,290,291,296,299,301,314,317,319,388,449,482,485,486,518,549,571,586,644,84,142,143,300,320,324,326,327,340,341,342,343,346,348,349,359,363,436,538,559,575,634,672,678,113,140,158,293,294,295,297,298,315,316,356,360,402,413,441,447,520,558,572,642,643,50,67,73,78,121,125,127,159,231,238,239,243,244,251,253,256,260,262,392,448,484,504,674,345,351,352,353,354,355,358,361,362,364,367,404,423,424,429,480,522,539,546,553,630,640,641,82,87,95,96,130,157,166,240,247,248,252,254,258,266,268,269,270,273,274,337,407,468,469,573,652,692,24,63,90,153,241,242,245,250,257,259,261,263,264,393,401,442,545,547,552,554,585,658,691,9313,2,3,4,7,8,10,11,15,17,36,56,65,76,89,108,110,133,137,155,224,226,230,419,694,5,38,41,45,59,60,66,74,97,104,134,138,151,212,213,218,384,394,398,493,557,651,35,64,147,148,150,167,168,173,174,175,176,177,182,187,200,201,203,207,379,381,409,450,500,510,648,19,21,22,28,37,57,71,93,105,119,122,149,208,209,215,216,217,377,383,391,461,508,574,26,40,47,55,58,80,88,91,94,102,124,128,132,146,202,204,206,214,221,223,389,474,478,567,635,668,49,68,77,120,129,131,210,220,255,265,267,271,272,395,397,416,417,425,440,497,509,551,561,598,677,135,145,152,160,161,162,163,164,178,180,184,188,189,193,194,195,197,452,487,582,647,23,27,29,31,39,48,52,61,62,72,75,98,101,112,114,225,229,289,460,472,512,580,649,650,670,14,32,33,34,42,51,53,70,79,107,109,123,144,219,227,228,350,430,437,475,533,555,563,583,605,44,117,136,139,156,165,169,170,171,172,179,181,183,185,190,192,196,198,199,374,375,438,492,516,664,693],"Days":[0,1,2,3,4,5,6]};


// console.log(stores.length)

