

const { Scale } = require("./model/scale.class");
const {Repository} = require("./repository.class");




class OrganisationRepository extends Repository {

    constructor(tenant, login, password) {
        super(tenant, login, password)
    }

    async getOrganization() {

        let resp = await this.call("organizationGet");

        // console.log(resp)

        return resp;
    }

    async getAllStores() {

        let org = await this.getOrganization();

        console.log(org)

        let result = []

        let types = ["store"]

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

        crawlTree(org, types)

        return result;
    
    
    
    }

    async updateStore(currentState, updatedProperties) {

        
    }




}



class ScalesRepository extends Repository {


    constructor(tenant, login, password) {

        super(tenant, login, password)

    }


    async getScalesByStore(storeId)  {

        console.log("loading scales for store "+storeId)

        let response = await this.call("storeEdit", {Id: storeId, TenantCode: this.tenant});

        // console.log(response)

        let scales = response.value.scales;

        console.log(scales)

        return scales;
    }

    async updateScale(storeId, scaleId, updatedProperties) {

        console.log("start updating scale "+scaleId+ " for store "+storeId)
        console.log(updatedProperties);

        

        let currentState = await this.call("scaleEdit", {"ScaleId":scaleId,"StoreId":storeId})

        console.log("received current state for scale "+ scaleId, currentState.value)

        let scale = new Scale(currentState.value);

        scale.update(updatedProperties)

        await this.call("scaleSave", scale)

        console.log("saved new state for scale "+ scaleId +"\n", scale)

        return scale;
    }

    async deactivateAllScales(storeIdList){

        let toBeUpdated = []

        for(let storeId of storeIdList) {
            let scales = await this.getScalesByStore(storeId);
            
            for(let scale of scales) {
                toBeUpdated.push([scale["storeId"], scale["scaleId"]])
            }
        }

        console.log("preparing to deactivate following [storeId | scaleId ] ", toBeUpdated)
        cons

        let count = 0;
        let skip = false;

        for(let elem of toBeUpdated) {

            count++

            if(elem[0] == 173 && elem[1] == 512) skip = false;

            if(skip) continue;

            console.log("deactivating [storeId | scaleId ] : ", elem)
            await this.updateScale(...elem, {IsActive:false})
            console.log("scale "+elem[1]+" deactivated")

            // if(count >9) break;
        }

        console.log("successfuly updated "+toBeUpdated.length+ "scales")

    }


    




}



module.exports = {ScalesRepository, OrganisationRepository};