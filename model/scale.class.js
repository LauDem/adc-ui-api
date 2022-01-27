class Scale {

    constructor(editScale) {

        let mapping = this.saveEditMapping();

        for(let prop in mapping) {

            this[prop]=editScale[mapping[prop]]
        }


    }

    update(updatedProperties) {

        for(let prop in updatedProperties) {

            if(!this.hasOwnProperty(prop)) throw new Error(" Property not found. \n cannot update property "+String(prop)+ " on class "+this.constructor.name + ".\n \n Found properties"+Object.keys(this));

            this[prop] = updatedProperties[prop]
        }

        return this;
    }

    saveEditMapping() {
        return {
            StoreId: 'storeId',
            ScaleId: 'scaleId',
            ScaleNumber: 'scaleNumber',
            Description: 'description',
            DepartmentList: 'departmentList',
            IsActive: 'isActive',
            TypeCode: 'typeCode',
            UsageCode: 'usageCode',
            SendNutrition: 'sendNutrition',
            SendText: 'sendText',
            KosherOnly: 'kosherOnly',
            PrintSafeHandling: 'printSafeHandling',
            LabelStock: 'labelStock',
            ServiceType: 'serviceType',
            TareDecimalPlaces: 'tareDecimalPlaces',
            TotalType: 'totalType',
            User: 'user',
            Password: 'password',
            Path: 'path',
            TimeoutMs: 'timeoutMs',
            LastEvent: 'lastEvent',
            TotalsLastRead: 'totalsLastRead',
            LastPingAttempt: 'lastPingAttempt',
            LastPingSuccess: 'lastPingSuccess',
            LastCommunicationAttemp: 'lastCommunicationAttemp',
            LastCommunicated: 'lastCommunicated',
            TotalMemory: 'totalMemory',
            FreeMemory: 'freeMemory',
            LastReadPLU: 'lastReadPLU',
            LastReadScalePLU: 'lastReadScalePLU',
            FirmwareVersion: 'firmwareVersion',
            FirmwareUpdated: 'firmwareUpdated',
            TenantCode: 'tenantCode',
            IPAddress: 'ipAddress',
            IPPort: 'ipPort',
            PLUCount: 'pluCount'
          }
    } 
}

module.exports = {Scale};