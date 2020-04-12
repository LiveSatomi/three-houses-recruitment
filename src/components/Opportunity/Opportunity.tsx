import * as React from "react";
import bemNames from "util/bemnames";
import "./Opportunity.scss";
import { Col } from "react-bootstrap";
import { Gift } from "../../data/types/schemas/giftSchema";

const bem = bemNames.create("Opportunity");

type OpportunityProps = {
    gift?: Gift;
    giftId: string;
};

type OpportunityState = {
    image: string;
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
        let title =
            this.props.gift === undefined
                ? this.props.giftId
                : this.props.gift.name;
        return (
            <Col className={bem.b("border")} xs={2}>
                <img src={this.state.image} title={title} alt={title} />
            </Col>
        );
    }
}
