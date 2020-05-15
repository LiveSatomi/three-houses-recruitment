import { Character } from "data/types/schemas/characterSchema";
import { RouteId } from "data/types/schemas/monasterySchema";
import * as React from "react";
import Database from "util/Database";
import { Submenu } from "react-contexify";
import Occurrence from "data/types/Occurrence";
import Time from "data/types/Time";
import OccurrenceData from "data/types/OccurrenceData";
import CharacterMenuItem from "../../OpportunityMenuItem/CharacterMenuItem/CharacterMenuItem";
import isEqual from "lodash/isEqual";
import ChoirData from "data/types/ChoirData";

type ChoirMenuProps = {
    character: Character;
    route: RouteId;
    chapter: number;
    event: number;
    onAddOccurrence: (occurrenceData: Occurrence<OccurrenceData>) => void;
    selected: Occurrence<ChoirData>[];
};

type ChoirMenuState = {
    characters: Character[];
};

export default class ChoirMenu extends React.Component<ChoirMenuProps, ChoirMenuState> {
    constructor(props: ChoirMenuProps) {
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
        return <Submenu label={"Choir"}>{this.getItems()}</Submenu>;
    }

    getItems() {
        if (
            this.props.selected.filter((s) =>
                isEqual(s.time, new Time(this.props.route, this.props.chapter, this.props.event))
            ).length > 0
        ) {
            return this.state.characters
                .filter((character) => this.props.selected[0].characters.includes(character._id))
                .map((character) => <CharacterMenuItem key={character._id} character={character} />);
        } else {
            return this.state.characters
                .filter((character) => character._id !== this.props.character._id)
                .map((character: Character) => {
                    return (
                        <CharacterMenuItem
                            key={character._id}
                            character={character}
                            onSelectCharacter={(character) => {
                                this.props.onAddOccurrence(
                                    new Occurrence(
                                        new Time(this.props.route, this.props.chapter, this.props.event),
                                        new ChoirData(),
                                        [this.props.character._id, character._id]
                                    )
                                );
                            }}
                        />
                    );
                });
        }
    }
}
