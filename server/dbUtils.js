const deepcopy = require("deepcopy");

module.exports = {
  fetchAllData: function(db) {
    return db && Array.isArray(db.data) ? deepcopy(db.data) : [];
  },
  addCommentToDb: function(db, comment) {
    const copyDb = deepcopy(db);
    copyDb.data = [Object.assign({}, comment), ...this.fetchAllData(copyDb)];
    return copyDb;
  }
};
