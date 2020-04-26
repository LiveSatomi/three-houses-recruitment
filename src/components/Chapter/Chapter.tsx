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
import GiftMenuItem from "../GiftMenuItem/GiftMenuItem";

const bem = bemNames.create("Chapter");

type ChapterProps = {
    character: Character;
    route: RouteId;
    chapterIndex: number;
    monastery: Monastery;
    onMatchGift: (gift: GiftMatch) => void;
    selectedOpportunities: GiftMatch[];
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

        this.addGift = this.addGift.bind(this);
    }

    render() {
        return (
            <Col className={bem.b("border")} xs={6}>
                <Row>
                    {this.props.selectedOpportunities
                        .filter(
                            (match) =>
                                match.character === this.props.character._id &&
                                match.giftSource.route === this.props.route &&
                                match.giftSource.chapter === this.props.chapterIndex
                        )
                        .map((gift: GiftMatch, index) => {
                            return (
                                <GiftOpportunity
                                    key={gift.giftSource.gift + "+" + index}
                                    gift={gift.giftSource.gift}
                                    character={this.props.character}
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
                        selectedGifts={this.props.selectedOpportunities.map((match) => match.giftSource)}
                    />
                </Row>
            </Col>
        );
    }

    addGift(gift: GiftSource) {
        this.props.onMatchGift(new GiftMatch(gift, this.props.character._id));
    }
}
