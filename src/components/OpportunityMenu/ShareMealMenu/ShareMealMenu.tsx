import { Character, CharacterId } from "data/types/schemas/characterSchema";
import { RouteId } from "data/types/schemas/monasterySchema";
import * as React from "react";
import Database from "util/Database";
import { Item, Submenu } from "react-contexify";
import Occurrence from "data/types/Occurrence";
import Time from "data/types/Time";
import OccurrenceData from "data/types/OccurrenceData";
import CharacterMenuItem from "components/OpportunityMenuItem/CharacterMenuItem/CharacterMenuItem";
import isEqual from "lodash/isEqual";
import ShareMealData from "data/types/ShareMealData";
import { Meal, MealId } from "data/types/schemas/mealSchema";

type ShareMealMenuProps = {
    character: Character;
    route: RouteId;
    chapter: number;
    event: number;
    onAddOccurrence: (occurrenceData: Occurrence<OccurrenceData>) => void;
    selected: Occurrence<ShareMealData>[];
};

type ShareMealMenuState = {
    characters: Character[];
    meals: Meal[];
};

export default class ShareMealMenu extends React.Component<ShareMealMenuProps, ShareMealMenuState> {
    constructor(props: ShareMealMenuProps) {
        super(props);
        this.state = {
            characters: [],
            meals: [],
        };

        this.onSelectMeal = this.onSelectMeal.bind(this);
    }

    componentDidMount(): void {
        Database.getSingleton().then((database) => {
            let promise = Promise.all([database.fetchCharacters(), database.fetchMeals()]);
            return promise.then(([characters, meals]) => {
                characters = characters as Character[];
                meals = meals as Meal[];
                return this.setState({
                    characters: characters,
                    meals: meals,
                });
            });
        });
    }

    render() {
        return <Submenu label={"Share a Meal"}>{this.getItems()}</Submenu>;
    }

    getItems() {
        let existing = this.props.selected.filter(
            (s) =>
                isEqual(s.time, new Time(this.props.route, this.props.chapter, this.props.event)) &&
                s.characters.includes(this.props.character._id)
        );
        if (existing.length > 0) {
            return existing[0].characters
                .filter((c) => c !== this.props.character._id)
                .map((character) => {
                    let partner = this.state.characters.find((c) => {
                        return c._id === character;
                    });
                    if (partner === undefined) {
                        return (
                            <Item key={character} disabled>
                                <span>character</span>
                            </Item>
                        );
                    } else {
                        return <CharacterMenuItem key={character} character={partner} />;
                    }
                });
        } else {
            return this.state.characters
                .filter(
                    (character) =>
                        character._id !== this.props.character._id &&
                        !this.props.selected.some((s) => s.characters.includes(character._id))
                )
                .map((character: Character) => {
                    return (
                        <Submenu key={character._id} label={character.name}>
                            {this.state.meals.map((meal) => {
                                return (
                                    <Item
                                        key={meal._id}
                                        onClick={() => {
                                            this.onSelectMeal(character._id, meal._id);
                                        }}
                                    >
                                        <span>{meal.name}</span>
                                    </Item>
                                );
                            })}
                        </Submenu>
                    );
                });
        }
    }

    onSelectMeal(character: CharacterId, meal: MealId) {
        this.props.onAddOccurrence(
            new Occurrence(new Time(this.props.route, this.props.chapter, this.props.event), new ShareMealData(meal), [
                this.props.character._id,
                character,
            ])
        );
    }
}
