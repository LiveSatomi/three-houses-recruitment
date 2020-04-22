import * as React from "react";
import "./GiftOpportunity.scss";
import { Gift } from "data/types/schemas/giftSchema";
import { Character } from "data/types/schemas/characterSchema";
import Opportunity from "../Opportunity";

type GiftOpportunityProps = {
    gift: Gift;
    character: Character;
    onWorthChanged: (change: number) => void;
};

type GiftOpportunityState = {
    image: string;
    isSelected: boolean;
};

export default class GiftOpportunity extends React.Component<
    GiftOpportunityProps,
    GiftOpportunityState
> {
    constructor(props: GiftOpportunityProps, state: GiftOpportunityState) {
        super(props);
        this.state = state;

        this.opportunitySelected = this.opportunitySelected.bind(this);
    }

    render() {
        return (
            <Opportunity
                onSelect={this.opportunitySelected}
                imageUrl={this.props.gift.imageUrl}
                imageTitle={this.props.gift.name}
                isSelected={this.state.isSelected}
            />
        );
    }

    private opportunitySelected() {
        this.setState(
            {
                isSelected: !this.state.isSelected,
            },
            () => {
                if (this.props.character.gifts.includes(this.props.gift._id)) {
                    this.props.onWorthChanged(
                        20 * (this.state.isSelected ? 1 : -1)
                    );
                } else {
                    this.props.onWorthChanged(
                        10 * (this.state.isSelected ? 1 : -1)
                    );
                }
            }
        );
    }
}
