import { RouteId } from "./schemas/monasterySchema";

let DELIMITER = ":";

export default class Time {
    route: Readonly<RouteId>;
    chapter: Readonly<number>;
    // Index of the event in the chapter among missions, free days, and instruction days
    event: Readonly<number>;

    constructor(route: RouteId, chapter: number, event: number) {
        this.route = route;
        this.chapter = chapter;
        this.event = event;
    }

    getTimeId() {
        return this.route + DELIMITER + this.chapter + DELIMITER + this.event;
    }

    getRoute(): RouteId {
        return this.route;
    }
    static cloneTime(time: Time): Time {
        return new Time(time.route, time.chapter, time.event);
    }
}
