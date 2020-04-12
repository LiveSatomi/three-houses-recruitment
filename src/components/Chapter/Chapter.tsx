import * as React from "react";
import bemNames from "util/bemnames";
import "./Chapter.scss";
import { Col, Row } from "react-bootstrap";
import { Character } from "data/types/schemas/characterSchema";
import Database from "../../util/Database";
import PouchDB from "pouchdb";
import Assertions from "../../util/Assertions";
import { Gift } from "../../data/types/schemas/giftSchema";
import Opportunity from "../Opportunity/Opportunity";

const bem = bemNames.create("Chapter");

type ChapterProps = {
    character: Character;
};

type ChapterState = {
    gifts: Gift[];
};

export default class Chapter extends React.Component<
    ChapterProps,
    ChapterState
> {
    constructor(props: ChapterProps) {
        super(props);
        this.state = {
            gifts: [],
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(): void {
        let database = new Database();
        database
            .initialize()
            .then(() => {
                return database.fetchGifts();
            })
            .then((fetch: PouchDB.Core.AllDocsResponse<Gift>) => {
                this.setState({
                    gifts: fetch.rows.map((r) => {
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
            <Col className={bem.b("border")} xs={6}>
                <Row>
                    {this.props.character.gifts.map((gift) => {
                        let giftForCharacter = this.state.gifts.filter(
                            (value: Gift) => {
                                return value._id === gift;
                            }
                        )[0];
                        if (this.state.gifts.length === 0) {
                            return <span key={gift}>Loading</span>;
                        } else {
                            return (
                                <Opportunity
                                    key={gift}
                                    giftId={gift}
                                    gift={giftForCharacter}
                                />
                            );
                        }
                    })}
                </Row>
            </Col>
        );
    }
}
