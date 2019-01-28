import * as React from 'react';
import { SSRContext, createSSRManager } from './internal/SSRContext';
import { isPromiseLike } from './utils';

export interface GetMarkupFromTreeOptions {
  tree: React.ReactNode;
  renderFunction: (tree: React.ReactElement<object>) => string;
}

export function getMarkupFromTree({
  tree,
  renderFunction,
}: GetMarkupFromTreeOptions): Promise<string> {
  const ssrManager = createSSRManager();

  function process(): string | Promise<string> {
    try {
      const html = renderFunction(
        <SSRContext.Provider value={ssrManager}>{tree}</SSRContext.Provider>
      );

      if (!ssrManager.hasPromises()) {
        return html;
      }
    } catch (e) {
      if (!isPromiseLike(e)) {
        throw e;
      }

      ssrManager.register(e);
    }

    return ssrManager.consumeAndAwaitPromises().then(process);
  }

  return Promise.resolve().then(process);
}
