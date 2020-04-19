import * as React from "react";
import bemNames from "util/bemnames";
import "./Chapter.scss";
import { Col, Row } from "react-bootstrap";
import { Character } from "data/types/schemas/characterSchema";
import Database from "util/Database";
import PouchDB from "pouchdb";
import Assertions from "util/Assertions";
import { Gift, GiftId } from "data/types/schemas/giftSchema";
import { Chapter } from "data/types/schemas/monasterySchema";
import GiftOpportunity from "../Opportunity/GiftOpportunity/GiftOpportunity";

const bem = bemNames.create("Chapter");

type ChapterProps = {
    character: Character;
    chapter: Chapter;
    onPointChange: (points: number, character: Character) => void;
};

type ChapterState = {
    gifts: Gift[];
    pointTotal: number;
};

export default class ChapterView extends React.Component<
    ChapterProps,
    ChapterState
> {
    constructor(props: ChapterProps) {
        super(props);
        this.state = {
            pointTotal: 0,
            gifts: [],
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.worthUpdated = this.worthUpdated.bind(this);
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
                    {this.props.character.gifts.map((giftId: GiftId) => {
                        let giftForCharacter: Gift = this.state.gifts.filter(
                            (value: Gift) => {
                                return value._id === giftId;
                            }
                        )[0];
                        if (this.state.gifts.length === 0) {
                            return <span key={giftId}>Loading</span>;
                        } else {
                            return (
                                <GiftOpportunity
                                    key={giftId}
                                    gift={giftForCharacter}
                                    character={this.props.character}
                                    onWorthChanged={this.worthUpdated}
                                />
                            );
                        }
                    })}
                </Row>
            </Col>
        );
    }

    worthUpdated(worth: number) {
        this.setState(
            {
                pointTotal: this.state.pointTotal + worth,
            },
            () => {
                this.props.onPointChange(
                    this.state.pointTotal,
                    this.props.character
                );
            }
        );
    }
}
