export function deepCopy(obj) {
    if (typeof obj === 'object') {
        const copyObj = {};
        for (const key in obj) {
            copyObj[key] = obj[key];
        }
        return copyObj
    }

    return;
}