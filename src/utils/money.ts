export class Money {
  static readonly multiplier = 10000

  static toMagnified(amount: number): number {
    return Math.round(amount * Money.multiplier)
  }

  static fromMagnified(magnifiedAmount: number): number {
    return magnifiedAmount / Money.multiplier
  }
}
