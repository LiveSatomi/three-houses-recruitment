import * as React from "react";
import "./AdditionalOpportunity.scss";
import { Character } from "data/types/schemas/characterSchema";
import Opportunity from "../Opportunity";
import { Monastery, RouteId } from "data/types/schemas/monasterySchema";
import { Item, Menu, MenuProvider, Submenu } from "react-contexify";
import MerchantMenu from "components/MerchantMenu/MerchantMenu";
import CookingMenu from "components/CookingMenu/CookingMenu";
import ChoirMenu from "components/ChoirMenu/ChoirMenu";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";
import MerchantData from "data/types/MerchantData";
import ChoirData from "data/types/ChoirData";
import CookingData from "data/types/CookingData";
import InstructionMenu from "../../InstructionMenu/InstructionMenu";
import InstructionData from "../../../data/types/InstructionData";

type AdditionalOpportunityProps = {
    character: Character;
    route: RouteId;
    chapter: number;
    event: number;
    monastery: Monastery;
    onAddOccurrence: (occurrence: Occurrence<OccurrenceData>) => void;
    selectedGifts: Occurrence<OccurrenceData>[];
};

type AdditionalOpportunityState = {};

export default class AdditionalOpportunity extends React.Component<
    AdditionalOpportunityProps,
    AdditionalOpportunityState
> {
    constructor(props: AdditionalOpportunityProps) {
        super(props);

        this.addOccurrence = this.addOccurrence.bind(this);
    }

    render() {
        return (
            <>
                {this.getMenu(this.props.event)}
                <MenuProvider event={"onClick"} id={this.getMenuId()}>
                    <Opportunity onSelect={() => {}} imageUrl={"misc/additional.png"} imageTitle={"Add Support"} />
                </MenuProvider>
            </>
        );
    }

    getMenuId(): string {
        return this.props.character._id + " " + this.props.chapter + " " + this.props.event;
    }

    private getMenu(eventIndex: number) {
        let eventId = this.props.monastery.routes.find((route) => route.id === "white-clouds")!.chapters[
            this.props.chapter
        ].events[eventIndex];
        if (eventId === "free") {
            return this.getExplorationMenu();
        } else if (eventId === "instruction") {
            return this.getInstructionMenu();
        }
    }

    private getInstructionMenu() {
        return (
            <Menu style={{ zIndex: 2 }} id={this.getMenuId()}>
                <InstructionMenu
                    character={this.props.character}
                    chapter={this.props.chapter}
                    event={this.props.event}
                    route={this.props.route}
                    onAddOccurrence={this.props.onAddOccurrence}
                    selected={this.filterOccurrence(this.props.selectedGifts, InstructionData)}
                />
            </Menu>
        );
    }

    private getExplorationMenu() {
        return (
            <Menu style={{ zIndex: 2 }} id={this.getMenuId()}>
                <MerchantMenu
                    character={this.props.character}
                    chapterIndex={this.props.chapter}
                    route={this.props.route}
                    merchants={this.props.monastery.routes
                        .find((route) => route.id === "white-clouds")!
                        .chapters[this.props.chapter].merchants.map((m) => m.id)}
                    onAddGift={this.addOccurrence}
                    selected={this.filterOccurrence(this.props.selectedGifts, MerchantData)}
                />
                <Submenu label={"Facilities"}>
                    <ChoirMenu
                        character={this.props.character}
                        chapterIndex={this.props.chapter}
                        route={this.props.route}
                        onAddOccurrence={this.addOccurrence}
                        selected={this.filterOccurrence(this.props.selectedGifts, ChoirData)}
                    />
                    <CookingMenu
                        character={this.props.character}
                        chapterIndex={this.props.chapter}
                        route={this.props.route}
                        onAddOccurrence={this.addOccurrence}
                        selected={this.filterOccurrence(this.props.selectedGifts, CookingData)}
                    />
                </Submenu>
                <Submenu label={"Training"}>
                    <Item>Share a Meal</Item>
                </Submenu>
                <Submenu label={"Classroom"}>
                    <Item>Share a Meal</Item>
                </Submenu>
                <Submenu label={"Quests"}>
                    <Item>Share a Meal</Item>
                </Submenu>
            </Menu>
        );
    }

    addOccurrence(occurrence: Occurrence<OccurrenceData>) {
        this.props.onAddOccurrence(occurrence);
    }

    filterOccurrence<A extends OccurrenceData>(
        ocs: Occurrence<OccurrenceData>[],
        t: new (...args: any[]) => A
    ): Occurrence<A>[] {
        return ocs.filter((o: Occurrence<OccurrenceData>) => {
            return o.data instanceof t;
        }) as Occurrence<A>[];
    }
}
