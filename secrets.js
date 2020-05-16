// environment variable must be set to this for the script to fetch from the secret manager.
const KEY_WORD = "fromSecret";

// Imports the Secret Manager library
// Use root path because module was installed globally
const {SecretManagerServiceClient} = require('/usr/local/lib/node_modules/@google-cloud/secret-manager');

// Instantiates a client
const client = new SecretManagerServiceClient();

async function main() {
    // Get secrets from the payload.
    const [version] = await client.accessSecretVersion({name: process.env.SECRET_ID});

    // Extract the payload as a JSON object.
    const payload = JSON.parse(version.payload.data);

    for (let key in payload) {
        if (payload.hasOwnProperty(key) && process.env[key] === KEY_WORD) {
            console.log(`Loading ${key} from Secret Manager`);
            process.env[key] = payload[key];
        }
    }

    require("./formio"); // Start the base image
}

main();