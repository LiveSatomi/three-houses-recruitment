import { Character } from "data/types/schemas/characterSchema";
import { RouteId } from "data/types/schemas/monasterySchema";
import * as React from "react";
import { Item } from "react-contexify";
import Occurrence from "data/types/Occurrence";
import Time from "data/types/Time";
import OccurrenceData from "data/types/OccurrenceData";
import isEqual from "lodash/isEqual";
import InstructionData, { InstructionEffectiveness } from "data/types/InstructionData";

type InstructionMenuProps = {
    character: Character;
    chapter: number;
    event: number;
    route: RouteId;
    onAddOccurrence: (occurrence: Occurrence<OccurrenceData>) => void;
    onReplaceOccurrence: (occurrence: Occurrence<OccurrenceData>, newOccurrence: Occurrence<OccurrenceData>) => void;
    selected: Occurrence<InstructionData>[];
};

type InstructionMenuState = {};

export default class InstructionMenu extends React.Component<InstructionMenuProps, InstructionMenuState> {
    constructor(props: InstructionMenuProps) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(event: any) {
        let currentCount = this.currentCount(event.props.effect);
        let time = new Time(this.props.route, this.props.chapter, this.props.event);
        let newOccurrence: Occurrence<OccurrenceData> = new Occurrence<OccurrenceData>(
            time,
            new InstructionData(event.props.effect, currentCount + 1),
            [this.props.character._id]
        );

        if (currentCount === 0) {
            this.props.onAddOccurrence(newOccurrence);
        } else {
            let occurrence: Occurrence<OccurrenceData> = new Occurrence<OccurrenceData>(
                time,
                new InstructionData(event.props.effect, currentCount),
                [this.props.character._id]
            );
            this.props.onReplaceOccurrence(occurrence, newOccurrence);
        }
    }

    render() {
        let effectivenesses: InstructionEffectiveness[] = ["Perfect", "Great", "Good", "Bad + Bonus", "Bad"];
        return effectivenesses.map((value) => (
            <Item key={value} onClick={this.handleItemClick} data={{ effect: value }}>
                {value}
            </Item>
        ));
    }

    currentCount(effect: InstructionEffectiveness): number {
        let match = this.props.selected.find((s) => {
            return (
                isEqual(s.time, new Time(this.props.route, this.props.chapter, this.props.event)) &&
                s.characters.includes(this.props.character._id) &&
                s.data.effectiveness === effect
            );
        });
        if (match === undefined) {
            return 0;
        } else {
            return match.data.count;
        }
    }
}
