# nutrition-backend

Nutrition-backend will return a filtered list of food data based on incoming URL query strings.

Expected URL + query string: [domain]/foods?nutrient=[number 0-7]&min=[number]&max=[number]

Made with Express.js

To run locally:
1. Make sure to have this app started and running on localhost:3001 in order to functionally serve data to the nutrition-frontend app.
2. npm install > npm start
OR run with: DEBUG=nutrition-backend:\* npm start
