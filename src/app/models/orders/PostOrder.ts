import OrderRequest from "./OrderRequest";

export default interface PostOrder extends OrderRequest {
    providerId: number
}