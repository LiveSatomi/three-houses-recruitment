import GiftSource from "./GiftSource";
import { getId as sourceId } from "./GiftSource";
import { CharacterId } from "./schemas/characterSchema";

let DELIMITER: string = "|";

export default class GiftMatch {
    giftSource: GiftSource;
    character: CharacterId;

    constructor(giftSource: GiftSource, character: CharacterId) {
        this.character = character;
        this.giftSource = giftSource;
    }
}

export function getId(match: GiftMatch): string {
    return sourceId(match.giftSource) + DELIMITER + match.character;
}
