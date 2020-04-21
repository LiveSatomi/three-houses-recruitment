import * as React from "react";
import bemNames from "util/bemnames";
import "./Chapter.scss";
import { Col, Row } from "react-bootstrap";
import { Character } from "data/types/schemas/characterSchema";
import Database from "util/Database";
import PouchDB from "pouchdb";
import Assertions from "util/Assertions";
import { Gift, GiftId } from "data/types/schemas/giftSchema";
import { Chapter, Monastery } from "data/types/schemas/monasterySchema";
import GiftOpportunity from "../Opportunity/GiftOpportunity/GiftOpportunity";
import AdditionalOpportunity from "../Opportunity/AdditionalOpportunity/AdditionalOpportunity";

const bem = bemNames.create("Chapter");

type ChapterProps = {
    character: Character;
    chapter: Chapter;
    monastery: Monastery;
    onPointChange: (points: number, character: Character) => void;
};

type ChapterState = {
    shownOpportunities: Gift[];
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
            shownOpportunities: [],
        };

        this.worthUpdated = this.worthUpdated.bind(this);
        this.addGift = this.addGift.bind(this);
    }

    render() {
        return (
            <Col className={bem.b("border")} xs={6}>
                <Row>
                    {this.state.shownOpportunities.map((gift: Gift, index) => {
                        return (
                            <GiftOpportunity
                                key={gift._id + "+" + index}
                                gift={gift}
                                character={this.props.character}
                                onWorthChanged={this.worthUpdated}
                            />
                        );
                    })}
                    <AdditionalOpportunity
                        key={"additional"}
                        character={this.props.character}
                        monastery={this.props.monastery}
                        onAddGift={this.addGift}
                    />
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

    addGift(gift: Gift) {
        this.setState({
            shownOpportunities: [...this.state.shownOpportunities, gift],
        });
    }
}
