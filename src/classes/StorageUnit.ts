import { ElementType } from "../enums/ElementType";
import { Unit } from "./Unit";

export class StorageUnit extends Unit {
    unitCpt:number
    unitCapacity:number
    element:ElementType
    stock:number
}