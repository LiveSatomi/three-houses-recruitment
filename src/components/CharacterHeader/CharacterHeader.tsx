import * as React from "react";
import bemNames from "util/bemnames";
import "./CharacterHeader.scss";
import { Image, Col, Row } from "react-bootstrap";

const bem = bemNames.create("CharacterHeader");

type CharacterHeaderProps = {
    anchor: number;
    name: string;
    portraitUrl: string;
    points: number;
};

type CharacterHeaderState = {
    image: any;
};

export default class CharacterHeader extends React.Component<CharacterHeaderProps, CharacterHeaderState> {
    constructor(props: CharacterHeaderProps, state: CharacterHeaderState) {
        super(props);
        this.state = state;
    }

    componentDidMount(): void {
        import(`data/${this.props.portraitUrl}`).then((image) => {
            this.setState({
                image: image.default,
            });
        });
        return;
    }

    render() {
        return (
            <Col className={bem.b("col-4")} style={{ left: this.props.anchor }}>
                <Row className={"h-100"}>
                    <Col className={bem.e("portrait")}>
                        <Image fluid src={this.state.image} alt={this.props.name} />
                    </Col>
                    <Col className={bem.e("stats")}>
                        <div className={"border"}>
                            <span>{this.props.name}</span>
                        </div>
                        <div className={"border"}>
                            <span>C</span>
                        </div>
                        <div className={"border"}>
                            <span>{this.props.points}</span>
                        </div>
                    </Col>
                </Row>
            </Col>
        );
    }
}
