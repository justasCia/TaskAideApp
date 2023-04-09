import User from "./User";
import Review from "./reviews/Review";

export default interface Provider extends User {
    description: string;
    reviews: Review[];
    rating?: number;
    reviewCount: number;
    reviewCommentsCount: number;
}