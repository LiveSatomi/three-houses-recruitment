import * as React from "react";
import bemNames from "util/bemnames";
import "./PageSelector.scss";

const bem = bemNames.create("PageSelector");

export default class PageSelector extends React.Component<PageSelectorProps> {
    render() {
        return (
            <div className={bem.b()}>
                <a href={"/"}>
                    <div>
                        <p>Support Planner</p>
                    </div>
                </a>
                <a href={"/about"}>
                    <div>
                        <p>Recruitment Tracker</p>
                    </div>
                </a>
            </div>
        );
    }
}

type PageSelectorProps = {};
