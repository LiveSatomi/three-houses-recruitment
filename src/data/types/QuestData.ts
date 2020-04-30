import { GiftId } from "./schemas/giftSchema";
import GiftData from "./GiftData";

let DELIMITER: string = "+";

export default class QuestData implements GiftData {
    quest: Readonly<string>;
    gift: Readonly<GiftId>;
    type: Readonly<string>;
    id: Readonly<string>;

    constructor(quest: string, gift: GiftId) {
        this.quest = quest;
        this.gift = gift;
        this.type = "QuestData";
        this.id = this.quest + DELIMITER + this.gift;
    }
}
