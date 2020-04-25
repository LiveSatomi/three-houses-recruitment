import { Character } from "data/types/schemas/characterSchema";
import { RouteId } from "data/types/schemas/monasterySchema";
import GiftSource from "data/types/GiftSource";
import { Merchant, MerchantId } from "data/types/schemas/merchantSchema";
import * as React from "react";
import Database from "util/Database";
import PouchDB from "pouchdb";
import { Submenu } from "react-contexify";
import GiftItem from "../GiftMenuItem/GiftMenuItem";

type MerchantMenuProps = {
    character: Character;
    chapterIndex: number;
    route: RouteId;
    merchants: MerchantId[];
    onAddGift: (gift: GiftSource) => void;
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
            Promise.all(
                this.props.merchants.map((merchant) => {
                    return database.fetchMerchant(merchant);
                })
            ).then((values: PouchDB.Core.Document<Merchant>[]) => {
                this.setState({
                    merchants: values,
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
        if (this.state.merchants.length === 0) {
            return null;
        } else {
            return (
                <Submenu label={"Merchants"}>
                    {this.state.merchants.map((merchant: Merchant) => {
                        return (
                            <Submenu key={merchant._id} label={merchant.name}>
                                {this.state.merchantWares
                                    .filter((source) => merchant._id === source.merchant)
                                    .map((source) => (
                                        <GiftItem
                                            key={source.getId()}
                                            giftSource={source}
                                            onAddGift={this.props.onAddGift}
                                        />
                                    ))}
                            </Submenu>
                        );
                    })}
                </Submenu>
            );
        }
    }
}
