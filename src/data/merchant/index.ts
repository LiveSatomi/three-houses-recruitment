import eastern from "data/merchant/eastern.json";
import southern from "data/merchant/southern.json";
import dark from "data/merchant/dark.json";
import { Merchant } from "../types/schemas/merchantSchema";

let merchants: Merchant[] = [eastern as Merchant, southern as Merchant, dark as Merchant];
export default merchants;
