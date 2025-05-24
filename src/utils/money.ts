export class Money {
  static readonly multiplier = 1000

  static toMagnified(amount: number): number {
    return Math.round(amount * Money.multiplier)
  }

  static fromMagnified(magnifiedAmount: number): number {
    return magnifiedAmount / Money.multiplier
  }

  static add(amount1: number, amount2: number): number {
    const magnified1 = Money.toMagnified(amount1)
    const magnified2 = Money.toMagnified(amount2)
    return Money.fromMagnified(magnified1 + magnified2)
  }

  static subtract(amount1: number, amount2: number): number {
    const magnified1 = Money.toMagnified(amount1)
    const magnified2 = Money.toMagnified(amount2)
    return Money.fromMagnified(magnified1 - magnified2)
  }
}
