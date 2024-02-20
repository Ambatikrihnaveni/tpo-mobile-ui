import { gql } from "@apollo/client";
import TypeUtil from "./typeUtil.js";

export default class Builder {
    constructor(query, type, params = {}) {
        this.variables = [];
        this.params = [];
        let varData = params instanceof Array ? params : Object.keys(params)
        varData.map(key => {
            if (key.name || key.value) {
                this.variables.push(`$${key.name}: ${TypeUtil.type(key.name, key.value, key.type)}${key.required ? '!' : ''}`);
                this.params.push(`${key.name}: $${key.name}`)
            } else {
                this.variables.push(`$${key}: ${TypeUtil.type(key, params[key])}`);
                this.params.push(`${key}: $${key}`)
            }
        });
        this.type = type;
        this.query = query;
        this.mainQuery = (this.type === "query" ? "Get" : "Post") + query;
    }

    body(fields = []) {
        const body = this.parse(fields)
        if (this.variables.length) {
            this.query = `${this.type} ${this.mainQuery}(${this.variables.join(', ')}) { ${this.query}(${this.params.join(', ')}) ${body} }`
        } else {
            this.query = `${this.type} ${this.mainQuery} { ${this.query} ${body} }`
        }
        return gql`${this.query}`
    }

    parse(fields) {
        if (fields.length == 0) {
            return '';
        }
        let f = [];
        fields.map(field => {
            if (typeof field === 'object') {
                f.push(field.name + ' ' + this.parse(field.fields))
            } else {
                f.push(field)
            }
        })

        return `{ ${f.join(' ')} }`
    }
}