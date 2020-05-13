import * as React from "react";
import { Item } from "react-contexify";
import { Character } from "data/types/schemas/characterSchema";

type CharacterMenuItemProps = {
    character: Character;
    onSelectCharacter?: (character: Character) => void;
};

type CharacterMenuItemState = {
    image: string;
};

export default class CharacterMenuItem extends React.Component<CharacterMenuItemProps, CharacterMenuItemState> {
    constructor(props: CharacterMenuItemProps, state: CharacterMenuItemState) {
        super(props);
        this.state = state;
        this.handleSelectCharacter = this.handleSelectCharacter.bind(this);
    }

    componentDidMount(): void {
        // TODO import portrait
    }

    render() {
        return (
            <Item disabled={this.props.onSelectCharacter === undefined} onClick={this.handleSelectCharacter}>
                {this.props.character.name}
            </Item>
        );
    }

    handleSelectCharacter() {
        this.props.onSelectCharacter!(this.props.character);
    }
}
