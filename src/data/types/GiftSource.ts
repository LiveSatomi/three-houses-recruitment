import { MerchantId } from "./schemas/merchantSchema";
import { RouteId } from "./schemas/monasterySchema";
import { GiftId } from "./schemas/giftSchema";

let DELIMITER: string = "|";

export default class GiftSource {
    gift: GiftId;
    merchant?: MerchantId;
    route: RouteId;
    chapter: number;

    constructor(gift: GiftId, route: RouteId, chapter: number, merchant?: MerchantId) {
        this.gift = gift;
        this.merchant = merchant;
        this.route = route;
        this.chapter = chapter;
    }
}

export function getId(source: GiftSource): string {
    return source.gift + DELIMITER + source.merchant + DELIMITER + source.route + source.chapter;
}

export function copy(source: GiftSource): GiftSource {
    return new GiftSource(source.gift, source.route, source.chapter, source.merchant);
}
