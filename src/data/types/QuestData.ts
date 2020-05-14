import { GiftId } from "./schemas/giftSchema";
import GiftData from "./GiftData";
import { QuestId } from "./schemas/monasterySchema";

let DELIMITER: string = "+";

export default class QuestData implements GiftData {
    quest: Readonly<QuestId>;
    gift: Readonly<GiftId>;
    type: Readonly<string>;
    id: Readonly<string>;

    constructor(quest: QuestId, gift: GiftId) {
        this.quest = quest;
        this.gift = gift;
        this.type = "QuestData";
        this.id = this.quest + DELIMITER + this.gift;
    }
}
