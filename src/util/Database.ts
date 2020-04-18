import PouchDB from "pouchdb";
import characters from "data/characters";
import gifts from "data/gifts";
import monastery from "data/monastery/monastery.json";
import { Character } from "data/types/schemas/characterSchema";
import { Gift } from "../data/types/schemas/giftSchema";
import { Monastery } from "../data/types/schemas/monasterySchema";

export default class Database {
    private characterDb: PouchDB.Database<Character>;
    private monasteryDb: PouchDB.Database<Monastery>;
    private giftDb: PouchDB.Database<Gift>;

    constructor() {
        this.characterDb = new PouchDB("characters");
        this.giftDb = new PouchDB("gifts");
        this.monasteryDb = new PouchDB("monastery");
    }

    initialize() {
        return this.characterDb
            .allDocs()
            .then((all: PouchDB.Core.AllDocsResponse<Character>):
                | Promise<true>
                | boolean => {
                if (all.total_rows === 0) {
                    return Promise.all([
                        this.populateCharacters(),
                        this.populateGifts(),
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

    fetchMonastery(): Promise<PouchDB.Core.AllDocsResponse<Monastery>> {
        return this.monasteryDb.allDocs({
            include_docs: true,
        });
    }

    private populateCharacters(): Promise<boolean> {
        return Promise.all(
            characters.map((char) => this.characterDb.put(char))
        ).then(() => true);
    }

    private populateGifts(): Promise<boolean> {
        return Promise.all(gifts.map((gift) => this.giftDb.put(gift))).then(
            () => true
        );
    }

    private populateMonastery(): Promise<boolean> {
        return this.monasteryDb.put(monastery as Monastery).then(() => true);
    }
}
