import * as React from "react";
import "./AdditionalOpportunity.scss";
import { Character } from "data/types/schemas/characterSchema";
import Opportunity from "../Opportunity";
import { Monastery } from "data/types/schemas/monasterySchema";
import { Gift } from "data/types/schemas/giftSchema";
import Database from "util/Database";
import PouchDB from "pouchdb";
import Assertions from "util/Assertions";

type AdditionalOpportunityProps = {
    character: Character;
    monastery: Monastery;
    onAddGift: (gift: Gift) => void;
};

type AdditionalOpportunityState = {
    possibleOpportunities: Gift[];
};

export default class AdditionalOpportunity extends React.Component<
    AdditionalOpportunityProps,
    AdditionalOpportunityState
> {
    constructor(
        props: AdditionalOpportunityProps,
        state: AdditionalOpportunityState
    ) {
        super(props);
        this.state = state;

        this.showAddMenu = this.showAddMenu.bind(this);
    }

    componentDidMount(): void {
        let database = new Database();
        database
            .initialize()
            .then(() => {
                return database.fetchGifts();
            })
            .then((fetch: PouchDB.Core.AllDocsResponse<Gift>) => {
                this.setState({
                    possibleOpportunities: fetch.rows.map((r) => {
                        let doc = r.doc;
                        Assertions.isDefined(
                            doc,
                            "Fetch must contain document"
                        );
                        return doc;
                    }),
                });
            });
    }

    render() {
        return (
            <Opportunity
                onClick={this.showAddMenu}
                imageUrl={"misc/additional.png"}
                imageTitle={"Add Support"}
                isSelected={false}
            />
        );
    }

    showAddMenu() {
        let treat = this.state.possibleOpportunities.find(
            (e) => e._id === "tasty-baked-treat"
        );
        Assertions.isDefined(treat, "tasty-baked-treat does not exist");
        this.props.onAddGift(treat);
    }
}
