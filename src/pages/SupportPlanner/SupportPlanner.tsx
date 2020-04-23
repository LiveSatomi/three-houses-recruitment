import * as React from "react";
import HouseSelector from "components/HouseSelector/HouseSelector";
import PageSelector from "components/PageSelector/PageSelector";
import PlannerTable from "components/PlannerTable/PlannerTable";
import { Container } from "react-bootstrap";

type SupportPlanningProps = {};

class SupportPlanner extends React.Component<SupportPlanningProps> {
    render() {
        return (
            <Container>
                <HouseSelector />
                <PageSelector />
                <PlannerTable />
            </Container>
        );
    }
}

export default SupportPlanner;
