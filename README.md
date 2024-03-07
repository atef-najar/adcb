# Getting Started with the AVM Hackathon 

### Readme Files for all use cases be found [here](https://github.com/addvaluemachine/avm-genai-hackathon-usecases)

#
# Install Prerequisites
* ### Have git installed - if you want to use the terminal for git commands, otherwise you can also donwload the zip file of the hackathon repository. Guide to install git [here](https://github.com/git-guides/install-git)
* ### Have node.js installed, if you do not have it installed visit the  [official Node.js page](https://nodejs.org/en/download/) and download it. We recommend downloading the version [v20.4.0](https://nodejs.org/dist/v20.4.0/)
* ### Have npm installed - it will come installed with node.js

#

### Possible errors
If you run into any problems during the `npm install` `npm start` steps.
It is likely due to the installed npm version, you might have to downgrade it. Fixes:

### Fix: 1
- run ```npm config set legacy-peer-deps true```
- now you can repeat the `npm install` `npm start` steps

### Fix: 2    
- use ```nvm``` (Node Version Manager), instruction for installation found [here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- run `nvm use`, it will try and use the version specified in the ```.nvmrc``` file, if the required version is not installed on your machine, it will provide you the steps required for downloading it (```nvm install v20.4.0```). After you downloaded it, run `nvm use` again
- now you can repeat the `npm install` `npm start` steps.



## Available Scripts
Navigate to the project directory, you can run:
### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.







##You wont need the below commands##
### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


