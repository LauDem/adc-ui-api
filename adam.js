const http = require('axios');
const {getToken} = require('./config/auth');
const {ScalesRepository, OrganisationRepository} = require('./repositories')
// const fs = require('fs');

// let uiUrl = "https://xcu8.freshiq.com/freshiq2/labeldata/labelschemas"

// let url1 = "https://proxy.freshiq.com/uat/labeling/labeldata/getLabelSchemas2"

// let labelSelectionValueSetDescription, scaleTypeOwnLabelNum, scaleTypeCode

let url2 = "https://proxy.freshiq.com/uat/labeling/labeldata/getLabelSchemaMappings2"

let getHeaders = async () => {

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

let loadSchemasMapping = async (id, headers) => {

    let mappingsResponse = await http.post(url2, {labelSchemaId : id}, headers)

    return mappingsResponse.data.uiList;

}

let deduplicateLabelSchemaMapping = async (headers) => {

    let labelSchemasAPIresponse = await http.post("https://proxy.freshiq.com/uat/labeling/labeldata/getLabelSchemas2", {}, headers)

    let labelSchemas = labelSchemasAPIresponse.data.uiList

    for(labelSchema of labelSchemas) {

        let mappings = await loadSchemasMapping(labelSchema.labelSchemaId, headers)

        let uniqueMappingIds = []

        let toBeDeleted = []
        
        for(let mapping of mappings) {

            let myMappingId = String(mapping.labelSelectionValueSetDescription+'-'+mapping.scaleTypeOwnLabelNum+'-'+mapping.scaleTypeCode);

            if(!uniqueMappingIds.includes(myMappingId)) {
                uniqueMappingIds.push(myMappingId);
                continue;
            }

            toBeDeleted.push(mapping.labelSchemaMappingId)

        }

        console.log(mappings[0],labelSchema.labelSchemaId, mappings.length, uniqueMappingIds.length)

        let deleted = await http.post("https://proxy.freshiq.com/uat/labeling/labeldata/deleteLabelSchemaMapping2", {SchemaMappingList: toBeDeleted}, headers);

        console.log(deleted, deleted.length)

        return deleted;

        // break;
    }

}

let getOrgUnits = async (types, headers) => {

    let apiResponse = await http.post("https://proxy.freshiq.com/uat/masterdata/organization/get", {}, headers);

    let allUnits = apiResponse.data;

    types = types.map(type => type.toLowerCase()) 

    let result = []

    console.log(types);
    

    let crawlTree = (tree, types) => {

        console.log(tree.orgTypeCode, tree.orgUnitNumber);
        
        
        if(!tree.children){ 
            console.log(tree)
            throw "no children found ";
        }

        for(let child of tree.children) {

            console.log(types, child.orgTypeCode.toLowerCase());

            if(types.includes(child.orgTypeCode.toLowerCase())) {
                let res = {...child};
                delete res.children;
                result.push(res)
            }

            if(child.children && child.children.length > 0 ) crawlTree(child, types);

        }
    }

    crawlTree(allUnits, types)

    return result;

    
}

let activateStores = async(allStores, headers) => {

    let payloads = []
    let stores = []

    let i =0;
    
    allStores.map(store => payloads.push({
        TenantCode: store.tenantCode,
        Id : store.organizationId

    }))

    headers = await getHeaders();

    for(let payload of payloads) {

        console.log("loading storeId "+payload.Id)

        // if(!payload.Id == 148) continue;

        try {        
            let store = await http.post("https://proxy.freshiq.com/uat/masterdata/stores/edit", payload, headers);
            stores.push(store.data.value)
            console.log("storeId "+payload.Id+" loaded")
            i++

        } catch(e) {
            console.log(Object.keys(e.response),e.response.headers)
            throw "script stopped"
        }

        // break;
    }

    console.log(i + " stores loaded successfully")

    headers = await getHeaders();

    for(let store of stores) {

        let payload = {
            AddressLineOne: store.addressLineOne,
            AddressLineTwo: store.addressLineTwo,
            City: store.city,
            CountryCode: store.countryCode,
            DepartmentId: store.departmentId,
            DistributionCenter: store.distributionCenter,
            ExtADGroup: store.extADGroup,
            IsActive: true,
            MTOPrinters: store.mtoPrinters,
            OrgUnitNumber: store.orgUnitNumber,
            ParentOrganizationId: store.parentOrganizationId,
            PostalCode: store.postalCode,
            PrinterId: store.printerId,
            StateProvince: store.stateProvince,
            StoreId: store.storeId,
            StoreName: store.storeName,
            TenantCode: store.tenantCode,
            TimeZone: store.timeZone
        }

        console.log(payload)

        // continue;

        console.log("activating store" + store.orgUnitNumber)

        try {
            await http.post("https://proxy.freshiq.com/uat/masterdata/stores/save", payload, headers)
        } catch(e) {
            console.log(e.response.headers, Object.keys(e.response))
            throw "process stopped with "+store.orgUnitNumber
        }

        console.log(store.orgUnitNumber + " activated")
    }

    return stores;

}

class Scale {

    constructor(IEditScale) {

    
        this.ScaleNumber =                  IEditScale.scaleNumber       
        this.Description =                  IEditScale.description       
        this.DepartmentList =               IEditScale.departmentList       
        this.IsActive =                     IEditScale.isActive       
        this.TypeCode =                     IEditScale.typeCode       
        this.UsageCode =                    IEditScale.usageCode       
        this.SendNutrition =                IEditScale.sendNutrition       
        this.SendText =                     IEditScale.sendText       
        this.KosherOnly =                   IEditScale.kosherOnly       
        this.PrintSafeHandling =            IEditScale.printSafeHandling       
        this.LabelStock =                   IEditScale.labelStock       
        this.ServiceType =                  IEditScale.serviceType       
        this.TareDecimalPlaces =            IEditScale.tareDecimalPlaces       
        this.TotalType =                    IEditScale.totalType       
        this.IPAddress =                    IEditScale.ipAddress       
        this.IPPort =                       IEditScale.ipPort       
        this.User =                         IEditScale.user       
        this.Password =                     IEditScale.password       
        this.Path =                         IEditScale.path       
        this.TimeoutMs =                    IEditScale.timeoutMs       
        this.LastEvent =                    IEditScale.lastEvent       
        this.TotalsLastRead =               IEditScale.totalsLastRead       
        this.LastPingAttempt =              IEditScale.lastPingAttempt       
        this.LastPingSuccess =              IEditScale.lastPingSuccess       
        this.LastCommunicationAttemp =      IEditScale.lastCommunicationAttemp       
        this.LastCommunicated =             IEditScale.lastCommunicated       
        this.TotalMemory =                  IEditScale.totalMemory       
        this.FreeMemory =                   IEditScale.freeMemory       
        this.LastReadPLU =                  IEditScale.lastReadPLU       
        this.LastReadScalePLU =             IEditScale.lastReadScalePLU       
        this.PLUCount =                     IEditScale.pluCount       
        this.FirmwareVersion =              IEditScale.firmwareVersion       
        this.FirmwareUpdated =              IEditScale.firmwareUpdated       
        this.TenantCode =                   IEditScale.tenantCode       
        this.ScaleId =                      IEditScale.scaleId       
        this.StoreId =                      IEditScale.storeId       
    }       

    deactivate() {
        this.IsActive = false;
    }

    activate() {
        this.IsActive = true;
    }
}

let deactivateScales = async (stores, headers) => {

    headers = await getHeaders();

    console.log(stores[0])

    for(let store of stores) 
    {

    }


}

let adam = async () => {

    let tenant = ["XCU8", "adcadmin", "sk0reZero"];

    let scaleService = new ScalesRepository(...tenant);

    let orgRepo = new OrganisationRepository(...tenant);

    // let scales = await repo.getScalesByStore(66);

    // console.log(scales)

    

    let stores = await orgRepo.getAllStores()

    let storeIdList = []

    for(let store of stores) {
        // scales = await scaleService.getScalesByStore(store.organizationId)

        storeIdList.push(store.organizationId)
    }

    console.log(storeIdList)

    await scaleService.deactivateAllScales(storeIdList)

    


    

    return;


    // let deletedLabelSchemaMappingDuplicates = await deduplicateLabelSchemaMapping(headers)

    let headers= await getHeaders()

    let allStores = await getOrgUnits(["Store"], headers)



    // let reactivatedStores = await activateStores(allStores, headers)

    // console.log(reactivatedStores)

    let deactivatedScales = await deactivateScales(allStores, headers)


}

adam()

