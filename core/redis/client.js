const { createClient } = require('redis');

console.log('reids conn: ', process.env.REDIS_HOST, process.env.REDIS_PORT)

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    password: process.env.REDIS_PW
});

client.on('error', (err) => console.error(err));
client.connect();
console.log('connected to redis');
module.exports = { client };
