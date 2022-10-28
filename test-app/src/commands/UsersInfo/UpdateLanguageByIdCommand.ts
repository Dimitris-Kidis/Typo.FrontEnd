export class UpdateLanguageByIdCommand {
    id: number;
    language: string;

    constructor(id: number, language: string) {
        this.id = id;
        this.language = language;
    }
}