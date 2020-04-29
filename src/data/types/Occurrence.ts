import { CharacterId } from "./schemas/characterSchema";
import Time from "./Time";
import OccurrenceData from "./OccurrenceData";
import OccurrenceFactory from "util/OccurrenceFactory";

let DELIMITER: string = "|";

export default class Occurrence<D extends OccurrenceData> {
    time: Readonly<Time>;
    data: Readonly<D>;
    characters: CharacterId[];
    _id: Readonly<string>;

    constructor(time: Time, data: D, characters: CharacterId[]) {
        this.time = time;
        this.data = data;
        this.characters = characters;
        this._id = time.getTimeId() + DELIMITER + data.id + DELIMITER + characters.join(DELIMITER);
    }

    static cloneOccurrence(occurrence: Occurrence<OccurrenceData>): Occurrence<OccurrenceData> {
        return new Occurrence(
            Time.cloneTime(occurrence.time),
            OccurrenceFactory.cloneOccurrenceData(occurrence.data),
            occurrence.characters
        );
    }
}
