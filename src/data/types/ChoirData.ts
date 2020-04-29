import OccurrenceData from "./OccurrenceData";
import { FacilityId } from "./schemas/facilitySchema";

export default class ChoirData implements OccurrenceData {
    type: Readonly<FacilityId>;
    id: Readonly<string>;

    constructor() {
        this.type = "choir-practice";
        this.id = this.type;
    }
}
