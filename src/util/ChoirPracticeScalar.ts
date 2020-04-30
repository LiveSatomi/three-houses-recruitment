import OccurrenceScalar from "./OccurrenceScalar";
import Occurrence from "../data/types/Occurrence";
import OccurrenceData from "../data/types/OccurrenceData";
import { CharacterId } from "../data/types/schemas/characterSchema";

export default class ChoirPracticeScalar implements OccurrenceScalar {
    calculate(character: CharacterId, occurrences: Occurrence<OccurrenceData>[]): Promise<number> {
        return occurrences.reduce((sum: Promise<number>, occurrence) => {
            return sum.then((result) => {
                if (occurrence.data.type === "choir-practice" && occurrence.characters.includes(character)) {
                    return result + 30;
                } else {
                    return result;
                }
            });
        }, Promise.resolve(0));
    }
}
