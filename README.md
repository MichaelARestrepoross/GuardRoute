# GuardRoute


## Overview

GuardRoute is a web application that provides detailed information about traffic collisions in New York City. It offers insights into the frequency of accidents in various areas, details about the vehicles involved, and information on the people affected. The goal is to help users stay informed about dangerous streets and plan their routes accordingly to ensure safer travels.

## Visit our live site

[Link to GuardRoute website](https://guardroute.netlify.app/)

## Our Team

[Michael Restrepoross](http://www.linkedin.com/in/michael-restrepoross)
[Julissa Garcia](https://www.linkedin.com/in/juligarc91)
[Jose Barrios](https://www.linkedin.com/in/josebarriosa/)

## Frontend Features

- **Accident Index**: Browse a comprehensive list of recent traffic accidents, including details such as location, date, and vehicles involved.
- **Accident Details**: View detailed information about individual accidents, including images, the people involved, and specific accident circumstances.
- **Interactive Map**: Use the interactive map to visualize accident hotspots and see where recent accidents have occurred in NYC.
- **Heatmap Visualization**: Analyze accident frequency and distribution with an interactive heatmap.
- **Responsive Design**: Enjoy a seamless user experience across various devices and screen sizes.

## Frontend Technology Stack

### React.js
- **Description**: React.js was used for developing the frontend of the application. It facilitated the creation of interactive user interfaces through the use of components, state management, and hooks.
- **Components**: Functional components were utilized extensively throughout the application to create reusable UI elements.

### Tailwind CSS
- **Description**: Tailwind CSS was leveraged for styling the application, providing a utility-first approach to CSS that enabled rapid development and customization of the user interface.
- **Utility-first CSS**: Tailwind's utility classes were used to apply styles directly to HTML elements, allowing for quick prototyping and consistent styling across the application.
- **Responsive Design**: Tailwind's responsive design utilities were utilized to ensure that the application was optimized for various screen sizes and devices.

### React Router
- **Description**: React Router was employed for handling navigation within the application, enabling seamless transitions between different views and components.
- **Routing**: React Router's Route component was used to define routes for different pages and components within the application.
- **Dynamic Routing**: Parameters and nested routes were utilized to create dynamic routes that could adapt to changing data and user interactions.

### @vis.gl/react-google-maps
- **Description**: The `@vis.gl/react-google-maps` library was integrated into the application to incorporate Google Maps functionality, specifically for displaying the location of Accidents on a map.
- **Google Maps Integration**: This library provided components such as Map, AdvancedMarker, and Pin, which were utilized to render interactive maps and mark the positions of accidents.
- **API Integration**: The library facilitated the integration of Google Maps API, allowing the application to access and display map data seamlessly within the React environment.
- **Customization**: Various customization options, such as setting default zoom levels and marker styles, were utilized to tailor the map display according to the application's requirements.

## APIs Used

- **Motor Vehicle Collisions - Crashes**: This API provides data on traffic collisions in New York City, including details about the location and circumstances of crashes. For more details, you can visit the [API documentation](https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Crashes/h9gi-nx95/about_data).

- **Motor Vehicle Collisions - Person**: This API offers information about individuals involved in traffic collisions, providing data on injuries and fatalities. For more details, you can visit the [API documentation](https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Person/f55k-p6yu/about_data).

- **Motor Vehicle Collisions - Vehicles**: This API provides data on the vehicles involved in traffic collisions, including vehicle types and contributing factors. For more details, you can visit the [API documentation](https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Vehicles/bm4k-52h4/about_data).

- **Maps JavaScript API**: The Maps JavaScript API provides a way to embed Google Maps into web pages using JavaScript. It allows developers to customize maps with their own content and imagery, as well as add interactivity and functionality. For detailed documentation, you can refer to the [Maps JavaScript API documentation](https://developers.google.com/maps/documentation/javascript).

## Getting Started Locally

To run GuardRoute locally on your machine, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the repository**

    ```sh
    git clone <repository-url>
    cd guardroute
    ```

2. **Install NPM packages**

    ```sh
    npm install
    ```

3. **Create an .env file and fill these variables**

    ```sh
    VITE_CRASH_DATA_URL=
    VITE_CRASH_DATA_TOKEN=
    VITE_GOOGLE_MAPS_TOKEN=
    VITE_GOOGLE_MAP_ID=
    ```

4. **Start the Application**

    ```sh
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## User Stories

**Accident Index**
As a user, I want to browse a comprehensive list of recent traffic accidents, including details such as location, date, and vehicles involved.

**Accident Details**
As a user, I want to view detailed information about individual accidents, including images, the people involved, and specific accident circumstances.

**Interactive Map**
As a user, I want to visualize accident hotspots and see where recent accidents have occurred in NYC using an interactive map feature.

**Heatmap Visualization**
As a user, I want to analyze accident frequency and distribution with an interactive heatmap.

**Responsive Design**
As a user, I expect the application to provide a seamless user experience across various devices and screen sizes.

## Stretch Goals

- **React Google Maps Integration**: Integrate React Google Maps to display the location where each accident occurred directly on the map within the accident details page. This feature will enhance the user experience by providing a visual representation of accident locations in NYC.

- **Tailwind for Styling**: Implement Tailwind CSS for styling the project, ensuring a consistent and modern UI.
