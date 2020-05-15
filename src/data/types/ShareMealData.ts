import OccurrenceData from "./OccurrenceData";
import { FacilityId } from "./schemas/facilitySchema";
import { MealId } from "./schemas/mealSchema";

export default class ShareMealData implements OccurrenceData {
    meal: Readonly<MealId>;
    type: Readonly<FacilityId>;
    id: Readonly<string>;

    constructor(meal: MealId) {
        this.meal = meal;
        this.type = "share-a-meal";
        this.id = this.meal;
    }
}
