FROM formio/formio-enterprise
COPY secrets.js .

# Uncomment line when testing locally with a credentials file
# COPY credentials.json .

# Install globally because installing locally doesn't work
RUN npm install --global @google-cloud/secret-manager

# Start program by running secrets.js
CMD ["node", "./secrets.js"]