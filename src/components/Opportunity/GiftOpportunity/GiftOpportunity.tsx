import * as React from "react";
import "./GiftOpportunity.scss";
import { Gift, GiftId } from "data/types/schemas/giftSchema";
import { Character } from "data/types/schemas/characterSchema";
import Opportunity from "../Opportunity";
import Database from "util/Database";

type GiftOpportunityProps = {
    gift: GiftId;
    character: Character;
    onWorthChanged: (change: number) => void;
};

type GiftOpportunityState = {
    gift: Gift;
    isSelected: boolean;
};

export default class GiftOpportunity extends React.Component<GiftOpportunityProps, GiftOpportunityState> {
    constructor(props: GiftOpportunityProps, state: GiftOpportunityState) {
        super(props);
        this.state = state;

        this.opportunitySelected = this.opportunitySelected.bind(this);
    }

    componentDidMount(): void {
        let database = new Database();
        database.initialize().then(() => {
            database.fetchGift(this.props.gift).then((gift) => {
                this.setState(
                    {
                        gift: gift,
                    },
                    () => {
                        this.opportunitySelected();
                    }
                );
            });
        });
    }

    render() {
        if (this.state.gift === undefined) {
            return <span>Loading</span>;
        } else {
            return (
                <Opportunity
                    onSelect={this.opportunitySelected}
                    imageUrl={this.state.gift.imageUrl}
                    imageTitle={this.state.gift.name}
                    isSelected={this.state.isSelected}
                />
            );
        }
    }

    private opportunitySelected() {
        this.setState(
            {
                isSelected: !this.state.isSelected,
            },
            () => {
                if (this.props.character.gifts.includes(this.state.gift._id)) {
                    this.props.onWorthChanged(20 * (this.state.isSelected ? 1 : -1));
                } else {
                    this.props.onWorthChanged(10 * (this.state.isSelected ? 1 : -1));
                }
            }
        );
    }
}
