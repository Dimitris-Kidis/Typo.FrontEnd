export class Review {
    id: number;
    reviewContent: string;
    userId: number;
    textId: number;

    constructor(id: number, reviewContent: string, userId: number, textId: number) {
        this.id = id;
        this.reviewContent = reviewContent;
        this.userId = userId;
        this.textId = textId;
    }
}