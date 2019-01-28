import { ExecutionResult } from 'graphql/execution/execute';
import isPlainObject from 'lodash.isplainobject';

export declare type FetchResult<
  TData,
  C = Record<string, any>,
  E = Record<string, any>
> = ExecutionResult<TData> & {
  extensions?: E;
  context?: C;
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function objToKey<T extends Record<string, any>>(obj: T): T | string {
  if (!isPlainObject(obj)) {
    return obj;
  }
  const sortedObj = Object.keys(obj)
    .sort()
    .reduce((result: Record<string, any>, key) => {
      result[key] = objToKey(obj[key]);
      return result;
    }, {});
  return JSON.stringify(sortedObj);
}

export function isPromiseLike<T>(value: unknown): value is PromiseLike<T> {
  return value != null && typeof (value as PromiseLike<T>).then === 'function';
}
