import * as React from "react";
import { Gift } from "data/types/schemas/giftSchema";
import Database from "util/Database";
import { Item } from "react-contexify";
import GiftSource from "data/types/GiftSource";

type GiftItemProps = {
    giftSource: GiftSource;
};

type GiftItemState = {
    gift: Gift;
    image: string;
};

export default class GiftItem extends React.Component<GiftItemProps, GiftItemState> {
    constructor(props: GiftItemProps, state: GiftItemState) {
        super(props);
        this.state = state;
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
            return <Item>{this.state.gift.name}</Item>;
        }
    }
}
