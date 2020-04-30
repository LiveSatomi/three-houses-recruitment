import * as React from "react";
import "./GiftOpportunity.scss";
import { Gift } from "data/types/schemas/giftSchema";
import Opportunity from "../Opportunity";
import Database from "util/Database";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";
import GiftData from "data/types/GiftData";

type GiftOpportunityProps = {
    occurrence: Occurrence<GiftData>;
    onRemove: (occurrence: Occurrence<OccurrenceData>) => void;
};

type GiftOpportunityState = {
    gift: Gift;
};

export default class GiftOpportunity extends React.Component<GiftOpportunityProps, GiftOpportunityState> {
    constructor(props: GiftOpportunityProps, state: GiftOpportunityState) {
        super(props);
        this.state = state;

        this.opportunitySelected = this.opportunitySelected.bind(this);
    }

    componentDidMount(): void {
        Database.getSingleton().then((database) => {
            database.fetchGift(this.props.occurrence.data.gift).then((gift) => {
                this.setState({
                    gift: gift,
                });
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
                />
            );
        }
    }

    private opportunitySelected() {
        this.props.onRemove(this.props.occurrence);
    }
}
