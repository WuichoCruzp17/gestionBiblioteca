const util = {

    validateUnderScript: function (string) {
        return string.split('_').length > 1 ? true : false;
    },

    convertColumns: async function (column) {
        if (util.validateUnderScript(column)) {
            const arr = column.split('_');
            return column = arr[0] + util.getFirstCapitalLetter(arr[1]);
        } else { return column; }
    },

    getFirstCapitalLetter: function (letter) {
        const arr = letter.split('');
        var string = "";
        for (var i = 0; i < arr.length; i++) {
            string += (i === 0) ? arr[i].toLocaleUpperCase() : arr[i];
        }
        return string;
    },

    validateObjetc: function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    } 
};

const utilString = {
    validateString: function (obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
};

module.exports = util, utilString;