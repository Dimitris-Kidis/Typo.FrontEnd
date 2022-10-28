export class CreateReviewCommand {
    reviewContent: string;
    userId: number;
    textId: number;

    constructor(reviewContent: string, userId: number, textId: number) {
        this.reviewContent = reviewContent;
        this.userId = userId;
        this.textId = textId;
    }
}