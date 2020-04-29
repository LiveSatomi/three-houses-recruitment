import * as React from "react";
import { Character, CharacterId } from "data/types/schemas/characterSchema";
import Opportunity from "../Opportunity";
import Database from "util/Database";
import { Facility, FacilityId } from "data/types/schemas/facilitySchema";

type FacilityOpportunityProps = {
    facility: FacilityId;
    partnerId: CharacterId;
};

type FacilityOpportunityState = {
    facility: Facility;
    partner: Character;
};

export default class FacilityOpportunity extends React.Component<FacilityOpportunityProps, FacilityOpportunityState> {
    constructor(props: FacilityOpportunityProps, state: FacilityOpportunityState) {
        super(props);
        this.state = state;
    }

    componentDidMount(): void {
        let database = new Database();
        database
            .initialize()
            .then(() => {
                database.fetchCharacter(this.props.partnerId).then((partner) => {
                    this.setState({
                        partner: partner,
                    });
                });
            })
            .then(() => {
                database.fetchFacility(this.props.facility).then((facility) => {
                    this.setState({
                        facility: facility,
                    });
                });
            });
    }

    render() {
        if (this.state.facility === undefined) {
            return <span>Loading</span>;
        } else {
            return (
                <Opportunity
                    onSelect={() => {}}
                    imageUrl={this.state.facility.imageUrl}
                    imageTitle={this.state.facility.name + " with " + this.state.partner.name}
                    isSelected={false}
                />
            );
        }
    }
}
