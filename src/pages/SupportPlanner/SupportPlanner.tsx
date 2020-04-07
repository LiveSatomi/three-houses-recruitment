import * as React from "react";
import HouseSelector from "components/HouseSelector/HouseSelector";
import PageSelector from "components/PageSelector/PageSelector";
import CharacterTable from "../../components/CharacterTable/CharacterTable";
import { Container } from "react-bootstrap";

type SupportPlanningProps = {};

class SupportPlanner extends React.Component<SupportPlanningProps> {
    render() {
        return (
            <Container>
                <HouseSelector />
                <PageSelector />
                <CharacterTable />
            </Container>
        );
    }
}

export default SupportPlanner;
