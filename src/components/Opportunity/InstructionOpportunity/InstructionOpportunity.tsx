import * as React from "react";
import Opportunity from "../Opportunity";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";
import InstructionData, { InstructionEffectiveness } from "data/types/InstructionData";

type InstructionOpportunityProps = {
    occurrence: Occurrence<InstructionData>;
    onRemove: (occurrence: Occurrence<OccurrenceData>) => void;
};

type InstructionOpportunityState = {
    effectImages: string[];
};

let effect: InstructionEffectiveness[] = ["Perfect", "Great", "Good", "Bad + Bonus", "Bad"];
let effectId: string[] = ["perfect", "great", "good", "badBonus", "bad"];

export default class InstructionOpportunity extends React.Component<
    InstructionOpportunityProps,
    InstructionOpportunityState
> {
    constructor(props: InstructionOpportunityProps) {
        super(props);
        this.state = {
            effectImages: [],
        };

        this.opportunitySelected = this.opportunitySelected.bind(this);
    }

    componentDidMount(): void {
        Promise.all(
            effect.map((value, i) => {
                return import(`data/instruction/${effectId[i]}.png`);
            })
        ).then((results) => {
            this.setState({
                effectImages: results.map((r) => r.default),
            });
        });
    }

    render() {
        if (this.state.effectImages.length === 0) {
            return <span>Loading</span>;
        }
        return (
            <Opportunity
                onSelect={this.opportunitySelected}
                imageUrl={`instruction/${effectId[effect.indexOf(this.props.occurrence.data.effectiveness)]}.png`}
                imageTitle={this.props.occurrence.data.effectiveness}
                count={this.props.occurrence.data.count}
            />
        );
    }

    private opportunitySelected() {
        this.props.onRemove(this.props.occurrence);
    }
}
