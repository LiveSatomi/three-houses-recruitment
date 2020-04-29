/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type RouteId = "white-clouds" | "silver-snow" | "crimson-flower" | "azure-moon" | "verdant-wind";
/**
 * Name of facility
 */
export type FacilityId = "choir-practice" | "cooking-together" | "share-a-meal" | "sauna" | "advice-box";
/**
 * Type of merchant
 */
export type MerchantId = "eastern" | "southern" | "dark";

/**
 * Defines what opportunities are available at the monastery.
 */
export interface Monastery {
    /**
     * PouchDB required ID
     */
    _id: string;
    /**
     * Route specific information for the monastery
     */
    routes: Route[];
}
/**
 * A route in the game
 */
export interface Route {
    id: RouteId;
    routeName: string;
    chapters: Chapter[];
}
export interface Chapter {
    facilities: {
        id: FacilityId;
        available: boolean;
    }[];
    lostItem: {
        id: string;
        name: string;
        recipient: string;
        location: string;
    }[];
    dialog: {
        id: string;
        recipient: string;
        conversation: string;
        answer: string;
    }[];
    merchants: {
        id: MerchantId;
        available: boolean;
    }[];
}
