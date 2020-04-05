import * as React from "react";
import bemNames from "util/bemnames";
import "./ChapterTable.scss";
import { Col, Row } from "react-bootstrap";
import Chapter from "../Chapter/Chapter";

const bem = bemNames.create("ChapterTable");

export default class ChapterTable extends React.Component<ChapterListProps> {
    render() {
        return (
            <Row className={bem.b()}>
                <Col>
                    <Row className="flex-nowrap">
                        <Chapter />
                        <Chapter />
                        <Chapter />
                    </Row>
                    <Row className="flex-nowrap">
                        <Chapter />
                        <Chapter />
                        <Chapter />
                    </Row>
                    <Row className="flex-nowrap">
                        <Chapter />
                        <Chapter />
                        <Chapter />
                    </Row>
                </Col>
            </Row>
        );
    }
}

type ChapterListProps = {};
