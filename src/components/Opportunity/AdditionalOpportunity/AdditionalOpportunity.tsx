import * as React from "react";
import "./AdditionalOpportunity.scss";
import { Character } from "data/types/schemas/characterSchema";
import Opportunity from "../Opportunity";
import { Monastery, RouteId } from "data/types/schemas/monasterySchema";
import { Item, Menu, MenuProvider, Submenu } from "react-contexify";
import MerchantMenu from "components/MerchantMenu/MerchantMenu";
import ChoirMenu from "components/ChoirMenu/ChoirMenu";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";
import MerchantData from "data/types/MerchantData";
import ChoirData from "data/types/ChoirData";

type AdditionalOpportunityProps = {
    character: Character;
    chapterIndex: number;
    route: RouteId;
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

        this.addGift = this.addGift.bind(this);
    }

    render() {
        let menuId = this.props.character._id + " " + this.props.chapterIndex;

        return (
            <>
                <Menu style={{ zIndex: 2 }} id={menuId}>
                    <MerchantMenu
                        character={this.props.character}
                        chapterIndex={this.props.chapterIndex}
                        route={this.props.route}
                        merchants={this.props.monastery.routes
                            .find((route) => route.id === "white-clouds")!
                            .chapters[this.props.chapterIndex].merchants.map((m) => m.id)}
                        onAddGift={this.addGift}
                        selected={this.filterOccurrence(this.props.selectedGifts, MerchantData)}
                    />
                    <Submenu label={"Facilities"}>
                        <ChoirMenu
                            character={this.props.character}
                            chapterIndex={this.props.chapterIndex}
                            route={this.props.route}
                            onAddOccurrence={this.addGift}
                            selected={this.filterOccurrence(this.props.selectedGifts, ChoirData)}
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
                <MenuProvider event={"onClick"} id={menuId}>
                    <Opportunity onSelect={() => {}} imageUrl={"misc/additional.png"} imageTitle={"Add Support"} />
                </MenuProvider>
            </>
        );
    }

    addGift(occurrence: Occurrence<OccurrenceData>) {
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
