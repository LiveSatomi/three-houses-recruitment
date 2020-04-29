import OccurrenceData from "data/types/OccurrenceData";
import MerchantData from "data/types/MerchantData";
import QuestData from "data/types/QuestData";

export default class OccurrenceFactory {
    static cloneOccurrenceData(data: OccurrenceData) {
        let castData;
        switch (data.type) {
            case "MerchantData":
                castData = data as MerchantData;
                return new MerchantData(castData.merchant, castData.gift);
            case "QuestData":
                castData = data as QuestData;
                return new QuestData(castData.quest, castData.gift);
            default:
                throw new Error(data.type + " does not have an OccurrenceFactory");
        }
    }
}
