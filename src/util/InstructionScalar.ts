import OccurrenceScalar from "./OccurrenceScalar";
import Occurrence from "../data/types/Occurrence";
import { CharacterId } from "../data/types/schemas/characterSchema";
import InstructionData from "../data/types/InstructionData";

export default class ChoirPracticeScalar implements OccurrenceScalar {
    calculate(character: CharacterId, occurrences: Occurrence<InstructionData>[]): Promise<number> {
        return occurrences.reduce((sum: Promise<number>, occurrence) => {
            return sum.then((result) => {
                if (occurrence.data.type === "InstructionData" && occurrence.characters.includes(character)) {
                    switch (occurrence.data.effectiveness) {
                        case "Perfect":
                            return result + 15;
                        case "Great":
                            return result + 5;
                        case "Good":
                            return result;
                        case "Bad + Bonus":
                            return result + 15;
                        case "Bad":
                            return result + 5;
                    }
                } else {
                    return result;
                }
            });
        }, Promise.resolve(0));
    }
}
