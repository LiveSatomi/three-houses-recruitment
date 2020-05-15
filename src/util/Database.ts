import PouchDB from "pouchdb";
import characters from "data/characters";
import gifts from "data/gifts";
import merchants from "data/merchant";
import facilities from "data/facility";
import meals from "data/meal";
import monastery from "data/monastery/monastery.json";
import { Character, CharacterId } from "data/types/schemas/characterSchema";
import { Gift, GiftId } from "data/types/schemas/giftSchema";
import { Monastery } from "data/types/schemas/monasterySchema";
import { Merchant, MerchantId } from "data/types/schemas/merchantSchema";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";
import { Facility, FacilityId } from "data/types/schemas/facilitySchema";
import { Meal } from "data/types/schemas/mealSchema";

export default class Database {
    static instance?: Database = undefined;

    static getSingleton(): Promise<Database> {
        if (Database.instance === undefined) {
            let database: Database = new Database();
            Database.instance = database;
            return database.initialize().then(() => Promise.resolve(database));
        } else {
            return Promise.resolve(Database.instance);
        }
    }

    private characterDb: PouchDB.Database<Character>;
    private giftDb: PouchDB.Database<Gift>;
    private merchantDb: PouchDB.Database<Merchant>;
    private facilityDb: PouchDB.Database<Facility>;
    private mealsDb: PouchDB.Database<Meal>;
    private monasteryDb: PouchDB.Database<Monastery>;
    private occurrenceDb: PouchDB.Database<Occurrence<OccurrenceData>>;

    private constructor() {
        this.characterDb = new PouchDB("characters");
        this.giftDb = new PouchDB("gifts");
        this.merchantDb = new PouchDB("merchant");
        this.facilityDb = new PouchDB("facility");
        this.mealsDb = new PouchDB("meal");
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
                        this.populateFacilities(),
                        this.populateMeals(),
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

    fetchCharacters(): Promise<Character[]> {
        return this.characterDb.allDocs({ include_docs: true }).then((docs) => {
            return docs.rows.map((row) => {
                return row.doc!;
            });
        });
    }

    fetchCharacter(character: CharacterId): Promise<Character> {
        return this.characterDb.get(character);
    }

    fetchGift(id: GiftId): Promise<PouchDB.Core.Document<Gift>> {
        return this.giftDb.get(id);
    }

    fetchMonastery(monastery: string): Promise<Monastery> {
        return this.monasteryDb.get(monastery).then((doc) => {
            return doc;
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

    fetchFacility(facility: FacilityId): Promise<Facility> {
        return this.facilityDb.get(facility);
    }

    fetchMeals(): Promise<Meal[]> {
        return this.mealsDb.allDocs({ include_docs: true }).then((docs) => {
            return docs.rows.map((row) => {
                return row.doc!;
            });
        });
    }

    private populateMerchants(): Promise<boolean> {
        return Promise.all(merchants.map((merchant) => this.merchantDb.put(merchant))).then(() => true);
    }

    private populateFacilities(): Promise<boolean> {
        return Promise.all(facilities.map((facility) => this.facilityDb.put(facility))).then(() => true);
    }

    private populateMeals(): Promise<boolean> {
        return Promise.all(meals.map((meal) => this.mealsDb.put(meal))).then(() => true);
    }

    private populateMonastery(): Promise<boolean> {
        return this.monasteryDb.put(monastery as Monastery).then(() => true);
    }

    addOccurrence(occurrence: Occurrence<OccurrenceData>) {
        return this.occurrenceDb.put({ ...JSON.parse(JSON.stringify(occurrence)) });
    }

    removeOccurrence(occurrence: Occurrence<OccurrenceData>): Promise<boolean> {
        return this.occurrenceDb
            .get(occurrence._id)
            .then((doc) => {
                return this.occurrenceDb.remove(doc);
            })
            .then((response) => {
                return response.ok;
            });
    }

    fetchOccurrences(): Promise<Occurrence<OccurrenceData>[]> {
        return this.occurrenceDb.allDocs({ include_docs: true }).then((docs) => {
            return docs.rows.map((row) => {
                return Occurrence.cloneOccurrence(row.doc!);
            });
        });
    }
}
