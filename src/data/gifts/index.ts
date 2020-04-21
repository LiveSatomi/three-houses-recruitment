import ancientCoin from "data/gifts/ancientCoin.json";
import arithmeticTextbook from "data/gifts/arithmeticTextbook.json";
import armoredBearStuffy from "data/gifts/armoredBearStuffy.json";
import blueCheese from "data/gifts/blueCheese.json";
import bookOfCrestDesigns from "data/gifts/bookOfCrestDesigns.json";
import ceremonialSword from "data/gifts/ceremonialSword.json";
import exoticSpices from "data/gifts/exoticSpices.json";
import huntingDagger from "data/gifts/huntingDagger.json";
import legendsOfChivalry from "data/gifts/legendsOfChivalry.json";
import lily from "data/gifts/lily.json";
import smokedMeat from "data/gifts/smokedMeat.json";
import tastyBakedTreat from "data/gifts/tastyBakedTreat.json";
import trainingWeight from "data/gifts/trainingWeight.json";
import violet from "data/gifts/violet.json";
import { Gift } from "../types/schemas/giftSchema";

let gifts: ReadonlyArray<Readonly<Gift>> = [
    ancientCoin as Gift,
    arithmeticTextbook as Gift,
    armoredBearStuffy as Gift,
    blueCheese as Gift,
    bookOfCrestDesigns as Gift,
    ceremonialSword as Gift,
    exoticSpices as Gift,
    huntingDagger as Gift,
    legendsOfChivalry as Gift,
    lily as Gift,
    smokedMeat as Gift,
    tastyBakedTreat as Gift,
    trainingWeight as Gift,
    violet as Gift,
];
export default gifts;
