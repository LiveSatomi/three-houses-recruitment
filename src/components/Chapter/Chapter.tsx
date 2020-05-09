import * as React from "react";
import { Character } from "data/types/schemas/characterSchema";
import { Monastery, RouteId } from "data/types/schemas/monasterySchema";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";
import Exploration from "components/Exploration/Exploration";
import Instruction from "../Instruction/Instruction";

type ChapterProps = {
    character: Character;
    route: RouteId;
    chapter: number;
    monastery: Monastery;
    onAddOccurrence: (occurrence: Occurrence<OccurrenceData>) => void;
    onRemoveOccurrence: (occurrence: Occurrence<OccurrenceData>) => void;
    selectedOpportunities: Occurrence<OccurrenceData>[];
};

type ChapterState = {
    pointTotal: number;
};

export default class Chapter extends React.Component<ChapterProps, ChapterState> {
    constructor(props: ChapterProps) {
        super(props);
        this.state = {
            pointTotal: 0,
        };

        this.addOccurrence = this.addOccurrence.bind(this);
        this.removeOccurrence = this.removeOccurrence.bind(this);
    }

    render() {
        return this.props.monastery.routes
            .find((r) => r.id === this.props.route)!
            .chapters[this.props.chapter].events.map((e, i) => {
                if (e === "free") {
                    return (
                        <Exploration
                            key={this.props.chapter + " " + i}
                            character={this.props.character}
                            route={this.props.route}
                            chapter={this.props.chapter}
                            event={i}
                            monastery={this.props.monastery}
                            onAddOccurrence={this.props.onAddOccurrence}
                            onRemoveOccurrence={this.props.onRemoveOccurrence}
                            selectedOpportunities={this.props.selectedOpportunities}
                        />
                    );
                } else if (e === "instruction") {
                    return (
                        <Instruction
                            key={this.props.chapter + " " + i}
                            character={this.props.character}
                            route={this.props.route}
                            chapter={this.props.chapter}
                            event={i}
                            monastery={this.props.monastery}
                            onAddOccurrence={this.props.onAddOccurrence}
                            onRemoveOccurrence={this.props.onRemoveOccurrence}
                            selectedOpportunities={this.props.selectedOpportunities}
                        />
                    );
                } else if (e === "mission") {
                    return <span>mission</span>;
                } else {
                    throw new Error("Event must be free day, instruction, or mission.");
                }
            });
    }

    addOccurrence(occurrence: Occurrence<OccurrenceData>) {
        this.props.onAddOccurrence(occurrence);
    }

    removeOccurrence(occurrence: Occurrence<OccurrenceData>) {
        this.props.onRemoveOccurrence(occurrence);
    }
}
