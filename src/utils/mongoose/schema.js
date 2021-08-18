const mongoose = require('mongoose');

class FindOrCreateSchema extends mongoose.Schema {
  constructor() {
    super(arguments);

    this.static("findOrCreate", async function(doc) {
      return await this.findOne(doc) || await this.create(doc);
    });
  }
}

module.exports = FindOrCreateSchema;
