# Flatacuties
week 2 project
# Flatacuties - Vote for the Cutest!

Welcome to Flatacuties, the app where you can vote for the cutest animals! This project involves building the frontend for Flatacuties using a local API. Users can see a list of adorable animal names, their images, and cast votes for their favorites.

## Table of Contents
- [Project Overview](#project-overview)
- [Project Setup](#project-setup)
  - [Requirements](#requirements)
  - [Setting Up the Local Server](#setting-up-the-local-server)
  - [Project Setup Steps](#project-setup-steps)
- [Usage](#usage)
  - [Viewing Animal Names](#viewing-animal-names)
  - [Voting](#voting)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Flatacuties is a frontend application designed for users to vote for their favorite animals. The app fetches data from a local server running a JSON DB server, displaying a list of cute animal names with corresponding images. Users can enjoy a delightful voting experience for the cutest Flatacutie!

## Project Setup

### Requirements

Before setting up the project, ensure you have the following:

- Node.js installed on your machine
- npm (Node Package Manager)
- JSON DB server (`json-server`) installed globally

### Setting Up the Local Server

1. In your project directory, create a `db.json` file with the provided animal data.
2. Open a terminal and run the following command to start the JSON DB server:
   ```bash
   json-server --watch db.json
##Usage
Viewing Animal Names
Open the index.html file in a web browser to see a list of animal names along with their images.

##Voting
To cast your vote for the cutest Flatacutie:

Click on the image or name of your favorite animal.
Look for the "Vote" button associated with the chosen animal.
Click the "Vote" button to submit your vote.
##LICENSE
MIT