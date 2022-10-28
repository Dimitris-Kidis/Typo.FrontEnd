export class ChartData {
    symbolsPerMinute: number[];
    date: string[];

    constructor(symbolsPerMinute: number[], date: string[]) {
        this.symbolsPerMinute = symbolsPerMinute;
        this.date = date;
    }
}