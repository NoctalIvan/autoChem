import { IUnitModel } from "../interfaces/IUnitModel";
import { UnitType } from "../enums/UnitType";
import { ElementType } from "../enums/ElementType";

export const unitModels:IUnitModel[] = [
    {
        id: 'e1',
        name: 'Solar panel',
        type: UnitType.ENERGY,
        resourceBilan: [],
        energyBilan: 4,
        resourceStorage: [],
        baseBuildCost: 100,
        buildCostMultiplier: 1.1
    },
    {
        id: 'e2',
        name: 'Hydrogen reactor',
        type: UnitType.ENERGY,
        resourceBilan: [
            {type: ElementType.H2O, amount: 20},
            {type: ElementType.O2, amount: -20},
            {type: ElementType.H2, amount: -40},
        ],
        energyBilan: 6,
        resourceStorage: [
            {type: ElementType.H2O, amount: 12},
        ],
        baseBuildCost: 350,
        buildCostMultiplier: 1.1
    },
    {
        id: 'p1',
        name: 'Water pump',
        type: UnitType.PRODUCTION,
        resourceBilan: [
            {type: ElementType.H2O, amount: 8},
        ],
        energyBilan: -1,
        resourceStorage: [
            {type: ElementType.H2O, amount: 25},
        ],
        baseBuildCost: 15,
        buildCostMultiplier: 1.1
    },
    {
        id: 'p2',
        name: 'Oxygen extractor',
        type: UnitType.PRODUCTION,
        resourceBilan: [
            {type: ElementType.H2O, amount: -20},
            {type: ElementType.O2, amount: 20},
            {type: ElementType.H2, amount: 40},
        ],
        energyBilan: -6,
        resourceStorage: [
            {type: ElementType.O2, amount: 4},
            {type: ElementType.H2, amount: 8},
        ],
        baseBuildCost: 45,
        buildCostMultiplier: 1.1
    },
    {
        id: 's1',
        name: 'Baloons',
        type: UnitType.SELL,
        resourceBilan: [
            {type: ElementType.H2, amount: -2},
            {type: ElementType.$, amount: 6},
        ],
        energyBilan: 0,
        resourceStorage: [],

        baseBuildCost: 0,
        buildCostMultiplier: 0
    }
]