import { gql, useMutation, useQuery } from '@apollo/client';
import { Query, Mutation } from "../parser";

let apolloClient = null;
/**
 * A Base Data Service class represents all services in the client side to fetch data using graphql.
 * */
export default class BaseService {
    
    static setApolloClient(client) {
        apolloClient = client;
    }

    static async query(params, queryName, fields) {
        const queryToExecute = Query[queryName](params).body(fields);
        let values = {};
        if (params instanceof Array) {
            params.forEach(field => {
                values[field.name] = field.value;
            })
        } else {
            values = params;
        }
        return await apolloClient.query({
            query: queryToExecute,
            variables: values, fetchPolicy: "cache-first",   // Used for first execution
            nextFetchPolicy: "cache-first"
        });
    }

    static useQuery(params, queryName, fields) {
        const queryToExecute = Query[queryName](params).body(fields);
        let values = {};
        if (params instanceof Array) {
            params.forEach(field => {
                values[field.name] = field.value;
            })
        } else {
            values = params;
        }
        return useQuery(queryToExecute, {
            variables: values, fetchPolicy: "cache-first",   // Used for first execution
            nextFetchPolicy: "cache-first"
        });
    }

    static async mutation(params, queryName, fields) {
        const queryToExecute = Mutation[queryName](params).body(fields);
        let values = {};
        if (params instanceof Array) {
            params.forEach(field => {
                values[field.name] = field.value;
            })
        } else {
            values = params;
        }
        return await apolloClient.mutate({ mutation: queryToExecute, variables: values });
    }

    static useMutation(params, queryName, fields) {
        ;
        const queryToExecute = Mutation[queryName](params).body(fields);
        let values = {};
        if (params instanceof Array) {
            params.forEach(field => {
                values[field.name] = field.value;
            })
        } else {
            values = params;
        }
        return useMutation(queryToExecute, { variables: values });
    }

    static executeUseQuery(queryStr) {
        ;
        const queryToExecute = gql`${queryStr}`;
        return useQuery(queryToExecute, {
            fetchPolicy: "network-only",   // Used for first execution
            nextFetchPolicy: "cache-first"
        });
    }

    static async executeQuery(queryStr) {
        const queryToExecute = gql`${queryStr}`;
        return await apolloClient.query({
            query: queryToExecute,
            fetchPolicy: "network-only",   // Used for first execution
            nextFetchPolicy: "cache-first"
        });
    }

    static async executeQueryWithVariables(queryStr, variables = {}) {
        ;
        return await apolloClient.query({
            query: queryStr,
            variables: variables,
            fetchPolicy: "network-only",   // Used for first execution
            nextFetchPolicy: "cache-first"
        });
    }

    static async executeMutationWithVariables(queryStr, variables = {}) {
        ;
        return await apolloClient.mutate({
            mutation: queryStr,
            variables: variables
        });
    }

}

