import * as React from "react";
import bemNames from "util/bemnames";
import "./Opportunity.scss";
import { Col, Image } from "react-bootstrap";

const bem = bemNames.create("Opportunity");

type OpportunityProps = {
    onSelect: () => void;
    imageUrl: string;
    imageTitle: string;
    count?: number;
};

type OpportunityState = {
    image: "";
};

export default class Opportunity extends React.Component<OpportunityProps, OpportunityState> {
    constructor(props: OpportunityProps, state: OpportunityState) {
        super(props);
        this.state = state;
    }

    componentDidMount(): void {
        import(`data/${this.props.imageUrl}`)
            .then((image) => {
                this.setState({
                    image: image.default,
                });
            })
            .catch((reason) => {
                this.setState({
                    image: "",
                });
            });
    }

    render() {
        return (
            <Col onClick={this.props.onSelect} className={bem.b("border")} xs={2}>
                {this.getContent()}
            </Col>
        );
    }

    getContent() {
        let title = this.props.imageTitle;
        let countDisplay = <></>;
        if (this.props.count !== undefined) {
            countDisplay = <span className={bem.e("count")}>{this.props.count}</span>;
        }
        return (
            <>
                <Image fluid src={this.state.image} title={title} alt={title} />
                {countDisplay}
            </>
        );
    }
}
