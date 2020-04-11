import * as React from "react";
import bemNames from "util/bemnames";
import "./ChapterTable.scss";
import { Col, Row } from "react-bootstrap";
import Chapter from "../Chapter/Chapter";
import { Character } from "data/types/schemas/characterSchema";

const bem = bemNames.create("ChapterTable");

type ChapterListProps = {
    characters: Character[];
};

export default class ChapterTable extends React.Component<ChapterListProps> {
    render() {
        return (
            <Row className={bem.b()}>
                <Col>
                    {this.props.characters.map((char) => {
                        return (
                            <Row key={char._id} className="flex-nowrap">
                                <Chapter character={char} />
                                <Chapter character={char} />
                                <Chapter character={char} />
                            </Row>
                        );
                    })}
                </Col>
            </Row>
        );
    }
}
