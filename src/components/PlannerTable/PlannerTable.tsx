import * as React from "react";
import bemNames from "util/bemnames";
import "./PlannerTable.scss";
import CharacterHeader from "components/CharacterHeader/CharacterHeader";
import { Col, Row } from "react-bootstrap";
import Database from "util/Database";
import PouchDB from "pouchdb";
import { Character } from "data/types/schemas/characterSchema";
import Assertions from "util/Assertions";
import CharacterSelection from "data/types/CharacterSelection";
import { Monastery } from "data/types/schemas/monasterySchema";
import Chapter from "../Chapter/Chapter";
import GiftMatch from "../../data/types/GiftMatch";

const bem = bemNames.create("PlannerTable");

type PlannerTableProps = {};

type PlannerTableState = {
    characters: Character[];
    characterSelections: CharacterSelection[];
    giftMatches: GiftMatch[];
    monastery?: Monastery;
    scroll: number;
};

export default class PlannerTable extends React.Component<PlannerTableProps, PlannerTableState> {
    constructor(props: PlannerTableProps) {
        super(props);
        this.state = {
            characters: [],
            characterSelections: [],
            giftMatches: [],
            monastery: undefined,
            scroll: 0,
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handlePointChange = this.handlePointChange.bind(this);
        this.handleGiftMatch = this.handleGiftMatch.bind(this);
    }

    componentDidMount(): void {
        let database = new Database();
        database
            .initialize()
            .then(() => {
                return database.fetchCharacters();
            })
            .then((fetch: PouchDB.Core.AllDocsResponse<Character>) => {
                let characterSelections: CharacterSelection[] = [];
                let characters = fetch.rows.map((r, i) => {
                    let doc = r.doc;
                    Assertions.isDefined(doc, "Fetch must contain document");
                    let characterSelection = new CharacterSelection(doc._id);
                    characterSelection.points = 0;
                    characterSelections[i] = characterSelection;
                    return doc;
                });
                return this.setState({
                    characters: characters,
                    characterSelections: characterSelections,
                });
            })
            .then(() => {
                return database.fetchSelectedGifts();
            })
            .then((fetch) => {
                this.setState({
                    giftMatches: fetch,
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
                    {this.state.characters.map((char, i) => {
                        return (
                            <Row className={bem.e("bar")} key={char._id}>
                                <CharacterHeader
                                    anchor={this.state.scroll}
                                    name={char.name}
                                    portraitUrl={char.portraitUrl}
                                    points={this.state.characterSelections[i].points || 0}
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
                                                onMatchGift={this.handleGiftMatch}
                                                selectedOpportunities={this.state.giftMatches}
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

    handleGiftMatch(giftMatch: GiftMatch) {
        new Database().addGiftMatch(giftMatch).then(() => {
            this.setState({
                giftMatches: [...this.state.giftMatches, giftMatch],
            });
        });
    }

    handlePointChange(points: number, character: Character) {
        let index = this.state.characters.indexOf(character);
        let characterSelection = this.state.characterSelections[index];
        characterSelection.points = points;
        let characterSelections = this.state.characterSelections;
        this.setState({
            characterSelections: characterSelections,
        });
    }
}
