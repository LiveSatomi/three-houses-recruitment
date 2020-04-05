import * as React from "react";
import bemNames from "util/bemnames";
import "./HouseSelector.scss";

const bem = bemNames.create("HouseSelector");

export default class HouseSelector extends React.Component<HouseSelectorProps> {
    render() {
        return (
            <div className={bem.b()}>
                <div className={bem.e("azure-moon")}>
                    <p>Azure Moon</p>
                </div>
                <div className={bem.e("crimson-flower")}>
                    <p>Crimson Flower</p>
                </div>
                <div className={bem.e("silver-snow")}>
                    <p>Silver Snow</p>
                </div>
                <div className={bem.e("verdant-wind")}>
                    <p>Verdant Wind</p>
                </div>
            </div>
        );
    }
}

type HouseSelectorProps = {};
