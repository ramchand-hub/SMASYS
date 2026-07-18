const mongoose = require('mongoose');
const Role = require('../dist/models/Role').default || require('../src/models/Role');
const webconfig = require('../webconfig.json');

const uri = process.env.MONGO_URI || webconfig.mongoUri || webconfig.MONGO_URI || 'mongodb://localhost:27017/smasys';

async function run() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to', uri);

  // Drop old index on role_name if present
  try {
    const indexes = await Role.collection.indexes();
    const idx = indexes.find(i => i.key && i.key.role_name === 1);
    if (idx) {
      console.log('Dropping old index:', idx.name);
      await Role.collection.dropIndex(idx.name);
    }
  } catch (err) {
    console.warn('No old role_name index to drop or error:', err.message);
  }

  // Migrate documents: role_name -> name, role_description -> description
  const cursor = Role.collection.find({ $or: [{ name: { $exists: false } }, { name: null }, { role_name: { $exists: true } }] });
  let moved = 0;
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    const updates = {};
    if ((!doc.name || doc.name === null) && doc.role_name) updates.name = doc.role_name;
    if ((!doc.description || doc.description === null) && doc.role_description) updates.description = doc.role_description;
    // remove legacy fields if present
    const unset = {};
    if (doc.role_name) unset.role_name = '';
    if (doc.role_description) unset.role_description = '';
    if (Object.keys(updates).length === 0 && Object.keys(unset).length === 0) {
      // nothing to do
      continue;
    }
    const updateOps = {};
    if (Object.keys(updates).length) updateOps.$set = updates;
    if (Object.keys(unset).length) updateOps.$unset = unset;
    await Role.collection.updateOne({ _id: doc._id }, updateOps);
    moved++;
  }
  console.log('Migrated fields for', moved, 'documents');

  // Remove documents with no name (null or missing) to avoid unique-null conflicts
  const deleteResult = await Role.collection.deleteMany({ $or: [{ name: null }, { name: { $exists: false } }] });
  console.log('Deleted', deleteResult.deletedCount, 'role docs with null/missing name');

  // Ensure unique index on name
  try {
    await Role.collection.createIndex({ name: 1 }, { unique: true });
    console.log('Created unique index on name');
  } catch (err) {
    console.error('Failed to create index:', err.message);
  }

  await mongoose.disconnect();
  console.log('Done');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
