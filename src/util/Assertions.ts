import { AssertionError } from "assert";

export default class Assertions {
    static isDefined(condition: any, msg: string): asserts condition {
        if (!condition) {
            throw new AssertionError({ message: msg });
        }
    }
}
