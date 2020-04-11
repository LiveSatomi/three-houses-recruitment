import PouchDB from "pouchdb";
import characters from "data/characters";
import gifts from "data/gifts";
import { Character } from "data/types/schemas/characterSchema";
import { Gift } from "../data/types/schemas/giftSchema";

export default class Database {
    private characterDb: PouchDB.Database<Character>;
    private giftDb: PouchDB.Database<Gift>;

    constructor() {
        this.characterDb = new PouchDB("characters");
        this.giftDb = new PouchDB("gifts");
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

    private populateCharacters(): void {
        Promise.all(characters.map((char) => this.characterDb.put(char))).then(
            () => true
        );
    }

    private populateGifts(): void {
        Promise.all(gifts.map((gift) => this.giftDb.put(gift))).then(
            () => true
        );
    }
}
