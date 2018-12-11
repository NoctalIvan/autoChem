import { IResource } from "../interfaces/IResource";
import { UnitType } from "../enums/UnitType";
import { IUnitModel } from "../interfaces/IUnitModel";

export class Unit {
    name:string
    type:UnitType
    cpt:number

    // input,output
    resourceBilan:IResource[]
    energyBilan:number

    // storage
    resourceStorage:IResource[]

    // building
    baseBuildCost:number
    buildCostMultiplier:number

    // settings
    productivity:number
    priority:number

    constructor(model:IUnitModel) {
        this.name = model.name
        this.type = model.type
        this.resourceBilan = model.resourceBilan
        this.energyBilan = model.energyBilan
        this.resourceStorage = model.resourceStorage
        this.baseBuildCost = model.baseBuildCost
        this.buildCostMultiplier = model.buildCostMultiplier

        this.cpt = 1
        this.productivity = 1
        this.priority = 0.5
    }

    getEnergyBilan():number {
        return this.energyBilan * this.productivity * this.cpt
    }

    getResourceBilan(resourceCapPercentage:number):IResource[] {
        const mult = this.productivity * resourceCapPercentage
        return this.resourceBilan.map(resource => ({...resource, amount: resource.amount * mult}))
    }

    getUpgradeCost() {
        return this.baseBuildCost * Math.pow(this.buildCostMultiplier, this.cpt)
    }

    upgrade() {
        this.cpt ++
    }
}