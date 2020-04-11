import huntingDagger from "data/gifts/huntingDagger.json";
import tastyBakedTreat from "data/gifts/tastyBakedTreat.json";
import { Gift } from "../types/schemas/giftSchema";

let gifts: Gift[] = [huntingDagger as Gift, tastyBakedTreat as Gift];
export default gifts;
