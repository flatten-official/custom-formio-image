FROM formio/formio-enterprise
COPY secrets.js .

# Install globally because installing locally doesn't work
RUN npm install --global @google-cloud/secret-manager

# Start program by running secrets.js
CMD ["node", "./secrets.js"]