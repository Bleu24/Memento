export function deepCopy(obj) {
    if (typeof obj !== 'object') return obj;

    let copyObj = {};
    for (const key in obj) {
        copyObj[key] = deepCopy(obj[key]);
    }

    return copyObj;
}