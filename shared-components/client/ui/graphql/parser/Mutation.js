import Builder from "./Builder.js";

const Mutation = new Proxy({}, {
    get(_, query) {
        return (params) => {
            return new Builder(query, "mutation", params)
        }
    }
});
export { Mutation };