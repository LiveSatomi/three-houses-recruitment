import * as React from "react";
import HouseSelector from "components/HouseSelector/HouseSelector";
import PageSelector from "components/PageSelector/PageSelector";

type SupportPlanningProps = {};

class SupportPlanner extends React.Component<SupportPlanningProps> {
    render() {
        return (
            <div>
                <HouseSelector />
                <PageSelector />
                <div>
                    <p>Character 1</p>
                </div>
                <div>
                    <p>Character 2</p>
                </div>
            </div>
        );
    }
}

export default SupportPlanner;
