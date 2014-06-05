function structureField(value, _label) {
    var label = _label || "value";
    if (isArray(value)) {
        var field_array = [];
        for (var i = 0, l = value.length; l > i; i++) {
            var item = {};
            item[label] = value[i];
            field_array.push(item);
        }
        return {
            und: field_array
        };
    }
    if (value instanceof Date) {
        var obj = {
            value: {
                date: value.getMonth() + 1 + "/" + value.getDate() + "/" + value.getFullYear() + " - " + value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds()
            }
        };
        return {
            und: [ obj ]
        };
    }
    if ("object" == typeof value) return {
        und: [ value ]
    };
    var item = {};
    item[label] = value;
    return {
        und: [ item ]
    };
}

function isArray(value) {
    return "[object Array]" === Object.prototype.toString.call(value);
}

function serializeDrupalViewsFilter(obj) {
    var str = [];
    for (var p in obj) if (obj[p] instanceof Array) for (var i = 0, l = obj[p].length; l > i; i++) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p][i])); else str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

exports.structureField = structureField;

exports.serializeDrupalViewsFilter = serializeDrupalViewsFilter;