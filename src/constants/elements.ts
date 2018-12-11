import { ElementType } from "../enums/ElementType";
import { IElement } from "../interfaces/IElement";

export const elements:{ [s: string]: IElement; } = {
    H: {
        element: ElementType.H,
    },
    He: {
        element: ElementType.He,
    }
}