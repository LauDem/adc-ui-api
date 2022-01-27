const {Scale} = require("./scale.class")

var manualMapping = {
    'IPAddress': "ipAddress",
    'IPPort': "ipPort",
    'PLUCount': "pluCount"
}

var saveFields = {"ScaleNumber":3,"Description":"Deli IP-68","DepartmentList":[35,36],"IsActive":false,"TypeCode":"HOBART_HLX","UsageCode":"ARO","SendNutrition":false,"SendText":false,"KosherOnly":false,"PrintSafeHandling":2,"LabelStock":0,"ServiceType":0,"TareDecimalPlaces":1,"TotalType":1,"IPAddress":"10.160.107.68","IPPort":"","User":"","Password":"","Path":"","TimeoutMs":25000,"LastEvent":"426184","TotalsLastRead":"2021-07-08T09:04:28.86Z","LastPingAttempt":"2021-08-11T10:31:00Z","LastPingSuccess":"2021-08-11T10:31:00Z","LastCommunicationAttemp":"2021-08-11T10:31:00Z","LastCommunicated":"2021-08-11T10:33:00Z","TotalMemory":"6341328896","FreeMemory":"5122838528","LastReadPLU":"2021-07-27T02:35:45Z","LastReadScalePLU":"2021-07-27T02:37:00Z","PLUCount":1579,"FirmwareVersion":"1.8.0","FirmwareUpdated":"2021-07-27T02:37:00.783Z","TenantCode":"XCU8","ScaleId":238,"StoreId":97};

var editFields = {"fields":{"General":[{"name":"ScaleNumber","label":"Scale Number","value":2,"type":"Numeric","readOnly":true,"mandatory":true,"min":1,"max":255,"multiSelect":false,"timeOnly":false},{"name":"Description","label":"Description","value":"Deli IP-67","type":"String","readOnly":false,"mandatory":true,"multiSelect":false,"timeOnly":false},{"name":"DepartmentList","label":"Department List","value":[35,36],"type":"List","readOnly":false,"mandatory":true,"pickList":[{"value":5,"label":"5 - Alcoholic Beverage"},{"value":4,"label":"3 - Bulk Foods"},{"value":40,"label":"95 - Company Supplies"},{"value":32,"label":"60 - Customer Service"},{"value":13,"label":"13 - Dairy"},{"value":12,"label":"12 - Deli"},{"value":9876,"label":"9876 - DummyDepartment"},{"value":18,"label":"24 - Floral"},{"value":16,"label":"19 - Foodservice"},{"value":7,"label":"7 - Frozen"},{"value":8,"label":"8 - General Merchandise"},{"value":26,"label":"36 - Gonzales Dairy"},{"value":27,"label":"38 - Gonzales Deli"},{"value":25,"label":"34 - Gonzales Frozen"},{"value":22,"label":"29 - Gonzales GM"},{"value":19,"label":"25 - Gonzales Grocery"},{"value":21,"label":"28 - Gonzales HBC"},{"value":29,"label":"42 - Gonzales Meat"},{"value":20,"label":"26 - Gonzales Non-Foods"},{"value":30,"label":"50 - Gonzales Non-Hispanic"},{"value":28,"label":"40 - Gonzales Produce"},{"value":23,"label":"32 - Gonzales Refrigerated"},{"value":24,"label":"33 - GONZALES REFRIGERATED"},{"value":31,"label":"52 - Gonzales Restaurant"},{"value":6,"label":"6 - Groc Non Foods"},{"value":2,"label":"1 - Grocery"},{"value":9,"label":"9 - Health Beauty Wellness"},{"value":14,"label":"17 - In-Store Bakery"},{"value":34,"label":"80 - Interscale Bakery"},{"value":37,"label":"84 - Interscale Bulk Foods"},{"value":38,"label":"85 - Interscale Meat"},{"value":36,"label":"83 - Interscale Produce"},{"value":35,"label":"82 - Interscale Serv Deli"},{"value":11,"label":"11 - Meat"},{"value":33,"label":"70 - Pharmacy"},{"value":17,"label":"23 - Produce"},{"value":1,"label":"0 - Service Area 0"},{"value":3,"label":"2 - Service Area 2"},{"value":15,"label":"18 - Service Deli"},{"value":42,"label":"20 - Specialty Deli"},{"value":39,"label":"90 - Store Supplies"},{"value":41,"label":"99 - Unclassified"},{"value":10,"label":"10 - Value/Dollar"}],"multiSelect":true,"timeOnly":false},{"name":"IsActive","label":"Active","value":false,"type":"Boolean","readOnly":false,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"TypeCode","label":"Type","value":"HOBART_HLX","type":"String","readOnly":false,"mandatory":true,"pickListString":[{"value":"BIZERBA","label":"Bizerba SC/SW/K/XC Series"},{"value":"DIG4600TCP","label":"NBI Digi DPS4600 TCP (USA only)"},{"value":"DIG5500US","label":"Digi SM5500 US"},{"value":"DIGDPS4600","label":"DIGI DPS 4600"},{"value":"DIGDPS5600","label":"DIGI DPS 5600 FTP"},{"value":"DPS5600US","label":"DIGI DPS 5600"},{"value":"DIGI_DP90","label":"Digi DP 90"},{"value":"DIGI_SM90","label":"Digi SM90"},{"value":"DIGSM720US","label":"Digi SM720 US"},{"value":"HOB_ACCESS","label":"Hobart Access"},{"value":"HOB_ULTIMA","label":"Hobart Ultima"},{"value":"HOBART_HLX","label":"Hobart HLX"},{"value":"HOBART_HTI","label":"Hobart HTi"},{"value":"HOBQUANTUM","label":"Hobart Quantum"},{"value":"LBLPRINTER","label":"M&M \\ Lone Peak Labeler"},{"value":"TEK_L_VIEW","label":"Label View"},{"value":"TOL32MUCST","label":"Toledo UCST"},{"value":"TOLEDO8460","label":"Toledo 8460 (SmartTouch)"},{"value":"TOLEDOUCCW","label":"Toledo UCCW"},{"value":"TOLIMPACTM","label":"Toledo Impact M"},{"value":"TOLIMPACTS","label":"Toledo Impact S"}],"multiSelect":false,"timeOnly":false},{"name":"UsageCode","label":"Usage","value":"ARO","type":"String","readOnly":false,"mandatory":false,"pickListString":[{"value":"","label":" - "},{"value":"AFS123","label":"AFS123 - AFS 85 to 123"},{"value":"AFSDEFLT","label":"AFSDEFLT - AFS Default - 3.5 in"},{"value":"ALSFOODT","label":"ALSFOODT - Al's Foodtown"},{"value":"ARO","label":"ARO - ARO DEFAULT"},{"value":"AROACSHT","label":"AROACSHT - ARO Hobart Access HTI"},{"value":"AROAxLnx","label":"AROAxLnx - ARO Access Linux"},{"value":"BEES","label":"BEES - BEES USAGE"},{"value":"Benedict","label":"Benedict - Benedict's"},{"value":"BLAIRS","label":"BLAIRS - BLAIRS USAGE"},{"value":"BOWMANS","label":"BOWMANS - BOWMANS USAGE"},{"value":"BROULIMS","label":"BROULIMS - Broulim's"},{"value":"BURLEY","label":"BURLEY - Stokes Burley"},{"value":"DAVISFD","label":"DAVISFD - DAVIS FOOD AND DRUG USAGE"},{"value":"DAYS","label":"DAYS - DAYS USAGE"},{"value":"DEFAULT","label":"DEFAULT - Default Scale Usage"},{"value":"DJS","label":"DJS - DJ's THRIFTWAY"},{"value":"GOULDING","label":"GOULDING - GOULDINGS"},{"value":"HEEBS","label":"HEEBS - Heeb's"},{"value":"HINES","label":"HINES - HINES GENERAL STORE"},{"value":"HONEY'S","label":"HONEY'S - HONEY'S MARKETPLACE"},{"value":"HONEYBEE","label":"HONEYBEE - Honey Bee's"},{"value":"IMPORT","label":"IMPORT - Label Imports"},{"value":"JEFFERSO","label":"JEFFERSO - JEFFERSON'S"},{"value":"KAMAS","label":"KAMAS - KAMAS USAGE"},{"value":"KENTS","label":"KENTS - KENTS USAGE"},{"value":"KHOURYS","label":"KHOURYS - KHOURY'S USAGE"},{"value":"LALLATIN","label":"LALLATIN - LALLATINS"},{"value":"LBL111","label":"LBL111 - Label ID 111"},{"value":"LEES","label":"LEES - Lee's"},{"value":"LEESDELI","label":"LEESDELI - Lee's Deli 1.75 inch label"},{"value":"LEESOX","label":"LEESOX - Lees Access OX"},{"value":"LINS","label":"LINS - Lin's"},{"value":"Maceys","label":"Maceys - Macey's"},{"value":"Mack","label":"Mack - Mack"},{"value":"Mack's","label":"Mack's - MACK'S USAGE"},{"value":"MARKUS","label":"MARKUS - MARKUS USAGE"},{"value":"MIDWAYMT","label":"MIDWAYMT - Midway Market 11040"},{"value":"MIKE","label":"MIKE - MIKE"},{"value":"MIKE'S","label":"MIKE'S - MIKE'S FOOD TOWN"},{"value":"MIKEMRKT","label":"MIKEMRKT - MIKES MARKET USAGE"},{"value":"MISSOULA","label":"MISSOULA - MISSOULA USAGE"},{"value":"NOCHANGE","label":"NOCHANGE - Leave Label at Default ID"},{"value":"PETERSON","label":"PETERSON - PETERSONS USAGE"},{"value":"REYNOLDS","label":"REYNOLDS - Reynolds"},{"value":"SAVEWAY","label":"SAVEWAY - SAVEWAY USAGE"},{"value":"SOELBERG","label":"SOELBERG - SOELBERGS"},{"value":"STEWARTS","label":"STEWARTS - STEWARTS USAGE"},{"value":"STOKES","label":"STOKES - Stokes"},{"value":"STOKESP","label":"STOKESP - STOKES PRESTON USAGE"},{"value":"STOKSBUT","label":"STOKSBUT - Stokes Butte"},{"value":"VALLEY","label":"VALLEY - VALLEY MARKET USAGE"},{"value":"WATTS","label":"WATTS - WATTS USAGE"}],"multiSelect":false,"timeOnly":false},{"name":"SendNutrition","label":"Send Nutrition","value":false,"type":"Boolean","readOnly":false,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"SendText","label":"Send Text","value":false,"type":"Boolean","readOnly":false,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"KosherOnly","label":"Kosher Only","value":false,"type":"Boolean","readOnly":false,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"PrintSafeHandling","label":"Print Safe Handling","value":2,"type":"Numeric","readOnly":false,"mandatory":false,"pickList":[{"value":0,"label":"By PLU"},{"value":1,"label":"Always"},{"value":2,"label":"Never"}],"multiSelect":false,"timeOnly":false},{"name":"LabelStock","label":"Label Stock","value":0,"type":"Numeric","readOnly":false,"mandatory":false,"pickList":[{"value":0,"label":"Portrait"},{"value":1,"label":"Landscape"}],"multiSelect":false,"timeOnly":false},{"name":"ServiceType","label":"Service Type","value":0,"type":"Numeric","readOnly":false,"mandatory":false,"pickList":[{"value":0,"label":"Self"},{"value":1,"label":"Full"}],"multiSelect":false,"timeOnly":false},{"name":"TareDecimalPlaces","label":"Tare Decimal Places","value":1,"type":"Numeric","readOnly":false,"mandatory":false,"pickList":[{"value":0,"label":"Two"},{"value":1,"label":"Three"}],"multiSelect":false,"timeOnly":false},{"name":"TotalType","label":"Total Type","value":1,"type":"Numeric","readOnly":false,"mandatory":false,"pickList":[{"value":0,"label":"Accumulator"},{"value":1,"label":"Transactional"}],"multiSelect":false,"timeOnly":false},{"name":"IPAddress","label":"IP Address","value":"10.160.127.67","type":"String","readOnly":false,"mandatory":true,"min":7,"max":15,"multiSelect":false,"timeOnly":false},{"name":"IPPort","label":"IP Port","value":6000,"type":"Numeric","readOnly":false,"mandatory":false,"min":1,"max":65535,"multiSelect":false,"timeOnly":false},{"name":"User","label":"User","value":"","type":"String","readOnly":false,"mandatory":false,"multiSelect":false,"hidden":true,"timeOnly":false},{"name":"Password","label":"Password","value":"","type":"String","readOnly":false,"mandatory":false,"multiSelect":false,"hidden":true,"timeOnly":false},{"name":"Path","label":"Path","value":"","type":"String","readOnly":false,"mandatory":false,"multiSelect":false,"hidden":true,"timeOnly":false},{"name":"TimeoutMs","label":"Timeout (ms)","value":25000,"type":"Numeric","readOnly":false,"mandatory":false,"min":1,"max":60000,"multiSelect":false,"timeOnly":false},{"name":"LastEvent","label":"Last Event","value":"426184","type":"String","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"TotalsLastRead","label":"Totals Last Read","value":"2021-07-08T11:04:13.577Z","type":"DateTime","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"LastPingAttempt","label":"Last Ping Attempt","value":"2021-08-11T10:30:00Z","type":"DateTime","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"LastPingSuccess","label":"Last Ping Success","value":"2021-08-11T10:30:00Z","type":"DateTime","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"LastCommunicationAttemp","label":"Last Communication Attempt","value":"2021-08-11T10:30:00Z","type":"DateTime","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"LastCommunicated","label":"Last Communicated","value":"2021-08-11T10:32:00Z","type":"DateTime","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"TotalMemory","label":"Total Memory (kb)","value":"6341328896","type":"String","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"FreeMemory","label":"Free Memory","value":"5079916544","type":"String","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"LastReadPLU","label":"Last Read PLU","value":"2021-07-27T02:36:04Z","type":"DateTime","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"LastReadScalePLU","label":"Last Read Scale PLU","value":"2021-07-27T02:36:00Z","type":"DateTime","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"PLUCount","label":"PLU Count","value":1529,"type":"Numeric","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"FirmwareVersion","label":"Firmware Version","value":"1.8.0","type":"String","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false},{"name":"FirmwareUpdated","label":"Firmware Last Read On","value":"2021-07-27T02:36:18.1Z","type":"DateTime","readOnly":true,"mandatory":false,"multiSelect":false,"timeOnly":false}]},"subSideNav":[{"name":"general","label":"General","section":"General"}],"headers":{},"value":{"storeId":95,"orgUnitNumber":10971,"scaleId":222,"deviceServerNumber":0,"general":null,"scaleNumber":2,"description":"Deli IP-67","departmentList":[35,36],"departmentNumberList":[],"isActive":false,"typeCode":"HOBART_HLX","typeDesc":"","usageCode":"ARO","usageDescription":"","scaleData":null,"sendNutrition":false,"sendText":false,"kosherOnly":false,"printSafeHandling":2,"labelStock":0,"serviceType":0,"tareDecimalPlaces":1,"totalType":1,"communications":null,"ipAddress":"10.160.127.67","ipPort":6000,"user":"","password":"","path":"","timeoutMs":25000,"lastEvent":"426184","totalsLastRead":"2021-07-08T11:04:13.577Z","lastPingAttempt":"2021-08-11T10:30:00Z","lastPingSuccess":"2021-08-11T10:30:00Z","lastCommunicationAttemp":"2021-08-11T10:30:00Z","lastCommunicated":"2021-08-11T10:32:00Z","scaleInternalDetails":null,"totalMemory":"6341328896","freeMemory":"5079916544","lastReadPLU":"2021-07-27T02:36:04Z","lastReadScalePLU":"2021-07-27T02:36:00Z","pluCount":1529,"firmwareVersion":"1.8.0","firmwareUpdated":"2021-07-27T02:36:18.1Z","status":"Inactive","canAdd":true,"canSave":true,"canDelete":true,"canRead":true,"lastUpdatedUTC":"2021-11-23T13:17:34.005Z","lastUpdatedBy":"adcadmin","qdType":"Scale","tenantCode":"XCU8","eTag":null,"partitionKey":null,"rowKey":null,"timestamp":"0001-01-01T00:00:00+00:00"}}

let capitalizeFirstLetter = (str) => {
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

let build = () => {

    
    editFields = editFields["value"]

    console.log(editFields)

    let scale = new Scale(editFields);

    scale = scale.update({
        PLUCount : "Laurent's script"
    })

    console.log(scale)

    return;

    console.log(Object.keys(editFields).length, Object.keys(saveFields).length)

    let mapping = {}

    for(let prop of Object.keys(editFields)) {



        let str = capitalizeFirstLetter(prop);
        // console.log(str);

        if(Object.keys(saveFields).includes(str)) {
            mapping[str] = prop;
            delete editFields[prop];
            delete saveFields[str]

        }

        

        

    }

    result = {...mapping, ...manualMapping}

    console.log(result)

    Object.keys(saveFields).map(prop => {
        if(result[prop]) delete saveFields[prop]
    })

    console.log(Object.keys(editFields).length, Object.keys(saveFields).length)

    console.log(Object.keys(saveFields))

    




     
}

build()


