const SECRET_ID = 'projects/233853318753/secrets/formio-env-var/versions/latest';

// Update to allow more secrets to be set.
// We don't allow all secrets because then anyone with access to the secret manager could write any environment variable.
const ALLOWED_ENVS = ["MONGO", "LICENSE", "PORTAL_SECRET", "JWT_SECRET", "DB_SECRET", "PRIMARY", "ADMIN_EMAIL", "ADMIN_PASS"];

// Imports the Secret Manager library
// Use root path because module was installed globally
const {SecretManagerServiceClient} = require('/usr/local/lib/node_modules/@google-cloud/secret-manager');

// Instantiates a client
const client = new SecretManagerServiceClient();

async function loadSecrets() {
    // Get secrets from the payload.
    const [version] = await client.accessSecretVersion({name: SECRET_ID});

    // Extract the payload as a JSON object.
    const payload = JSON.parse(version.payload.data);

    ALLOWED_ENVS.forEach(envName => {
        if (envName in payload) {
            process.env[envName] = payload[envName]; // Set environment variable
        }
    })
}

loadSecrets().then(() => require("./formio"))