import * as React from "react";
import bemNames from "util/bemnames";
import "./Chapter.scss";
import { Col, Row } from "react-bootstrap";
import { Character } from "data/types/schemas/characterSchema";
import { Monastery, RouteId } from "data/types/schemas/monasterySchema";
import GiftOpportunity from "components/Opportunity/GiftOpportunity/GiftOpportunity";
import FacilityOpportunity from "components/Opportunity/FacilityOpportunity/FacilityOpportunity";
import AdditionalOpportunity from "components/Opportunity/AdditionalOpportunity/AdditionalOpportunity";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";
import ChoirData from "data/types/ChoirData";
import MerchantData from "data/types/MerchantData";

const bem = bemNames.create("Chapter");

type ChapterProps = {
    character: Character;
    route: RouteId;
    chapterIndex: number;
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
        return (
            <Col className={bem.b("border")} xs={6}>
                <Row>
                    {this.mapComponentByType(
                        this.props.selectedOpportunities.filter(
                            (match) =>
                                match.characters.includes(this.props.character._id) &&
                                match.time.route === this.props.route &&
                                match.time.chapter === this.props.chapterIndex
                        )
                    )}
                    <AdditionalOpportunity
                        key={"additional"}
                        character={this.props.character}
                        monastery={this.props.monastery}
                        route={this.props.route}
                        chapterIndex={this.props.chapterIndex}
                        onAddOccurrence={this.addOccurrence}
                        selectedGifts={this.props.selectedOpportunities}
                    />
                </Row>
            </Col>
        );
    }

    /**
     * Maps occurrences to Components of the appropriate type and returns all the components
     * TODO possibly could make the mapper a utility with injected dependencies that know how to accept certain occurrence data by type
     * @param occurrences the full list of occurrences to map
     */
    mapComponentByType(occurrences: Occurrence<OccurrenceData>[]): JSX.Element[] {
        return this.filterOccurrence(occurrences, MerchantData)
            .map((occurrence: Occurrence<MerchantData>) => {
                return (
                    <GiftOpportunity key={occurrence._id} occurrence={occurrence} onRemove={this.removeOccurrence} />
                );
            })
            .concat(
                this.filterOccurrence(occurrences, ChoirData).map((occurrence: Occurrence<ChoirData>) => {
                    return (
                        <FacilityOpportunity
                            key={occurrence._id}
                            facility={occurrence.data.type}
                            occurrence={occurrence}
                            partnerId={occurrence.characters.filter((c) => this.props.character._id !== c)[0]}
                            onRemove={this.removeOccurrence}
                        />
                    );
                })
            );
    }

    addOccurrence(occurrence: Occurrence<OccurrenceData>) {
        this.props.onAddOccurrence(occurrence);
    }

    removeOccurrence(occurrence: Occurrence<OccurrenceData>) {
        this.props.onRemoveOccurrence(occurrence);
    }

    // Function based on the following thread:
    // https://stackoverflow.com/questions/41921868/how-to-filter-a-list-of-types-by-a-generic-type-in-typescript
    filterOccurrence<A extends OccurrenceData>(
        occurrences: Occurrence<OccurrenceData>[],
        t: new (...args: any[]) => A
    ): Occurrence<A>[] {
        return occurrences.filter((o: Occurrence<OccurrenceData>) => {
            return o.data instanceof t;
        }) as Occurrence<A>[];
    }
}
