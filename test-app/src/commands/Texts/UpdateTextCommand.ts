export class UpdateTextCommand {
    id: number;
    textContent: string;
    author: string;
    level: number;
    language: string;

    constructor(textContent: string, author: string, level: number, language: string, id: number) {
        this.textContent = textContent;
        this.author = author;
        this.language = language;
        this.level = level;
        this.id = id;
    }
}