import OccurrenceScalar from "./OccurrenceScalar";
import { CharacterId } from "../data/types/schemas/characterSchema";
import Occurrence from "../data/types/Occurrence";
import Database from "./Database";
import MerchantData from "../data/types/MerchantData";
import QuestData from "../data/types/QuestData";

export default class GiftScalar implements OccurrenceScalar {
    calculate(character: CharacterId, occurrences: Occurrence<MerchantData | QuestData>[]): Promise<number> {
        return Database.getSingleton()
            .then((database) => {
                return database.fetchCharacter(character);
            })
            .then((character) => {
                return occurrences.reduce((sum, occurrence) => {
                    if (occurrence.data.type !== "MerchantData" && occurrence.data.type !== "QuestData") {
                        return sum;
                    } else {
                        if (character.gifts.includes(occurrence.data.gift)) {
                            return sum + 20;
                        } else {
                            return sum + 10;
                        }
                    }
                }, 0);
            });
    }
}
