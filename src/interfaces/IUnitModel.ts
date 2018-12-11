import { UnitType } from "../enums/UnitType";
import { IResource } from "./IResource";

export interface IUnitModel {
    id:string
    name:string
    type:UnitType

    // input,output
    resourceBilan:IResource[]
    energyBilan:number

    // storage
    resourceStorage:IResource[]

    // building
    baseBuildCost:number
    buildCostMultiplier:number
}