import choir from "data/facility/choir.json";
import sauna from "data/facility/sauna.json";
import cooking from "data/facility/cooking.json";
import shareMeal from "data/facility/shareMeal.json";
import { Facility } from "../types/schemas/facilitySchema";

let facilities: Facility[] = [choir as Facility, sauna as Facility, cooking as Facility, shareMeal as Facility];
export default facilities;
