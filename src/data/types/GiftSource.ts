import { MerchantId } from "./schemas/merchantSchema";
import { RouteId } from "./schemas/monasterySchema";
import { GiftId } from "./schemas/giftSchema";

let DELIMITER: string = "|";

export default class GiftSource {
    gift: GiftId;
    merchant?: MerchantId;
    route: RouteId;
    chapter: number;

    constructor(gift: GiftId, merchant: MerchantId, route: RouteId, chapter: number) {
        this.gift = gift;
        this.merchant = merchant;
        this.route = route;
        this.chapter = chapter;
    }
}

export function getId(source: GiftSource): string {
    return source.gift + DELIMITER + source.merchant + DELIMITER + source.route + source.chapter;
}
