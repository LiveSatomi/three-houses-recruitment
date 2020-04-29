import { MerchantId } from "./schemas/merchantSchema";
import OccurrenceData from "./OccurrenceData";
import { GiftId } from "./schemas/giftSchema";

let DELIMITER: string = "+";

export default class MerchantData implements OccurrenceData {
    merchant: Readonly<MerchantId>;
    gift: Readonly<GiftId>;
    type: Readonly<string>;
    id: Readonly<string>;

    constructor(merchant: MerchantId, gift: GiftId) {
        this.merchant = merchant;
        this.gift = gift;
        this.type = "MerchantData";
        this.id = this.merchant + DELIMITER + this.gift;
    }
}
