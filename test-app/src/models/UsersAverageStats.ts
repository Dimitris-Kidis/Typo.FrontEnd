export class UsersAverageStats {
    firstName: string;
    lastName: string;
    avgSymbolsPerMin: number;
    avgAccuracy: number;
    avgTime: string;

    constructor (firstName: string,
                 lastName: string,
                 avgSymbolsPerMin: number,
                 avgAccuracy: number,
                 avgTime: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.avgSymbolsPerMin = avgSymbolsPerMin;
        this.avgAccuracy = avgAccuracy;
        this.avgTime = avgTime;
    }
    
}