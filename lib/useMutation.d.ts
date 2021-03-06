import { DataProxy } from 'apollo-cache';
import { MutationOptions, OperationVariables } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { FetchResult, Omit } from './utils';
export declare type MutationUpdaterFn<TData = Record<string, any>> = (proxy: DataProxy, mutationResult: FetchResult<TData>) => void;
export interface MutationHookOptions<TData, TVariables> extends Omit<MutationOptions<TData, TVariables>, 'mutation' | 'update'> {
    update?: MutationUpdaterFn<TData>;
}
export declare type MutationFn<TData, TVariables> = (options?: MutationHookOptions<TData, TVariables>) => Promise<FetchResult<TData>>;
export declare function useMutation<TData, TVariables = OperationVariables>(mutation: DocumentNode, baseOptions?: MutationHookOptions<TData, TVariables>): MutationFn<TData, TVariables>;
