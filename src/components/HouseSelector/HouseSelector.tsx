import * as React from "react";
import bemNames from "util/bemnames";
import "./HouseSelector.scss";
import { Col, Row } from "react-bootstrap";

const bem = bemNames.create("HouseSelector");

export default class HouseSelector extends React.Component<HouseSelectorProps> {
    render() {
        return (
            <Row className={bem.b()}>
                <Col className={bem.e("azure-moon")}>
                    <span>Azure Moon</span>
                </Col>
                <Col className={bem.e("crimson-flower")}>
                    <span>Crimson Flower</span>
                </Col>
                <Col className={bem.e("silver-snow")}>
                    <span>Silver Snow</span>
                </Col>
                <Col className={bem.e("verdant-wind")}>
                    <span>Verdant Wind</span>
                </Col>
            </Row>
        );
    }
}

type HouseSelectorProps = {};
