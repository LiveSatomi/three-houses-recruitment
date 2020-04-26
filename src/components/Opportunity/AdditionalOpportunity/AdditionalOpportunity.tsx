import * as React from "react";
import "./AdditionalOpportunity.scss";
import { Character } from "data/types/schemas/characterSchema";
import Opportunity from "../Opportunity";
import { Monastery, RouteId } from "data/types/schemas/monasterySchema";
import { Item, Menu, MenuProvider, Submenu } from "react-contexify";
import GiftSource from "data/types/GiftSource";
import MerchantMenu from "components/MerchantMenu/MerchantMenu";

type AdditionalOpportunityProps = {
    character: Character;
    chapterIndex: number;
    route: RouteId;
    monastery: Monastery;
    onAddGift: (gift: GiftSource) => void;
    selectedGifts: GiftSource[];
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
                        selected={this.props.selectedGifts}
                    />
                    <Submenu label={"Facilities"}>
                        <Item>Share a Meal</Item>
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
                    <Opportunity
                        onSelect={() => {}}
                        imageUrl={"misc/additional.png"}
                        imageTitle={"Add Support"}
                        isSelected={false}
                    />
                </MenuProvider>
            </>
        );
    }

    addGift(giftSource: GiftSource) {
        this.props.onAddGift(giftSource);
    }
}
