import * as React from "react";
import bemNames from "util/bemnames";
import "./Chapter.scss";
import { Col, Row } from "react-bootstrap";
import additional from "icons/additional.png";

const bem = bemNames.create("Chapter");

export default class Chapter extends React.Component<ChapterProps> {
    render() {
        return (
            <Col className={bem.b("border")} xs={6}>
                <Row>
                    <Col className={bem.e("opportunity")} xs={1}>
                        <img src={additional} alt={"additional"} />
                    </Col>

                    <Col className={bem.e("opportunity")} xs={1}>
                        <img src={additional} alt={"additional"} />
                    </Col>

                    <Col className={bem.e("opportunity")} xs={1}>
                        <img src={additional} alt={"additional"} />
                    </Col>
                </Row>
            </Col>
        );
    }
}

type ChapterProps = {};
