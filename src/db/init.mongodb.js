const { MongoClient } = require( 'mongodb' );
const { seed } = require( './seed' );

const uri = "mongodb://localhost:27017";

const client = new MongoClient( uri );

async function connect() {
    try {
        await client.connect();
        seed();
    } catch( error ) {
       await client.close();
       throw error;
    }
}

connect().catch(error => {
    console.log(error.message);
    process.exit();
})

module.exports = {
    client
};