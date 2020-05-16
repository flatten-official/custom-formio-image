# Custom Form.io Docker Image

This image extends the `formio/formio-enterprise` default image by 
fetching environment variables from the GCP Secrets Manager.
This ensures that sensitive environment variables such as `MONGO` and `LICENSE`
are fetched dynamically when the container starts rather than set from the host.

The `SECRET_ID` environment variable needs to be set to the GCP secret ressource id.
All environment variables to be fetched from GCP Secret Manager need to have a value of `fromSecret`.

## Important Files

- `Dockerfile`: Simple docker file that extends the base image.

- `secrets.js`: Fetches the environment variables from GCP Secrets Manager and then runs the main image.

## Testing locally

Prerequisites : Install and start docker.

1. Create a service account and download its credentials file in the working directory. 
(DO NOT use an existing service account, it's easy to mistakenly push the credentials to GitHub)

2. Give the service account read permissions on the secret.

3. Build the image: `docker build -t custom-formio .`

4. Run the image:

    ```
    docker container run \
        -d
        --rm
        -e GOOGLE_APPLICATION_CREDENTIALS=./credentials.json
        -p 80:80
        custom-formio
    ```

5. Visit `localhost` to access the website.

6.  Delete service account, remove permissions from secrets manager.

## Updating environment variables

1. Add the environment variable to cloud run and set the value to `fromSecret`.

2. Update the secret in GCP Secret Manager by adding your environment variable to the JSON.

## Deploying

Committing to master or staging will automatically build the image and
upload it to the container registry.

You then need to manually redeploy the image in Cloud Run.