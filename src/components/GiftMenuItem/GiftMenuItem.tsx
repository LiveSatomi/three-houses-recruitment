import * as React from "react";
import { Gift } from "data/types/schemas/giftSchema";
import Database from "util/Database";
import { Item } from "react-contexify";
import GiftSource from "data/types/GiftSource";
import { MenuItemEventHandler } from "react-contexify/lib/types";

type GiftMenuItemProps = {
    giftSource: GiftSource;
    onAddGift: (gift: GiftSource) => void;
};

type GiftMenuItemState = {
    gift: Gift;
    image: string;
};

export default class GiftMenuItem extends React.Component<GiftMenuItemProps, GiftMenuItemState> {
    constructor(props: GiftMenuItemProps, state: GiftMenuItemState) {
        super(props);
        this.state = state;
        this.addGift = this.addGift.bind(this);
    }

    componentDidMount(): void {
        let database = new Database();
        database.initialize().then(() => {
            database.fetchGift(this.props.giftSource.gift).then((gift) => {
                this.setState({ gift: gift });
                import(`data/${gift.imageUrl}`)
                    .then((image) => {
                        this.setState({ image: image.default });
                    })
                    .catch((reason) => {
                        this.setState({
                            image: "",
                        });
                    });
            });
        });
    }

    render() {
        if (this.state.gift === undefined) {
            return <Item>{this.props.giftSource.gift}</Item>;
        } else {
            return (
                <Item onClick={this.addGift} data={this.props.giftSource}>
                    {this.state.gift.name}
                </Item>
            );
        }
    }

    addGift(eventHandler: MenuItemEventHandler) {
        let props = eventHandler.props as GiftSource;
        this.props.onAddGift(new GiftSource(props.gift, props.route, props.chapter, props.merchant!));
    }
}
