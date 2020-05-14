import * as React from "react";
import "./AdditionalOpportunity.scss";
import { Character } from "data/types/schemas/characterSchema";
import Opportunity from "../Opportunity";
import { Monastery, RouteId } from "data/types/schemas/monasterySchema";
import { Menu, MenuProvider, Submenu } from "react-contexify";
import MerchantMenu from "components/OpportunityMenu/MerchantMenu/MerchantMenu";
import CookingMenu from "components/OpportunityMenu/CookingMenu/CookingMenu";
import ChoirMenu from "components/OpportunityMenu/ChoirMenu/ChoirMenu";
import InstructionMenu from "components/OpportunityMenu/InstructionMenu/InstructionMenu";
import TrainingMenu from "components/OpportunityMenu/TrainingMenu/TrainingMenu";
import QuestMenu from "components/OpportunityMenu/QuestMenu/QuestMenu";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";
import MerchantData from "data/types/MerchantData";
import ChoirData from "data/types/ChoirData";
import CookingData from "data/types/CookingData";
import InstructionData from "data/types/InstructionData";
import QuestData from "data/types/QuestData";

type AdditionalOpportunityProps = {
    character: Character;
    route: RouteId;
    chapter: number;
    event: number;
    monastery: Monastery;
    onAddOccurrence: (occurrence: Occurrence<OccurrenceData>) => Promise<void>;
    onRemoveOccurrence: (occurrence: Occurrence<OccurrenceData>) => Promise<void>;
    selected: Occurrence<OccurrenceData>[];
};

type AdditionalOpportunityState = {};

export default class AdditionalOpportunity extends React.Component<
    AdditionalOpportunityProps,
    AdditionalOpportunityState
> {
    constructor(props: AdditionalOpportunityProps) {
        super(props);

        this.addOccurrence = this.addOccurrence.bind(this);
        this.replaceOccurrence = this.replaceOccurrence.bind(this);
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
                    onReplaceOccurrence={this.replaceOccurrence}
                    selected={this.filterOccurrence(this.props.selected, InstructionData)}
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
                    selected={this.filterOccurrence(this.props.selected, MerchantData)}
                />
                <Submenu label={"Facilities"}>
                    <ChoirMenu
                        character={this.props.character}
                        chapterIndex={this.props.chapter}
                        route={this.props.route}
                        onAddOccurrence={this.addOccurrence}
                        selected={this.filterOccurrence(this.props.selected, ChoirData)}
                    />
                    <CookingMenu
                        character={this.props.character}
                        chapterIndex={this.props.chapter}
                        route={this.props.route}
                        onAddOccurrence={this.addOccurrence}
                        selected={this.filterOccurrence(this.props.selected, CookingData)}
                    />
                </Submenu>
                <Submenu label={"Training"}>
                    <TrainingMenu
                        character={this.props.character}
                        chapter={this.props.chapter}
                        event={this.props.event}
                        route={this.props.route}
                        onAddOccurrence={this.props.onAddOccurrence}
                        onDeleteOccurrence={this.props.onRemoveOccurrence}
                        selected={this.filterOccurrence(this.props.selected, InstructionData)}
                    />
                </Submenu>
                <QuestMenu
                    character={this.props.character}
                    route={this.props.route}
                    chapter={this.props.chapter}
                    event={this.props.event}
                    quests={this.props.monastery.quests!}
                    onAddGift={this.props.onAddOccurrence}
                    selected={this.filterOccurrence(this.props.selected, QuestData)}
                />
            </Menu>
        );
    }

    addOccurrence(occurrence: Occurrence<OccurrenceData>) {
        this.props.onAddOccurrence(occurrence).then(() => true);
    }

    replaceOccurrence(occurrence: Occurrence<OccurrenceData>, newOccurrence: Occurrence<OccurrenceData>) {
        this.props.onRemoveOccurrence(occurrence).then(() => {
            this.props.onAddOccurrence(newOccurrence).then(() => true);
        });
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
