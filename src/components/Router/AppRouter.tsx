import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SupportPlanner from "../../pages/SupportPlanner/SupportPlanner";
import React from "react";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <SupportPlanner />
                </Route>
                <Route path="/about">
                    <div>
                        <p>test about</p>
                    </div>
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;
