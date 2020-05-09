import * as React from "react";
import bemNames from "util/bemnames";
import "./PlannerTable.scss";
import CharacterHeader from "components/CharacterHeader/CharacterHeader";
import { Col, Row } from "react-bootstrap";
import Database from "util/Database";
import { Character } from "data/types/schemas/characterSchema";
import { Monastery } from "data/types/schemas/monasterySchema";
import Chapter from "../Chapter/Chapter";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";

const bem = bemNames.create("PlannerTable");

type PlannerTableProps = {};

type PlannerTableState = {
    characters: Character[];
    selectedOccurrences: Occurrence<OccurrenceData>[];
    monastery?: Monastery;
    scroll: number;
};

export default class PlannerTable extends React.Component<PlannerTableProps, PlannerTableState> {
    constructor(props: PlannerTableProps) {
        super(props);
        this.state = {
            characters: [],
            selectedOccurrences: [],
            monastery: undefined,
            scroll: 0,
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleAddOccurrence = this.handleAddOccurrence.bind(this);
        this.handleRemoveOccurrence = this.handleRemoveOccurrence.bind(this);
    }

    componentDidMount(): void {
        let database = Database.getSingleton();
        let charactersPromise: Promise<Character[]> = database.then((database) => {
            return database.fetchCharacters();
        });
        let occurrencesPromise: Promise<Occurrence<OccurrenceData>[]> = database.then((database) => {
            return database.fetchOccurrences();
        });
        let monasteryPromise: Promise<Monastery> = database.then((database) => {
            return database.fetchMonastery("garreg mach");
        });
        Promise.all([charactersPromise, occurrencesPromise, monasteryPromise]).then(([chars, occurrences, mon]) => {
            this.setState({
                characters: chars,
                selectedOccurrences: occurrences,
                monastery: mon,
            });
        });
    }

    render() {
        if (this.state.monastery === undefined) {
            return <span>Loading...</span>;
        }
        return (
            <Row
                className={bem.b()}
                onScroll={(e: any) => {
                    this.setState({ scroll: e.nativeEvent.target.scrollLeft });
                }}
            >
                <Col>
                    {this.state.characters.map((char) => {
                        return (
                            <Row className={bem.e("bar")} key={char._id}>
                                <CharacterHeader
                                    anchor={this.state.scroll}
                                    character={char}
                                    selectedOccurrences={this.state.selectedOccurrences}
                                />
                                {this.state
                                    .monastery!.routes.find((route) => {
                                        return route.id === "white-clouds";
                                    })!
                                    .chapters.map((_, i) => {
                                        return (
                                            <Chapter
                                                key={char._id + " chapter" + i}
                                                character={char}
                                                route={"white-clouds"}
                                                chapter={i}
                                                monastery={this.state.monastery!}
                                                onAddOccurrence={this.handleAddOccurrence}
                                                onRemoveOccurrence={this.handleRemoveOccurrence}
                                                selectedOpportunities={this.state.selectedOccurrences}
                                            />
                                        );
                                    })}
                            </Row>
                        );
                    })}
                </Col>
            </Row>
        );
    }

    handleAddOccurrence(occurrence: Occurrence<OccurrenceData>) {
        Database.getSingleton().then((database) =>
            database.addOccurrence(occurrence).then(() => {
                this.setState({
                    selectedOccurrences: [...this.state.selectedOccurrences, occurrence],
                });
            })
        );
    }

    handleRemoveOccurrence(occurrence: Occurrence<OccurrenceData>) {
        Database.getSingleton().then((database) =>
            database.removeOccurrence(occurrence).then(() => {
                this.setState({
                    selectedOccurrences: this.state.selectedOccurrences.filter((o) => o._id !== occurrence._id),
                });
            })
        );
    }
}
