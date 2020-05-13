import { Character } from "data/types/schemas/characterSchema";
import { RouteId } from "data/types/schemas/monasterySchema";
import * as React from "react";
import { Item } from "react-contexify";
import Occurrence from "data/types/Occurrence";
import Time from "data/types/Time";
import OccurrenceData from "data/types/OccurrenceData";
import isEqual from "lodash/isEqual";
import InstructionData, { InstructionEffectiveness } from "data/types/InstructionData";

type TrainingMenuProps = {
    character: Character;
    chapter: number;
    event: number;
    route: RouteId;
    onAddOccurrence: (occurrence: Occurrence<OccurrenceData>) => void;
    onDeleteOccurrence: (occurrence: Occurrence<OccurrenceData>) => void;
    selected: Occurrence<InstructionData>[];
};

type TrainingMenuState = {};

let effectivenesses: InstructionEffectiveness[] = ["Great", "Good"];

export default class TrainingMenu extends React.Component<TrainingMenuProps, TrainingMenuState> {
    constructor(props: TrainingMenuProps) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(event: any) {
        let time = new Time(this.props.route, this.props.chapter, this.props.event);
        let occurrence: Occurrence<OccurrenceData> = new Occurrence<OccurrenceData>(
            time,
            new InstructionData(event.props.effect, 1),
            [this.props.character._id]
        );

        this.props.onAddOccurrence(occurrence);
    }

    private getEffectItems() {
        return effectivenesses.map((value) => (
            <Item key={value} onClick={this.handleItemClick} data={{ effect: value }} disabled={this.isDisabled()}>
                {value}
            </Item>
        ));
    }

    render() {
        return this.getEffectItems();
    }

    isDisabled(): boolean {
        return this.props.selected.some((s) => {
            return (
                isEqual(s.time, new Time(this.props.route, this.props.chapter, this.props.event)) &&
                s.characters.includes(this.props.character._id)
            );
        });
    }
}
