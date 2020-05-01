import * as React from "react";
import bemNames from "util/bemnames";
import "./CharacterHeader.scss";
import { Col, Image, Row } from "react-bootstrap";
import Occurrence from "../../data/types/Occurrence";
import OccurrenceData from "../../data/types/OccurrenceData";
import DefaultOccurrenceScaleUtil from "../../util/DefaultOccurrenceScaleUtil";
import { Character } from "../../data/types/schemas/characterSchema";

const bem = bemNames.create("CharacterHeader");

type CharacterHeaderProps = {
    anchor: number;
    character: Character;
    selectedOccurrences: Occurrence<OccurrenceData>[];
};

type CharacterHeaderState = {
    image: any;
    points: number;
};

export default class CharacterHeader extends React.Component<CharacterHeaderProps, CharacterHeaderState> {
    constructor(props: CharacterHeaderProps, state: CharacterHeaderState) {
        super(props);
        this.state = state;
    }

    componentDidMount(): void {
        import(`data/${this.props.character.portraitUrl}`).then((image) => {
            this.setState({
                image: image.default,
            });
        });
        this.getPoints();
    }

    componentDidUpdate(
        prevProps: Readonly<CharacterHeaderProps>,
        prevState: Readonly<CharacterHeaderState>,
        snapshot?: any
    ): void {
        this.getPoints();
    }
    getPoints() {
        new DefaultOccurrenceScaleUtil([])
            .calculate(
                this.props.character._id,
                this.props.selectedOccurrences.filter((o) => o.characters.includes(this.props.character._id))
            )
            .then((points) => {
                if (this.state.points !== points) {
                    this.setState({
                        points: points,
                    });
                }
            });
    }

    render() {
        return (
            <Col className={bem.b("col-4")} style={{ left: this.props.anchor }}>
                <Row className={"h-100"}>
                    <Col className={bem.e("portrait")}>
                        <Image fluid src={this.state.image} alt={this.props.character.name} />
                    </Col>
                    <Col className={bem.e("stats")}>
                        <div className={"border"}>
                            <span>{this.props.character.name}</span>
                        </div>
                        <div className={"border"}>
                            <span>C</span>
                        </div>
                        <div className={"border"}>
                            <span>{this.state.points}</span>
                        </div>
                    </Col>
                </Row>
            </Col>
        );
    }
}
