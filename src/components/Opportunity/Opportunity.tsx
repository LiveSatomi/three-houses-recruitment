import * as React from "react";
import bemNames from "util/bemnames";
import "./Opportunity.scss";
import { Col, Image } from "react-bootstrap";

const bem = bemNames.create("Opportunity");

type OpportunityProps = {
    onSelect: () => void;
    imageUrl: string;
    imageTitle: string;
    isSelected: boolean;
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
        let selectedMarker = <></>;
        if (this.props.isSelected) {
            selectedMarker = <span className={bem.e("selected")}>✓</span>;
        }
        return (
            <>
                <Image fluid src={this.state.image} title={title} alt={title} />
                {selectedMarker}
            </>
        );
    }
}
