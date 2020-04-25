import classNames from "classnames";
import { ClassValue } from "classnames/types";

const createBEM = (namespace: string) => {
    return {
        create: (blockName: string) => {
            let block = blockName;

            block = `${namespace}-${blockName}`;

            return {
                b: (...more: ClassValue[]) => {
                    return classNames(block, more);
                },
                e: (className: ClassValue, ...more: ClassValue[]) => {
                    return classNames(`${block}__${className}`, more);
                },
                m: (className: ClassValue, ...more: ClassValue[]) => {
                    return classNames(`${block}--${className}`, more);
                },
                em: (className: ClassValue, modifierName: ClassValue, ...more: ClassValue[]) => {
                    return classNames(`${block}__${className}--${modifierName}`, more);
                },
            };
        },
    };
};

const bemNames = createBEM("jm");

export default bemNames;
