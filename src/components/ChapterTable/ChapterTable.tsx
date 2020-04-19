import * as React from "react";
import bemNames from "util/bemnames";
import "./ChapterTable.scss";
import { Col, Row } from "react-bootstrap";
import ChapterView from "components/Chapter/ChapterView";
import { Character } from "data/types/schemas/characterSchema";
import { Chapter, Monastery } from "data/types/schemas/monasterySchema";

const bem = bemNames.create("ChapterTable");

type ChapterTableProps = {
    characters: Character[];
    monastery: Monastery;
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
                                {this.props.monastery.routes
                                    .find((route) => {
                                        return route.id === "white-clouds";
                                    })
                                    ?.chapters.map(
                                        (chapter: Chapter, index) => {
                                            return (
                                                <ChapterView
                                                    key={
                                                        char._id +
                                                        "_white-clouds_" +
                                                        index
                                                    }
                                                    character={char}
                                                    chapter={chapter}
                                                    onPointChange={
                                                        this.handlePointChange
                                                    }
                                                />
                                            );
                                        }
                                    )}
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
