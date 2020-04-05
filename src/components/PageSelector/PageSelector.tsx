import * as React from "react";
import bemNames from "util/bemnames";
import "./PageSelector.scss";
import { Col, Row } from "react-bootstrap";

const bem = bemNames.create("PageSelector");

export default class PageSelector extends React.Component<PageSelectorProps> {
    render() {
        return (
            <Row className={bem.b()}>
                <Col className={bem.e("button")}>
                    <a href={"/"}>
                        <span>Support Planner</span>
                    </a>
                </Col>

                <Col className={bem.e("button")}>
                    <a href={"/about"}>
                        <span>Recruitment Tracker</span>
                    </a>
                </Col>
            </Row>
        );
    }
}

type PageSelectorProps = {};
