# mern-authentication

## Technologies
### Backend
- NodeJS
- Express
- MongoDB
### Frontend
- ReactJS (current version)
- ReactHooks
- Redux

## Capabilities
- Let you register an account in an encrypted safest way.
- Let you login with a registered account and only access private routes only if successfully login
- With basic validation both in frontend and backend

## Securities
- Bcryptjs for encryption
- Generates `Bearer` token
- Token expiration > 30 mins.

## Dummies
- May enter invalid or valid information.

## How to use locally
1. Clone this repository
2. Run `npm install` and cd to /client and run `npm install` also
3. I've made a script to run both client and server at the same time. Just run in root directory cmd `npm run dev`
4. To run only the server run `npm run server'
5. Front-end served at localhost:3000
6. Back-end served at localhost:1000
- I used proxy server for API Communication. May check on /client package.json file bottom part.
7. Server would require you to have a mongodb installed locally or in cloud.
8. .env.example contains all sample keys and connection string to mongodb that are properly deployed in my host (which is heroku). You may use it as a reference. For more info about mongodb installation please refer mongodb [docs](https://docs.mongodb.com/)


## Deployed App
- [Auth APP](https://morning-cliffs-47805.herokuapp.com/)

(C) 2020
Author: Alejandro H. Cartojano Jr.
