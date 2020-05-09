import OccurrenceData from "./OccurrenceData";

export type InstructionEffectiveness = "Perfect" | "Great" | "Good" | "Bad + Bonus" | "Bad";

let DELIMITER: string = "+";

export default class InstructionData implements OccurrenceData {
    effectiveness: Readonly<InstructionEffectiveness>;
    count: Readonly<number>;
    type: Readonly<string>;
    id: Readonly<string>;

    constructor(effectiveness: InstructionEffectiveness, count: number) {
        this.effectiveness = effectiveness;
        this.count = count;
        this.type = "InstructionData";
        this.id = this.effectiveness + DELIMITER + count;
    }
}
