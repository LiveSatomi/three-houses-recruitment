import { Character } from "data/types/schemas/characterSchema";
import { RouteId } from "data/types/schemas/monasterySchema";
import GiftSource, { getId } from "data/types/GiftSource";
import { Merchant, MerchantId } from "data/types/schemas/merchantSchema";
import * as React from "react";
import Database from "util/Database";
import PouchDB from "pouchdb";
import { Submenu } from "react-contexify";
import GiftItem from "../GiftMenuItem/GiftMenuItem";
import isEqual from "lodash/isEqual";

type MerchantMenuProps = {
    character: Character;
    chapterIndex: number;
    route: RouteId;
    merchants: MerchantId[];
    onAddGift: (gift: GiftSource) => void;
    selected: GiftSource[];
};

type MerchantMenuState = {
    merchantWares: GiftSource[];
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
        let database = new Database();
        database.initialize().then(() => {
            return Promise.all(
                this.props.merchants.map((merchant) => {
                    return database.fetchMerchant(merchant);
                })
            ).then((values: PouchDB.Core.Document<Merchant>[]) => {
                return this.setState({
                    merchants: values,
                    merchantWares: values
                        .map((merchant) => {
                            return merchant.wares.map(
                                (ware) =>
                                    new GiftSource(ware.id, this.props.route, this.props.chapterIndex, merchant._id)
                            );
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
            .filter((source) => merchant._id === source.merchant)
            .filter((source) => {
                return !this.props.selected.some((s) => {
                    return isEqual(s, source);
                });
            })
            .map((source) => <GiftItem key={getId(source)} giftSource={source} onAddGift={this.props.onAddGift} />);
    }
}
