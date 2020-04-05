import * as React from "react";
import bemNames from "util/bemnames";
import "./CharacterHeader.scss";
import { Col, Row } from "react-bootstrap";
import additional from "../../icons/additional.png";

const bem = bemNames.create("CharacterHeader");

export default class CharacterHeader extends React.Component<
    CharacterHeaderProps
> {
    render() {
        return (
            <Col className={bem.b("col-12")}>
                <Row className={"h-100"}>
                    <Col className={bem.e("portrait")}>
                        <img src={additional} alt={"additional"} />
                    </Col>
                    <Col className={bem.e("stats")}>
                        <div className={"border"}>
                            <span>C</span>
                        </div>
                        <div className={"border"}>
                            <span>0</span>
                        </div>
                    </Col>
                </Row>
            </Col>
        );
    }
}

type CharacterHeaderProps = {};
