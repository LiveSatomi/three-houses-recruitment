import * as React from "react";
import bemNames from "util/bemnames";
import "./Chapter.scss";
import { Col, Row } from "react-bootstrap";
import { Character } from "data/types/schemas/characterSchema";
import { Monastery, RouteId } from "data/types/schemas/monasterySchema";
import GiftOpportunity from "components/Opportunity/GiftOpportunity/GiftOpportunity";
import AdditionalOpportunity from "components/Opportunity/AdditionalOpportunity/AdditionalOpportunity";
import GiftSource from "data/types/GiftSource";
import Database from "util/Database";
import GiftMatch from "data/types/GiftMatch";

const bem = bemNames.create("Chapter");

type ChapterProps = {
    character: Character;
    route: RouteId;
    chapterIndex: number;
    monastery: Monastery;
    onPointChange: (points: number, character: Character) => void;
};

type ChapterState = {
    shownOpportunities: GiftSource[];
    pointTotal: number;
};

export default class Chapter extends React.Component<ChapterProps, ChapterState> {
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
                    {this.state.shownOpportunities.map((gift: GiftSource, index) => {
                        return (
                            <GiftOpportunity
                                key={gift.gift + "+" + index}
                                gift={gift.gift}
                                character={this.props.character}
                                onWorthChanged={this.worthUpdated}
                            />
                        );
                    })}
                    <AdditionalOpportunity
                        key={"additional"}
                        character={this.props.character}
                        monastery={this.props.monastery}
                        route={this.props.route}
                        chapterIndex={this.props.chapterIndex}
                        onAddGift={this.addGift}
                        selectedGifts={this.state.shownOpportunities}
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
                this.props.onPointChange(this.state.pointTotal, this.props.character);
            }
        );
    }

    addGift(gift: GiftSource) {
        this.setState({
            shownOpportunities: [...this.state.shownOpportunities, gift],
        });
        new Database().addGiftMatch(new GiftMatch(gift, this.props.character._id));
    }
}
