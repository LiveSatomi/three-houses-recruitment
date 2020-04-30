import OccurrenceData from "./OccurrenceData";
import { GiftId } from "./schemas/giftSchema";

export default interface GiftData extends OccurrenceData {
    gift: Readonly<GiftId>;
    type: Readonly<string>;
    id: Readonly<string>;
}
