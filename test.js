const { MongoClient } = require('mongodb');

const test = async (uri) => {
  try {
    console.log(`--> testing '${uri}'...`);
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 1000 });
    await client.connect();
    console.log('--> connection was successful');
    console.log('--> retrieving database list...');
    await client.db().admin().listDatabases();
    console.log('--> done');
  } catch (err) {
    console.error('[ERROR]', err.toString());
  }
};

let connstr = 'mongodb://root:s3cr3tp4ss@localhost:27018/?readPreference=secondary';
test(connstr)
  .then(() => test(`${connstr}&directConnection=true`))
  .finally(() => process.exit());
