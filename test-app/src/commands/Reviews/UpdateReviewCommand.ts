export class UpdateReviewCommand {
    id: number;
    reviewContent: string;
    userId: number;
    textId: number;

    constructor(id: number, reviewContent: string, userId: number, textId: number) {
        this.reviewContent = reviewContent;
        this.userId = userId;
        this.textId = textId;
        this.id = id;
    }
}