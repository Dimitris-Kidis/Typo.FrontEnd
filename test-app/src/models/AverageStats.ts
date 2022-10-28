export class AverageStats {
    avgSymbolsPerMin: number;
    avgAccuracy: number;
    avgTime: string;
    textsCount: number;

    constructor(avgSymbolsPerMin: number, avgAccuracy: number, avgTime: string, textsCount: number) {
        this.avgSymbolsPerMin = avgSymbolsPerMin;
        this.avgAccuracy = avgAccuracy;
        this.avgTime = avgTime;
        this.textsCount = textsCount;
    }
}