export class TextViewModel {
    id: number;
    textContent: string;
    language: string;
    author: string;

    constructor (id: number, content: string, language: string, author: string) {
        this.id = id;
        this.textContent = content;
        this.language = language;
        this.author = author;
    }
}