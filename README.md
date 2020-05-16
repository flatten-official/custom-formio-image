# Custom Form.io Docker Image

This image extends the `formio/formio-enterprise` default image by 
fetching environment variables from the GCP Secrets Manager.
This ensures that sensitive environment variables such as `MONGO` and `LICENSE`
are fetched dynamically when the container starts rather than set from the host.

## Important Files

- `Dockerfile`: Simple docker file that extends the base image.

- `secrets.js`: Fetches the environment variables from GCP Secrets Manager and then runs the main image.

## Testing locally

Prerequisites : Install and start docker.

1. Create a service account and download its credentials file. 
(DO NOT use an existing service account, it's easy to mistakenly push the credentials to GitHub)

2. Give the service account read permissions on the secret.

3. Place the credentials file in this working directory and
uncomment the `COPY` command in `Dockerfile`.

4. Build the image: `docker build -t custom-formio .`

5. Run the image:

    ```
    docker container run \
        -e GOOGLE_APPLICATION_CREDENTIALS=/src/credentials.json
        -p 80:80
        custom-formio
    ```

6.  Delete service account, remove permissions from secrets manager.

## Updating environment variables

1. Add your environment variable to the `secrets.js` list (if not already there).

2. Update the secret in GCP Secret Manager by adding your environment variable to the JSON.