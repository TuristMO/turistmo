#!/bin/sh

    # --batch to prevent interactive command --yes to assume "yes" for questions
    gpg --quiet --batch --yes --decrypt --passphrase="$ENCRYPT_PASSWORD" \
    --output ./android/app/my-upload-key.keystore ./android/app/my-upload-key.keystore.gpg

    gpg --quiet --batch --yes --decrypt --passphrase="$ENCRYPT_PASSWORD" \
    --output ./android/app/turistmo-private-key.json ./android/app/turistmo-private-key.json.gpg


