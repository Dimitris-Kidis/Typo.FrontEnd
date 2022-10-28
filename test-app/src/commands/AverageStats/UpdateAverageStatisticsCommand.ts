export class UpdateAverageStatsCommand {
    id: number;
    avgSymbolsPerMin: number;
    avgAccuracy: number;
    avgTime: string;
    textsCount: number;

    constructor(id: number, avgSymbolsPerMin: number, avgAccuracy: number, avgTime: string, textsCount: number) {
        this.id = id;
        this.avgSymbolsPerMin = avgSymbolsPerMin;
        this.avgAccuracy = avgAccuracy;
        this.avgTime = avgTime;
        this.textsCount = textsCount;
    }
}