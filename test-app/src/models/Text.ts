export class Text {
    id: number;
    textContent: string;
    language: string;
    author: string;
    level: number;

    constructor (id: number, content: string, language: string, author: string, level: number) {
        this.id = id;
        this.textContent = content;
        this.language = language;
        this.author = author;
        this.level = level;
    }
}