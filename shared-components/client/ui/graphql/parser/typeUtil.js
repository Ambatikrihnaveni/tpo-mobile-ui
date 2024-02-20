
export default class TypeUtil {

    static type(name, value, t) {
        return TypeUtil.getTypeName(name, value, t);
    }

    static getTypeName(name, val, type) {
         if(type) {
             return type; //return type if it is not null.
         }
        if (typeof val === 'number' && (val && (val + "").indexOf('.') >= 0)) {
            return "Float";
        } else if (TypeUtil.isScalar(val) && name.endsWith('ID')) {
            return "ID";
        } else if (typeof val === 'boolean') {
            return "Boolean";
        } else if (Number.isSafeInteger(val)) {
            return "Int";
        } else if (typeof val === 'string') {
            return "String";
        } else if (typeof val === 'array') {
            return (val && "[" + getTypeName(val[0]) + "!]");
        } else if (typeof val === 'object') {
            return (val && val.constructor.name);
        } else if (val === undefined) {
            return "String"
        }
    }

    static isScalar(value) {
        return (/number|string/).test(typeof value)
    }

}