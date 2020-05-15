import { Character } from "data/types/schemas/characterSchema";
import { RouteId } from "data/types/schemas/monasterySchema";
import * as React from "react";
import Database from "util/Database";
import { Item } from "react-contexify";
import Occurrence from "data/types/Occurrence";
import Time from "data/types/Time";
import OccurrenceData from "data/types/OccurrenceData";
import isEqual from "lodash/isEqual";
import CookingData from "data/types/CookingData";

type CookingMenuProps = {
    character: Character;
    route: RouteId;
    chapter: number;
    event: number;
    onAddOccurrence: (occurrenceData: Occurrence<OccurrenceData>) => void;
    selected: Occurrence<CookingData>[];
};

type CookingMenuState = {
    characters: Character[];
};

export default class CookingMenu extends React.Component<CookingMenuProps, CookingMenuState> {
    constructor(props: CookingMenuProps) {
        super(props);
        this.state = {
            characters: [],
        };
    }

    componentDidMount(): void {
        Database.getSingleton().then((database) => {
            return database.fetchCharacters().then((values: Character[]) => {
                return this.setState({
                    characters: values,
                });
            });
        });
    }

    render() {
        return (
            <Item
                disabled={this.isDisabled()}
                onClick={() => {
                    this.props.onAddOccurrence(
                        new Occurrence<OccurrenceData>(
                            new Time(this.props.route, this.props.chapter, this.props.event),
                            new CookingData(),
                            [this.props.character._id]
                        )
                    );
                }}
            >
                {"Cooking Together"}
            </Item>
        );
    }

    isDisabled() {
        return (
            this.props.selected.filter((s) =>
                isEqual(s.time, new Time(this.props.route, this.props.chapter, this.props.event))
            ).length > 0
        );
    }
}
