import { Character } from "data/types/schemas/characterSchema";
import { RouteId } from "data/types/schemas/monasterySchema";
import { Merchant, MerchantId } from "data/types/schemas/merchantSchema";
import * as React from "react";
import Database from "util/Database";
import PouchDB from "pouchdb";
import { Submenu } from "react-contexify";
import GiftItem from "../GiftMenuItem/GiftMenuItem";
import Occurrence from "data/types/Occurrence";
import Time from "data/types/Time";
import MerchantData from "data/types/MerchantData";
import OccurrenceData from "data/types/OccurrenceData";

type MerchantMenuProps = {
    character: Character;
    chapterIndex: number;
    route: RouteId;
    merchants: MerchantId[];
    onAddGift: (occurrence: Occurrence<OccurrenceData>) => void;
    selected: Occurrence<MerchantData>[];
};

type MerchantMenuState = {
    merchantWares: Occurrence<MerchantData>[];
    merchants: Merchant[];
};

export default class MerchantMenu extends React.Component<MerchantMenuProps, MerchantMenuState> {
    constructor(props: MerchantMenuProps) {
        super(props);
        this.state = {
            merchantWares: [],
            merchants: [],
        };
    }

    componentDidMount(): void {
        Database.getSingleton().then((database) => {
            return Promise.all(
                this.props.merchants.map((merchant) => {
                    return database.fetchMerchant(merchant);
                })
            ).then((values: PouchDB.Core.Document<Merchant>[]) => {
                return this.setState({
                    merchants: values,
                    merchantWares: values
                        .map((merchant) => {
                            return merchant.wares.map((ware) => {
                                return new Occurrence(
                                    new Time(this.props.route, this.props.chapterIndex, 0),
                                    new MerchantData(merchant._id, ware.id),
                                    [this.props.character._id]
                                );
                            });
                        })
                        .flat(),
                });
            });
        });
    }

    render() {
        if (this.state.merchants.length === 0) {
            return null;
        } else {
            return (
                <Submenu label={"Merchants"}>
                    {this.state.merchants.map((merchant: Merchant) => {
                        return (
                            <Submenu key={merchant._id} label={merchant.name}>
                                {this.getItems(merchant)}
                            </Submenu>
                        );
                    })}
                </Submenu>
            );
        }
    }

    getItems(merchant: Merchant) {
        return this.state.merchantWares
            .filter((source) => merchant._id === source.data.merchant)
            .filter((source) => {
                return !this.props.selected.some((s) => {
                    // Filter this item if this gift has been chosen for this merchant during this chapter
                    return (
                        s.time.route === source.time.route &&
                        s.time.chapter === source.time.chapter &&
                        s.data.merchant === source.data.merchant &&
                        s.data.gift === source.data.gift
                    );
                });
            })
            .map((source) => (
                <GiftItem
                    key={source.data.gift}
                    sourceData={source.data}
                    onAddGift={(occurrenceData) => {
                        this.props.onAddGift(
                            new Occurrence(new Time(this.props.route, this.props.chapterIndex, 0), occurrenceData, [
                                this.props.character._id,
                            ])
                        );
                    }}
                />
            ));
    }
}
