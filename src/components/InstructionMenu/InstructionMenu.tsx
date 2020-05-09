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
    onAddOccurrence: (occurrenceData: Occurrence<OccurrenceData>) => void;
    selected: Occurrence<InstructionData>[];
};

type InstructionMenuState = {};

export default class InstructionMenu extends React.Component<InstructionMenuProps, InstructionMenuState> {
    render() {
        let effectSelect = (event: any) => {
            this.props.onAddOccurrence(
                new Occurrence<OccurrenceData>(
                    new Time(this.props.route, this.props.chapter, this.props.event),
                    new InstructionData(event.props.effect),
                    [this.props.character._id]
                )
            );
        };
        let effectivenesses: InstructionEffectiveness[] = ["Perfect", "Great", "Good", "Bad + Bonus", "Bad"];
        return effectivenesses.map((value) => (
            <Item key={value} onClick={effectSelect} data={{ effect: value }}>
                {value}
            </Item>
        ));
    }

    isDisabled() {
        return (
            this.props.selected.filter((s) =>
                isEqual(s.time, new Time(this.props.route, this.props.chapter, this.props.event))
            ).length > 0
        );
    }
}
