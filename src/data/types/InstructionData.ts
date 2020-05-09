import OccurrenceData from "./OccurrenceData";

export type InstructionEffectiveness = "Perfect" | "Great" | "Good" | "Bad + Bonus" | "Bad";

export default class InstructionData implements OccurrenceData {
    effectiveness: Readonly<InstructionEffectiveness>;
    type: Readonly<string>;
    id: Readonly<string>;

    constructor(effectiveness: InstructionEffectiveness) {
        this.effectiveness = effectiveness;
        this.type = "InstructionData";
        this.id = this.effectiveness;
    }
}
