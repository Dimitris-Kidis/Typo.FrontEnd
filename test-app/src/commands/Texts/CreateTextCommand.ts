export class CreateTextCommand {
    textContent: string;
    author: string;
    level: number;
    language: string;

    constructor(textContent: string, author: string, level: number, language: string) {
        this.textContent = textContent;
        this.author = author;
        this.language = language;
        this.level = level;
    }
}