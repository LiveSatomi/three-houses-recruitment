import OccurrenceScalar from "./OccurrenceScalar";
import Occurrence from "../data/types/Occurrence";
import OccurrenceData from "../data/types/OccurrenceData";
import { CharacterId } from "../data/types/schemas/characterSchema";
import Database from "./Database";

export default class CookingScalar implements OccurrenceScalar {
    calculate(character: CharacterId, occurrences: Occurrence<OccurrenceData>[]): Promise<number> {
        return occurrences.reduce((sum: Promise<number>, occurrence) => {
            return sum.then((result) => {
                if (occurrence.data.type === "cooking-together" && occurrence.characters.includes(character)) {
                    return Database.getSingleton().then((database) => {
                        return database.fetchCharacter(occurrence.characters[0]).then((char) => {
                            if (char.cooking === "like") {
                                return 20;
                            } else if (char.cooking === "dislike") {
                                return 5;
                            } else {
                                return 10;
                            }
                        });
                    });
                } else {
                    return result;
                }
            });
        }, Promise.resolve(0));
    }
}
