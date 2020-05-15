import OccurrenceScalar from "./OccurrenceScalar";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";
import ShareMealData from "data/types/ShareMealData";
import { Character, CharacterId } from "data/types/schemas/characterSchema";
import Database from "./Database";

export default class ShareMealScalar implements OccurrenceScalar {
    calculate(character: CharacterId, occurrences: Occurrence<OccurrenceData>[]): Promise<number> {
        return occurrences.reduce((sum: Promise<number>, occurrence) => {
            return sum.then((result) => {
                if (occurrence.data.type !== "share-a-meal" || !occurrence.characters.includes(character)) {
                    return result;
                }
                let base = 0;
                let castData = occurrence.data as ShareMealData;
                return Database.getSingleton().then((database) => {
                    let characterPromise = Promise.all([
                        database.fetchCharacter(occurrence.characters[0]),
                        database.fetchCharacter(occurrence.characters[1]),
                    ]);
                    return characterPromise.then((chars: Character[]) => {
                        if (chars[0].meals.liked.includes(castData.meal)) {
                            if (chars[1].meals.liked.includes(castData.meal)) {
                                base = 30;
                            } else if (chars[1].meals.disliked.includes(castData.meal)) {
                                base = 10;
                            } else {
                                base = 15;
                            }
                        } else if (chars[0].meals.disliked.includes(castData.meal)) {
                            if (chars[1].meals.liked.includes(castData.meal)) {
                                base = 10;
                            } else if (chars[1].meals.disliked.includes(castData.meal)) {
                                base = 0;
                            } else {
                                base = 0;
                            }
                        } else {
                            if (chars[1].meals.liked.includes(castData.meal)) {
                                base = 15;
                            } else if (chars[1].meals.disliked.includes(castData.meal)) {
                                base = 0;
                            } else {
                                base = 10;
                            }
                        }
                        return base;
                    });
                });
            });
        }, Promise.resolve(0));
    }
}
