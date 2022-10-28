export class Statistic {
    symbolsPerMinute: number;
    time: string;
    accuracy: number;
    numberOfMistakes: number;
    sharedVia?: string | null;
    userId: number;

    constructor(
        symbolsPerMinute: number,
        time: string,
        accuracy: number,
        numberOfMistakes: number,
        userId: number,
        sharedVia: string | null
    ) {
        this.symbolsPerMinute = symbolsPerMinute;
        this.time = time;
        this.accuracy = accuracy;
        this.numberOfMistakes = numberOfMistakes;
        this.userId = userId;
        this.sharedVia = sharedVia;
    }
}