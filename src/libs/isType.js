function isType(data, type) {
    let _type = Object.prototype.toString.call(data).replace(']', '').split(' ')[1];
    return _type.toLowerCase() === type.toLowerCase();
}
module.exports = isType;