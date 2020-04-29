import * as React from "react";
import bemNames from "util/bemnames";
import "./PlannerTable.scss";
import CharacterHeader from "components/CharacterHeader/CharacterHeader";
import { Col, Row } from "react-bootstrap";
import Database from "util/Database";
import PouchDB from "pouchdb";
import { Character } from "data/types/schemas/characterSchema";
import Assertions from "util/Assertions";
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
    }

    componentDidMount(): void {
        let database = new Database();
        database
            .initialize()
            .then(() => {
                return database.fetchCharacters();
            })
            .then((fetch: PouchDB.Core.AllDocsResponse<Character>) => {
                let characters = fetch.rows.map((r) => {
                    let doc = r.doc;
                    Assertions.isDefined(doc, "Fetch must contain document");
                    return doc;
                });
                return this.setState({
                    characters: characters,
                });
            })
            .then(() => {
                return database.fetchOccurrences();
            })
            .then((fetch) => {
                this.setState({
                    selectedOccurrences: fetch,
                });
            })
            .then(() => {
                return database.fetchMonastery();
            })
            .then((fetch: PouchDB.Core.AllDocsResponse<Monastery>) => {
                let doc = fetch.rows[0].doc;
                Assertions.isDefined(doc, "Fetch must contain document");
                this.setState({
                    monastery: doc,
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
                                    name={char.name}
                                    portraitUrl={char.portraitUrl}
                                    points={0}
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
                                                chapterIndex={i}
                                                monastery={this.state.monastery!}
                                                onAddOccurrence={this.handleAddOccurrence}
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
        new Database().addOccurrence(occurrence).then(() => {
            this.setState({
                selectedOccurrences: [...this.state.selectedOccurrences, occurrence],
            });
        });
    }
}
