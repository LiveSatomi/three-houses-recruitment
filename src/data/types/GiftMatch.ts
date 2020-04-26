import GiftSource from "./GiftSource";
import { getId as sourceId, copy as copySource } from "./GiftSource";
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

export function copy(match: GiftMatch): GiftMatch {
    return new GiftMatch(copySource(match.giftSource), match.character);
}
