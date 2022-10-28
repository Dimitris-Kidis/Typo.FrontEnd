export class Review {
    id: number;
    reviewContent: string;
    userId: number;
    textId: number;
    textContent: string;

    constructor(id: number, reviewContent: string, userId: number, textId: number, textContent: string) {
        this.id = id;
        this.reviewContent = reviewContent;
        this.userId = userId;
        this.textId = textId;
        this.textContent = textContent;
    }
}