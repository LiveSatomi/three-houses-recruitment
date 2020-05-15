import Occurrence from "../data/types/Occurrence";
import OccurrenceData from "../data/types/OccurrenceData";
import OccurrenceScaleUtil from "./OccurrenceScaleUtil";
import OccurrenceScalar from "./OccurrenceScalar";
import { CharacterId } from "../data/types/schemas/characterSchema";
import ChoirPracticeScalar from "./ChoirPracticeScalar";
import GiftScalar from "./GiftScalar";
import CookingScalar from "./CookingScalar";
import InstructionScalar from "./InstructionScalar";
import ShareMealScalar from "./ShareMealScalar";

export default class DefaultOccurrenceScaleUtil implements OccurrenceScaleUtil {
    scalars: OccurrenceScalar[];

    constructor(scalars: OccurrenceScalar[]) {
        // TODO inject scalars when bug ix fixed https://github.com/inversify/InversifyJS/issues/1004#issuecomment-598776777
        this.scalars = [
            new ChoirPracticeScalar(),
            new GiftScalar(),
            new CookingScalar(),
            new InstructionScalar(),
            new ShareMealScalar(),
        ];
    }

    calculate(character: CharacterId, occurrences: Occurrence<OccurrenceData>[]): Promise<number> {
        return this.scalars.reduce((characterSum: Promise<number>, scalar) => {
            return characterSum.then((scalarSum) => {
                return scalar.calculate(character, occurrences).then((n) => n + scalarSum);
            });
        }, Promise.resolve(0));
    }
}
