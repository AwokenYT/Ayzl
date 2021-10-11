module.exports = (client) => {
    // #region clientExtentions
    const extentions = require('./customModules/clientExtentions')(client);
    extentions.forEach(extention => {
        client[extention.name] = extention.variable;
    });
    // #endregion

    return client;
};