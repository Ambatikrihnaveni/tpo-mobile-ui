import Builder from "./Builder.js";

const Query = new Proxy({}, {
  get(_, query) {
    return (params) => {
      return new Builder(query, "query", params)
    }
  }
});
export { Query };