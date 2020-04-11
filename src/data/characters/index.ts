import ashe from "data/characters/ashe.json";
import felix from "data/characters/felix.json";
import raphael from "data/characters/raphael.json";
import lysithea from "data/characters/lysithea.json";
import { Character } from "../types/schemas/characterSchema";

let characters: Character[] = [
    ashe as Character,
    felix as Character,
    lysithea as Character,
    raphael as Character,
];
export default characters;
