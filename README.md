# Neighborhood Map React Single Page App
By Carlota Pearl 

View **[live version here](https://carlotapearl.github.io/react-neighborhood-map/)**.

## About
This single page app uses the Google maps API and the location-based service Foursquare API to list top rated attractions in Orlando, Florida. The page features 6 map markers of roller coaster locations and lists details of each attraction using the Foursquare API. It also includes a search functionality that filters out the markers by query. It is made with responsiveness and accessibility in mind.

This app was designed from the ground up, utilizing the create-react-app tool.
It uses the Google Maps API implemented with the [google-maps-react](https://www.npmjs.com/package/google-maps-react) library.

## How to Use the App
1. The app will load a map of Orlando, Florida with markers for the top rated roller coasters and list these attractions in the sidebar.
2. Click on a map marker or name of the attraction on the list to get details about the specific attraction.

## Local Installation 
Note: Make sure you have the latest Node.js installed.
1. Navigate to the directory that contains the project.
2. Open up Git Bash in this location.
3. Run 'npm install'.
4. Run 'npm start'.
5. Open http://localhost:3000

## Important
This application uses API's from Google maps and Foursquare, and developer free plans are only limited to a certain number of requests per day so you may experience not being able to load content. 

**_NOTE:_** _The service workers for this app will only cache the site when it is in production mode._

## How to Load the App in Production Mode

To run a production build in order to run the service worker do the following steps: 

```
npm run build
```
Then,

```
serve -s build
```

## Technology
* Reactjs
* ES6 JavaScript
* HTML
* CSS
* Foursquare API
* Google Maps API


## Attributions
The "likes" data and photos are provided by the Foursquare API.

Map style [Snazzymaps](https://snazzymaps.com/style/6666/green-and-blue) made by Bruno Perrier.

## MIT License
_This project is licensed under the terms of the MIT license._