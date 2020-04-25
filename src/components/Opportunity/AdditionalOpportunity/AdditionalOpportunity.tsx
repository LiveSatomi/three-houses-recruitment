import * as React from "react";
import "./AdditionalOpportunity.scss";
import { Character } from "data/types/schemas/characterSchema";
import Opportunity from "../Opportunity";
import { Monastery, RouteId } from "data/types/schemas/monasterySchema";
import { Gift } from "data/types/schemas/giftSchema";
import Database from "util/Database";
import PouchDB from "pouchdb";
import Assertions from "util/Assertions";
import { Item, Menu, MenuProvider, Submenu } from "react-contexify";
import { MenuItemEventHandler } from "react-contexify/lib/types";
import { Merchant } from "../../../data/types/schemas/merchantSchema";
import GiftSource from "../../../data/types/GiftSource";
import { ReactElement } from "react";

type AdditionalOpportunityProps = {
    character: Character;
    chapterIndex: number;
    route: RouteId;
    monastery: Monastery;
    onAddGift: (gift: GiftSource) => void;
};

type AdditionalOpportunityState = {
    merchantWares: GiftSource[];
};

export default class AdditionalOpportunity extends React.Component<
    AdditionalOpportunityProps,
    AdditionalOpportunityState
> {
    constructor(props: AdditionalOpportunityProps) {
        super(props);
        this.state = {
            merchantWares: [],
        };

        this.showAddMenu = this.showAddMenu.bind(this);
        this.addGift = this.addGift.bind(this);
    }

    componentDidMount(): void {
        let database = new Database();
        database.initialize().then(() => {
            Promise.all(
                this.props.monastery.routes
                    .find((route) => route.id === "white-clouds")!
                    .chapters[this.props.chapterIndex].merchants.map((merchant) => {
                        return database.fetchMerchant(merchant.id);
                    })
            ).then((values: PouchDB.Core.Document<Merchant>[]) => {
                this.setState({
                    merchantWares: values
                        .map((merchant) => {
                            return merchant.wares.map(
                                (ware) =>
                                    new GiftSource(ware.id, merchant._id, this.props.route, this.props.chapterIndex)
                            );
                        })
                        .flat(),
                });
            });
        });
    }

    render() {
        let menuId = this.props.character._id + " " + this.props.chapterIndex;

        let merchantMenu: ReactElement | null;

        if (this.state.merchantWares.length !== 0) {
            let byMerchant = this.state.merchantWares.reduce((ac, source) => {
                return { ...ac, [source.merchant as string]: source };
            }, {});
            merchantMenu = (
                <Submenu label={"Merchants"}>
                    {Object.keys(byMerchant).map((merchant: string) => {
                        return (
                            <Submenu key={merchant} label={merchant}>
                                {this.state.merchantWares
                                    .filter((source) => merchant === source.merchant)
                                    .map((source) => (
                                        <Item key={source.getId()}>{source.gift}</Item>
                                    ))}
                            </Submenu>
                        );
                    })}
                </Submenu>
            );
        } else {
            merchantMenu = null;
        }

        let item = (props: { gift: GiftSource }) => {
            return (
                <>
                    {merchantMenu}
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
                </>
            );
        };

        return (
            <>
                <Menu style={{ zIndex: 2 }} id={menuId}>
                    {item({
                        gift: this.state.merchantWares.find((g) => g.gift === "tasty-baked-treat")!,
                    })}
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

    showAddMenu() {
        let treat = this.state.merchantWares.find((g) => g.gift === "tasty-baked-treat");
        Assertions.isDefined(treat, "tasty-baked-treat does not exist");
        this.props.onAddGift(treat);
    }

    addGift(eventHandler: MenuItemEventHandler) {
        this.props.onAddGift(eventHandler.props as GiftSource);
    }
}
