export class CreateStatisticLineCommand {
    userId: number;
    textId: number;
    symbolsPerMinute: number;
    accuracy: number;
    time: string;
    numberOfMistakes: number;
    sharedVia?: string | null;

    constructor(
        symbolsPerMinute: number,
        time: string,
        accuracy: number,
        numberOfMistakes: number,
        userId: number,
        textId: number,
        sharedVia: string | null
    ) {
        this.symbolsPerMinute = symbolsPerMinute;
        this.time = time;
        this.accuracy = accuracy;
        this.numberOfMistakes = numberOfMistakes;
        this.userId = userId;
        this.sharedVia = sharedVia;
        this.textId = textId;
    }
}