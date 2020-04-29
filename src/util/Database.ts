import PouchDB from "pouchdb";
import characters from "data/characters";
import gifts from "data/gifts";
import merchants from "data/merchant";
import monastery from "data/monastery/monastery.json";
import { Character } from "data/types/schemas/characterSchema";
import { Gift, GiftId } from "../data/types/schemas/giftSchema";
import { Monastery } from "data/types/schemas/monasterySchema";
import { Merchant, MerchantId } from "data/types/schemas/merchantSchema";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";

export default class Database {
    private characterDb: PouchDB.Database<Character>;
    private giftDb: PouchDB.Database<Gift>;
    private merchantDb: PouchDB.Database<Merchant>;
    private monasteryDb: PouchDB.Database<Monastery>;
    private occurrenceDb: PouchDB.Database<Occurrence<OccurrenceData>>;

    constructor() {
        this.characterDb = new PouchDB("characters");
        this.giftDb = new PouchDB("gifts");
        this.merchantDb = new PouchDB("merchant");
        this.monasteryDb = new PouchDB("monastery");
        this.occurrenceDb = new PouchDB("occurrence");
    }

    initialize() {
        return this.characterDb
            .allDocs()
            .then((all: PouchDB.Core.AllDocsResponse<Character>): Promise<true> | boolean => {
                if (all.total_rows === 0) {
                    return Promise.all([
                        this.populateCharacters(),
                        this.populateGifts(),
                        this.populateMerchants(),
                        this.populateMonastery(),
                    ]).then(() => {
                        return true;
                    });
                } else {
                    return true;
                }
            })
            .catch((err: any) => {
                console.log(err);
                return false;
            });
    }

    fetchCharacters(): Promise<PouchDB.Core.AllDocsResponse<Character>> {
        return this.characterDb.allDocs({
            include_docs: true,
        });
    }

    fetchGifts(): Promise<PouchDB.Core.AllDocsResponse<Gift>> {
        return this.giftDb.allDocs({
            include_docs: true,
        });
    }

    fetchGift(id: GiftId): Promise<PouchDB.Core.Document<Gift>> {
        return this.giftDb.get(id);
    }

    fetchMonastery(): Promise<PouchDB.Core.AllDocsResponse<Monastery>> {
        return this.monasteryDb.allDocs({
            include_docs: true,
        });
    }

    fetchMerchant(id: MerchantId): Promise<PouchDB.Core.Document<Merchant>> {
        return this.merchantDb.get(id);
    }

    private populateCharacters(): Promise<boolean> {
        return Promise.all(characters.map((char) => this.characterDb.put(char))).then(() => true);
    }

    private populateGifts(): Promise<boolean> {
        return Promise.all(gifts.map((gift) => this.giftDb.put(gift))).then(() => true);
    }

    private populateMerchants(): Promise<boolean> {
        return Promise.all(merchants.map((merchant) => this.merchantDb.put(merchant))).then(() => true);
    }

    private populateMonastery(): Promise<boolean> {
        return this.monasteryDb.put(monastery as Monastery).then(() => true);
    }

    addOccurrence(occurrence: Occurrence<OccurrenceData>) {
        return this.occurrenceDb.put({ ...JSON.parse(JSON.stringify(occurrence)) });
    }

    fetchOccurrences(): Promise<Occurrence<OccurrenceData>[]> {
        return this.occurrenceDb.allDocs({ include_docs: true }).then((docs) => {
            return docs.rows.map((row) => {
                return Occurrence.cloneOccurrence(row.doc!);
            });
        });
    }
}
