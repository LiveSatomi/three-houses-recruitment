import OccurrenceData from "./OccurrenceData";
import { GiftId } from "./schemas/giftSchema";

let DELIMITER: string = "+";

export default class QuestData implements OccurrenceData {
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
