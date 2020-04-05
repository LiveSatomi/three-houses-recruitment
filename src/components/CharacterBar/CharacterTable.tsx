import * as React from "react";
import bemNames from "util/bemnames";
import "./CharacterTable.scss";
import CharacterHeader from "../CharacterHeader/CharacterHeader";
import ChapterTable from "../ChapterList/ChapterTable";
import { Col, Row } from "react-bootstrap";

const bem = bemNames.create("CharacterTable");

export default class CharacterTable extends React.Component<
    CharacterTableProps
> {
    render() {
        return (
            <Row className={bem.b()}>
                <Col xs={3}>
                    <Row>
                        <CharacterHeader />

                        <CharacterHeader />

                        <CharacterHeader />
                    </Row>
                </Col>
                <Col className={bem.e("table")}>
                    <ChapterTable />
                </Col>
            </Row>
        );
    }
}

type CharacterTableProps = {};
