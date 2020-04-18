import * as React from "react";
import bemNames from "util/bemnames";
import "./CharacterTable.scss";
import CharacterHeader from "components/CharacterHeader/CharacterHeader";
import ChapterTable from "components/ChapterTable/ChapterTable";
import { Col, Row } from "react-bootstrap";
import Database from "util/Database";
import PouchDB from "pouchdb";
import { Character } from "data/types/schemas/characterSchema";
import Assertions from "util/Assertions";
import CharacterSelection from "data/types/CharacterSelection";
import { Monastery } from "data/types/schemas/monasterySchema";

const bem = bemNames.create("CharacterTable");

type CharacterTableProps = {};

type CharacterTableState = {
    characters: Character[];
    characterSelections: CharacterSelection[];
    monastery?: Monastery;
};

export default class CharacterTable extends React.Component<
    CharacterTableProps,
    CharacterTableState
> {
    constructor(props: CharacterTableProps) {
        super(props);
        this.state = {
            characters: [],
            characterSelections: [],
            monastery: undefined,
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handlePointChange = this.handlePointChange.bind(this);
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
                this.setState({
                    characters: characters,
                    characterSelections: characterSelections,
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
        return (
            <Row className={bem.b()}>
                <Col xs={3}>{this.createCharacters()}</Col>
                <Col className={bem.e("table")}>{this.getChapterTable()}</Col>
            </Row>
        );
    }

    createCharacters(): React.ReactElement {
        return (
            <Row>
                {this.state.characters.map((char, i) => (
                    <CharacterHeader
                        key={char._id}
                        name={char.name}
                        portraitUrl={char.portraitUrl}
                        points={this.state.characterSelections[i].points || 0}
                    />
                ))}
            </Row>
        );
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

    private getChapterTable() {
        if (
            this.state.monastery === undefined ||
            this.state.characters === undefined
        ) {
            return <div>Loading</div>;
        } else {
            return (
                <ChapterTable
                    characters={this.state.characters}
                    monastery={this.state.monastery}
                    onPointChange={this.handlePointChange}
                />
            );
        }
    }
}
