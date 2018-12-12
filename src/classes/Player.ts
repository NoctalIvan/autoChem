import { IResource } from "../interfaces/IResource";
import { Unit } from "./Unit";
import { ElementType } from "../enums/ElementType";

export class Player {
    resources:{[type: string]: IResource}
    units:Unit[]

    // stats
    lastEnergyBilan: {produce:number, consume:number}
    lastResourceProduction: {[type: string]: IResource}
    lastStorageCap: {[type: string]: IResource}

    constructor() {
        this.resources = {}
        this.units = []
    }

    resolveTick() {
        this.lastEnergyBilan = this.getEnergyBilan()
        const energyPercentage = Math.min(this.lastEnergyBilan.produce / this.lastEnergyBilan.consume, 1)
        this.resolveProductionTick(energyPercentage)
        this.resolveStorageCap()
    }

    getEnergyBilan(): {produce:number, consume:number} {
        return this.units.reduce((acc, unit) => {
            const bilan = unit.getEnergyBilan()
            if(bilan > 0) {
                return {produce: acc.produce + bilan, consume: acc.consume}
            } else {
                return {produce: acc.produce, consume: acc.consume - bilan}
            }
        }, {produce: 0, consume: 0})
    }

    resolveProductionTick(energyPercentage:number) {
        this.lastResourceProduction = {}

        this.units.sort((a,b) => b.priority - a.priority)
        this.units.forEach(unit => {
            // get production
            let prod = unit.getResourceBilan(energyPercentage)
            if(prod.length == 0) {
                return
            }

            // limit prod if insufficient resources
            const minRessourceRatio = prod.reduce((min, resource) => {
                if(resource.amount >= 0) {
                    return min
                }

                if(!this.resources[resource.type] || this.resources[resource.type].amount == 0) {
                    return 0
                }

                return Math.min(this.resources[resource.type].amount / -resource.amount, min)
            }, 1)

            if(minRessourceRatio < 1) {
                prod = unit.getResourceBilan(energyPercentage * minRessourceRatio)
            }

            // execute
            prod.forEach(resource => {
                if(!this.resources[resource.type]) {
                    this.resources[resource.type] = {type: resource.type, amount: 0}
                }
                if(!this.lastResourceProduction[resource.type]) {
                    this.lastResourceProduction[resource.type] = {type: resource.type, amount: 0}
                }
                
                this.resources[resource.type] = {type: resource.type, amount: this.resources[resource.type].amount + resource.amount}
                this.lastResourceProduction[resource.type] = {type: resource.type, amount: this.lastResourceProduction[resource.type].amount + resource.amount}
            })
        })
    }

    resolveStorageCap() {
        this.lastStorageCap = {}
        this.lastStorageCap['$'] = {type: ElementType.$, amount: Infinity}
        this.units.forEach(unit => {
            unit.resourceStorage.forEach(resource => {
                if(this.lastStorageCap[resource.type]) {
                    this.lastStorageCap[resource.type].amount = this.lastStorageCap[resource.type].amount + resource.amount
                } else {
                    this.lastStorageCap[resource.type] = {type: resource.type, amount: resource.amount}
                }
            })
        })

        Object.keys(this.resources).forEach(resourceType => {
            const cap = this.lastStorageCap[resourceType] || {amount: 0}
            this.resources[resourceType].amount = Math.min(this.resources[resourceType].amount, cap.amount)
        })
    }
}