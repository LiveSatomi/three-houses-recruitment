import * as React from "react";
import bemNames from "util/bemnames";
import "./Opportunity.scss";
import { Col } from "react-bootstrap";
import { Gift } from "../../data/types/schemas/giftSchema";

const bem = bemNames.create("Opportunity");

type OpportunityProps = {
    gift?: Gift;
    giftId: string;
    onSelected: (selected: boolean) => void;
};

type OpportunityState = {
    image: string;
    selected: boolean;
};

export default class Opportunity extends React.Component<
    OpportunityProps,
    OpportunityState
> {
    constructor(props: OpportunityProps, state: OpportunityState) {
        super(props);
        this.state = state;

        this.opportunitySelected = this.opportunitySelected.bind(this);
    }

    componentDidMount(): void {
        if (this.props.gift === undefined) {
            this.setState({
                image:
                    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\n",
            });
        } else {
            import(`data/${this.props.gift.imageUrl}`).then((image) => {
                this.setState({
                    image: image.default,
                });
            });
        }
        return;
    }

    render() {
        return (
            <Col className={bem.b("border")} xs={2}>
                {this.getChildren()}
            </Col>
        );
    }

    getChildren() {
        let title =
            this.props.gift === undefined
                ? this.props.giftId
                : this.props.gift.name;
        let selectedMarker = <></>;
        if (this.state.selected) {
            selectedMarker = <span className={bem.e("selected")}>✓</span>;
        }
        return (
            <>
                <img
                    src={this.state.image}
                    title={title}
                    alt={title}
                    onClick={this.opportunitySelected}
                />
                {selectedMarker}
            </>
        );
    }

    opportunitySelected() {
        this.setState(
            {
                selected: !this.state.selected,
            },
            () => {
                this.props.onSelected(this.state.selected);
            }
        );
    }
}
