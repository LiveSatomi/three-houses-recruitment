import { Character } from "data/types/schemas/characterSchema";
import { Quest, RouteId } from "data/types/schemas/monasterySchema";
import * as React from "react";
import { Submenu } from "react-contexify";
import GiftItem from "../../OpportunityMenuItem/GiftMenuItem/GiftMenuItem";
import Occurrence from "data/types/Occurrence";
import Time from "data/types/Time";
import OccurrenceData from "data/types/OccurrenceData";
import QuestData from "data/types/QuestData";
import isEqual from "lodash/isEqual";

type QuestMenuProps = {
    character: Character;
    route: RouteId;
    chapter: number;
    event: number;
    quests: Quest[];
    onAddGift: (occurrence: Occurrence<OccurrenceData>) => void;
    selected: Occurrence<QuestData>[];
};

type QuestMenuState = {};

export default class QuestMenu extends React.Component<QuestMenuProps, QuestMenuState> {
    render() {
        return (
            <Submenu label={"Quests"}>
                {this.props.quests
                    .filter((quest) => {
                        return (
                            (this.props.route === "white-clouds" || this.props.route === quest.rewardFrom.route) &&
                            this.props.chapter >= quest.rewardFrom.chapter &&
                            this.props.event >= quest.rewardFrom.event
                        );
                    })
                    .filter((quest) => {
                        return !this.allSelected(quest);
                    })
                    .map((quest: Quest) => {
                        return (
                            <Submenu key={quest.id} label={quest.name}>
                                {this.getItems(quest)}
                            </Submenu>
                        );
                    })}
            </Submenu>
        );
    }

    getItems(quest: Quest) {
        return quest.rewards.map((gift) => {
            let questData = new QuestData(quest.id, gift);
            return (
                <GiftItem
                    key={questData.id}
                    sourceData={questData}
                    onAddGift={(occurrenceData) => {
                        this.props.onAddGift(
                            new Occurrence(
                                new Time(this.props.route, this.props.chapter, this.props.event),
                                occurrenceData,
                                [this.props.character._id]
                            )
                        );
                    }}
                />
            );
        });
    }

    allSelected(quest: Quest): boolean {
        return quest.rewards.every((gift) => {
            let questData = new QuestData(quest.id, gift);
            return this.props.selected.some((s) => {
                return isEqual(s.data, questData);
            });
        });
    }
}
