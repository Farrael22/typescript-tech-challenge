import { Money } from './money'

describe('Money', () => {
  describe('#toMagnified', () => {
    it('returns magnified amount', () => {
      expect(Money.toMagnified(12.1234)).toBe(121234)
    })
  })

  describe('#fromMagnified', () => {
    it('returns unmagnified amount', () => {
      expect(Money.fromMagnified(121234)).toBe(12.1234)
    })
  })
})
