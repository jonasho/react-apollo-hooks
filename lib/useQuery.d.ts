import { ApolloCurrentResult, ApolloQueryResult, FetchMoreOptions, FetchMoreQueryOptions, ObservableQuery, OperationVariables, QueryOptions } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { Omit } from './utils';
export interface QueryHookState<TData> extends Pick<ApolloCurrentResult<undefined | TData>, 'error' | 'errors' | 'loading' | 'networkStatus' | 'partial'> {
    data?: TData;
    status: {
        initialLoading: boolean;
        activelyRefetching: boolean;
        passivelyRefetching: boolean;
        fetchingMore: boolean;
        error: boolean;
    };
}
export interface QueryHookOptions<TVariables> extends Omit<QueryOptions<TVariables>, 'query'> {
    notifyOnNetworkStatusChange?: boolean;
    pollInterval?: number;
    ssr?: boolean;
    skip?: boolean;
    suspend?: boolean;
}
export interface QueryHookResult<TData, TVariables> extends QueryHookState<TData>, Pick<ObservableQuery<TData, TVariables>, 'refetch' | 'startPolling' | 'stopPolling' | 'updateQuery'> {
    fetchMore<K extends keyof TVariables>(fetchMoreOptions: FetchMoreQueryOptions<TVariables, K> & FetchMoreOptions<TData, TVariables>): Promise<ApolloQueryResult<TData>>;
}
export declare function useQuery<TData = any, TVariables = OperationVariables>(query: DocumentNode, { ssr, skip, suspend, pollInterval, notifyOnNetworkStatusChange, context, metadata, variables, fetchPolicy: actualCachePolicy, errorPolicy, fetchResults, }?: QueryHookOptions<TVariables>): QueryHookResult<TData, TVariables>;
