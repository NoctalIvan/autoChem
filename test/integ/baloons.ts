import { Player } from './../../src/classes/Player'
import { unitModels } from './../../src/constants/unitModels'
import { Unit } from '../../src/classes/Unit';
import * as assert from 'assert'

describe('baloon integ test', () => {
    it('should resolve 2 simple ticks', () => {
        const player = new Player()
        player.units = unitModels
            .filter(a => ['e1', 'p1', 'p2', 's1'].includes(a.id))
            .map(a => new Unit(a))
        player.units[0].priority = 0.6
        player.units[1].priority = 0.5
        player.units[2].priority = 0.4
        player.units[3].priority = 0.3
        
        player.resolveTick()
        player.resolveTick()
        assert.deepEqual(player.lastEnergyBilan, {
            produce: 5, consume: 4
        })
        assert.deepEqual(player.resources, {
            H2O: { type: 'H2O', amount: 0 },
            O2: { type: 'O2', amount: 16 },
            H2: { type: 'H2', amount: 28 },
            '$': { type: '$', amount: 12 } 
        })
        assert.deepEqual(player.lastResourceProduction, {
            H2O: { type: 'H2O', amount: 0 },
            O2: { type: 'O2', amount: 8 },
            H2: { type: 'H2', amount: 14 },
            '$': { type: '$', amount: 6 } 
        })
    })
})