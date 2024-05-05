class GameStats {
    constructor(bet, currentOdds, expectedValue, game, market, sharpOdds, winProbability, type) {
        (this.bet = bet),
        (this.currentOdds = currentOdds),
        (this.expectedValue = expectedValue),
        (this.game = game),
        (this.market = market),
        (this.sharpOdds = sharpOdds),
        (this.winProbability = winProbability);
        (this.type = type);
    }
}

export default GameStats