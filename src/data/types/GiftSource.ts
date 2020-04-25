import { MerchantId } from "./schemas/merchantSchema";
import { RouteId } from "./schemas/monasterySchema";
import { GiftId } from "./schemas/giftSchema";

export default class GiftSource {
    gift: GiftId;
    merchant?: MerchantId;
    route: RouteId;
    chapter: number;

    private DELIMITER: string = "|";

    constructor(
        gift: GiftId,
        merchant: MerchantId,
        route: RouteId,
        chapter: number
    ) {
        this.gift = gift;
        this.merchant = merchant;
        this.route = route;
        this.chapter = chapter;
    }

    getId(): string {
        return (
            this.gift +
            this.DELIMITER +
            this.merchant +
            this.DELIMITER +
            this.route +
            this.chapter +
            this.DELIMITER
        );
    }
}
