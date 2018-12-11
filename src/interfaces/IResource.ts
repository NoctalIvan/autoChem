import { ElementType } from "../enums/ElementType";

export interface IResource {
    type:ElementType|'$',
    amount:number
}

const a:IResource = {type: ElementType.H, amount: 2}
const b:IResource = {type: '$', amount: 4}

console.log(a,b)