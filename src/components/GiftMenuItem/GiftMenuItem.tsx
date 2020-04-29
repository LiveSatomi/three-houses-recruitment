import * as React from "react";
import { Gift } from "data/types/schemas/giftSchema";
import Database from "util/Database";
import { Item } from "react-contexify";
import MerchantData from "data/types/MerchantData";
import OccurrenceData from "data/types/OccurrenceData";
import QuestData from "data/types/QuestData";

type GiftMenuItemProps = {
    sourceData: MerchantData | QuestData;
    onAddGift: (occurrenceData: OccurrenceData) => void;
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
            database.fetchGift(this.props.sourceData.gift).then((gift) => {
                this.setState({ gift: gift });
                import(`data/${gift.imageUrl}`)
                    .then((image) => {
                        this.setState({ image: image.default });
                    })
                    .catch((reason) => {
                        console.error(reason);
                        this.setState({
                            image: "",
                        });
                    });
            });
        });
    }

    render() {
        if (this.state.gift === undefined) {
            return <Item>{this.props.sourceData.gift}</Item>;
        } else {
            return <Item onClick={this.addGift}>{this.state.gift.name}</Item>;
        }
    }

    addGift() {
        this.props.onAddGift(this.props.sourceData);
    }
}
