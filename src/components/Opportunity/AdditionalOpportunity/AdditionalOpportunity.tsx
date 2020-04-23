import * as React from "react";
import "./AdditionalOpportunity.scss";
import { Character } from "data/types/schemas/characterSchema";
import Opportunity from "../Opportunity";
import { Monastery } from "data/types/schemas/monasterySchema";
import { Gift } from "data/types/schemas/giftSchema";
import Database from "util/Database";
import PouchDB from "pouchdb";
import Assertions from "util/Assertions";
import { Item, Menu, MenuProvider } from "react-contexify";
import { MenuItemEventHandler } from "react-contexify/lib/types";

type AdditionalOpportunityProps = {
    character: Character;
    chapterIndex: number;
    monastery: Monastery;
    onAddGift: (gift: Gift) => void;
};

type AdditionalOpportunityState = {
    possibleOpportunities: Gift[];
};

export default class AdditionalOpportunity extends React.Component<
    AdditionalOpportunityProps,
    AdditionalOpportunityState
> {
    constructor(props: AdditionalOpportunityProps) {
        super(props);
        this.state = {
            possibleOpportunities: [],
        };

        this.showAddMenu = this.showAddMenu.bind(this);
        this.addGift = this.addGift.bind(this);
    }

    componentDidMount(): void {
        let database = new Database();
        database
            .initialize()
            .then(() => {
                return database.fetchGifts();
            })
            .then((fetch: PouchDB.Core.AllDocsResponse<Gift>) => {
                this.setState({
                    possibleOpportunities: fetch.rows.map((r) => {
                        let doc = r.doc;
                        Assertions.isDefined(
                            doc,
                            "Fetch must contain document"
                        );
                        return doc;
                    }),
                });
            });
    }

    render() {
        let menuId = this.props.character._id + " " + this.props.chapterIndex;

        let item = (props: { gift: Gift }) => {
            return (
                <Item data={props.gift} onClick={this.addGift}>
                    Tasty Baked Treat
                </Item>
            );
        };
        if (this.state.possibleOpportunities.length === 0) {
            return <span>loading</span>;
        }

        return (
            <>
                <Menu id={menuId}>
                    {item({
                        gift: this.state.possibleOpportunities.find(
                            (g) => g._id === "tasty-baked-treat"
                        )!,
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
        let treat = this.state.possibleOpportunities.find(
            (e) => e._id === "tasty-baked-treat"
        );
        Assertions.isDefined(treat, "tasty-baked-treat does not exist");
        this.props.onAddGift(treat);
    }

    addGift(eventHandler: MenuItemEventHandler) {
        this.props.onAddGift(eventHandler.props as Gift);
    }
}
