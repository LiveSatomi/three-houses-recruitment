import OccurrenceData from "./OccurrenceData";
import { FacilityId } from "./schemas/facilitySchema";

export default class CookingData implements OccurrenceData {
    type: Readonly<FacilityId>;
    id: Readonly<string>;

    constructor() {
        this.type = "cooking-together";
        this.id = this.type;
    }
}
