import * as React from "react";
import bemNames from "util/bemnames";
import "./ChapterTable.scss";
import { Col, Row } from "react-bootstrap";
import Chapter from "../Chapter/Chapter";
import { Character } from "data/types/schemas/characterSchema";

const bem = bemNames.create("ChapterTable");

type ChapterTableProps = {
    characters: Character[];
    onPointChange: (points: number, character: Character) => void;
};

export default class ChapterTable extends React.Component<ChapterTableProps> {
    constructor(props: ChapterTableProps) {
        super(props);
        this.handlePointChange = this.handlePointChange.bind(this);
    }

    render() {
        return (
            <Row className={bem.b()}>
                <Col>
                    {this.props.characters.map((char) => {
                        return (
                            <Row key={char._id} className="flex-nowrap">
                                <Chapter
                                    character={char}
                                    onPointChange={this.handlePointChange}
                                />
                                <Chapter
                                    character={char}
                                    onPointChange={this.handlePointChange}
                                />
                                <Chapter
                                    character={char}
                                    onPointChange={this.handlePointChange}
                                />
                            </Row>
                        );
                    })}
                </Col>
            </Row>
        );
    }

    handlePointChange(points: number, character: Character) {
        this.props.onPointChange(points, character);
    }
}
