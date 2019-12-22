import _ from 'lodash'

export let utils = {
    deepCopy: function (obj) {
        if (typeof obj === "object") {
            if (_.isArray(obj)) {
                let newArr = [];
                for (let i = 0; i < obj.length; i++) newArr.push(obj[i]);
                return newArr;
            } else {
                let newObj = {};
                for (let key in obj) {
                    newObj[key] = this.deepCopy(obj[key]);
                }
                return newObj;
            }
        } else {
            return obj;
        }
    }
};