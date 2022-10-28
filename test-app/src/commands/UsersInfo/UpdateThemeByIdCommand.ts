export class UpdateThemeByIdCommand {
    id: number;
    themeColors: string;

    constructor(id: number, themeColors: string) {
        this.id = id;
        this.themeColors = themeColors;
    }
}