import * as React from "react";
import bemNames from "util/bemnames";
import "./CharacterTable.scss";
import CharacterHeader from "../CharacterHeader/CharacterHeader";
import ChapterTable from "../ChapterTable/ChapterTable";
import { Col, Row } from "react-bootstrap";
import Database from "../../util/Database";
import PouchDB from "pouchdb";
import { Character } from "../../data/types/schemas/characterSchema";
import Assertions from "../../util/Assertions";

const bem = bemNames.create("CharacterTable");

type CharacterTableProps = {};

type CharacterTableState = {
    characters: Character[];
};

export default class CharacterTable extends React.Component<
    CharacterTableProps,
    CharacterTableState
> {
    constructor(props: CharacterTableProps) {
        super(props);
        this.state = {
            characters: [],
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(): void {
        let database = new Database();
        database
            .initialize()
            .then(() => {
                return database.fetchCharacters();
            })
            .then((fetch: PouchDB.Core.AllDocsResponse<Character>) => {
                this.setState({
                    characters: fetch.rows.map((r) => {
                        let doc = r.doc;
                        Assertions.isDefined(
                            doc,
                            "Fetch must contain document"
                        );
                        return doc;
                    }),
                });
            });
    }

    render() {
        return (
            <Row className={bem.b()}>
                <Col xs={3}>{this.createCharacters()}</Col>
                <Col className={bem.e("table")}>
                    <ChapterTable characters={this.state.characters} />
                </Col>
            </Row>
        );
    }

    createCharacters(): React.ReactElement {
        return (
            <Row>
                {this.state.characters.map((char) => (
                    <CharacterHeader
                        name={char.name}
                        portraitUrl={char.portraitUrl}
                        key={char._id}
                    />
                ))}
            </Row>
        );
    }
}
