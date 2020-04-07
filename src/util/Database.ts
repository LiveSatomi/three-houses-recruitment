import PouchDB from "pouchdb";
import characters from "data/characters";
import { Character } from "data/types/schemas/characterSchema";

export default class Database {
    private characterDb: PouchDB.Database<Character>;

    constructor() {
        this.characterDb = new PouchDB("characters");
    }

    initialize() {
        return this.characterDb
            .allDocs()
            .then((all: PouchDB.Core.AllDocsResponse<Character>) => {
                if (all.total_rows === 0) {
                    return this.populateCharacters();
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

    private populateCharacters() {
        Promise.all(characters.map((char) => this.characterDb.put(char))).then(
            () => true
        );
    }
}
