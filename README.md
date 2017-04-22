# omegaUp Give Tracker

This project contains the code for the Give Tracker app for omegaUp volunteers.

# Simple instructions

1.  Install [Node.js](https://nodejs.org/en/).

1. Install [Yarn](https://yarnpkg.com/).

1.  Install [git](https://git-scm.com/).

1.  Create a [Google Cloud Platform project](https://console.cloud.google.com).

1.  Install the [Google Cloud SDK](https://cloud.google.com/sdk/).

    * After downloading the SDK, initialize it:

            gcloud init

1.  Acquire local credentials for authenticating with Google Cloud Platform
    services:

        gcloud beta auth application-default login

1.  Clone the repository:

        git clone https://github.com/rcxr/omegaup-givetracker.git

1.  Install dependencies using Yarn:

        yarn install

1.  Start the app:

        yarn start

1.  View the app at [http://localhost:8080](http://localhost:8080).

1.  Stop the app by pressing `Ctrl+C`.

1.  Deploy the app:

        gcloud app deploy

1.  View the deployed app at [https://YOUR_PROJECT_ID.appspot.com](https://YOUR_PROJECT_ID.appspot.com).
