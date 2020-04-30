import * as React from "react";
import "./GiftOpportunity.scss";
import { Gift, GiftId } from "data/types/schemas/giftSchema";
import { Character } from "data/types/schemas/characterSchema";
import Opportunity from "../Opportunity";
import Database from "util/Database";

type GiftOpportunityProps = {
    gift: GiftId;
    character: Character;
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
        Database.getSingleton().then((database) => {
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
        this.setState({
            isSelected: !this.state.isSelected,
        });
    }
}
