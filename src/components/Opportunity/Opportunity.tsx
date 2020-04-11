import * as React from "react";
import bemNames from "util/bemnames";
import "./Opportunity.scss";
import { Col } from "react-bootstrap";
import { Gift } from "../../data/types/schemas/giftSchema";

const bem = bemNames.create("Opportunity");

type OpportunityProps = {
    gift: Gift;
};

type OpportunityState = {
    image: any;
};

export default class Opportunity extends React.Component<
    OpportunityProps,
    OpportunityState
> {
    constructor(props: OpportunityProps, state: OpportunityState) {
        super(props);
        this.state = state;
    }

    componentDidMount(): void {
        import(`data/${this.props.gift.imageUrl}`).then((image) => {
            this.setState({
                image: image.default,
            });
        });
        return;
    }

    render() {
        return (
            <Col className={bem.b("opportunity")} xs={2}>
                <img src={this.state.image} alt={this.props.gift.name} />
            </Col>
        );
    }
}
