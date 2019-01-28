import * as React from 'react';
export interface GetMarkupFromTreeOptions {
    tree: React.ReactNode;
    renderFunction: (tree: React.ReactElement<object>) => string;
}
export declare function getMarkupFromTree({ tree, renderFunction, }: GetMarkupFromTreeOptions): Promise<string>;
