import peachSorbet from "data/meal/peachSorbet.json";
import friedCrayfish from "data/meal/friedCrayfish.json";

import { Meal } from "data/types/schemas/mealSchema";

let meals: ReadonlyArray<Readonly<Meal>> = [peachSorbet as Meal, friedCrayfish as Meal];
export default meals;
