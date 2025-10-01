# Location-Based Sentiment Analysis Dashboard

This document outlines the technical implementation of the real-time location-based sentiment analysis dashboard.

## Overview

The dashboard provides a comprehensive view of public sentiment across various locations, visualized on an interactive map. It leverages Firebase for real-time data synchronization and a modern web stack for a responsive user experience.

## Data Model (Firestore / Realtime Database)

The data is stored in Firestore or Realtime Database with the following structure for each location entry:

```json
{
  "location": "Chennai",
  "latitude": 13.0827,
  "longitude": 80.2707,
  "positive": 340,
  "neutral": 120,
  "negative": 210,
  "total": 670,
  "lastUpdated": "2025-09-28T12:30:00Z"
}
```
-   `positive`, `neutral`, `negative` fields store the counts for each sentiment.
-   `total` is the sum of all sentiments.

## UI Requirements

### India Map Integration

-   **Map Widget**: An interactive India map will be integrated using a library like Google Maps, Mapbox, or Leaflet.
-   **Markers/Heatmap**: Markers or heatmap grids will be placed for each location.
-   **Color Coding**: Regions (states/cities) will be color-coded based on sentiment polarity:
    -   🟢 **Positive sentiment** → Green
    -   🟡 **Neutral sentiment** → Yellow
    -   🔴 **Negative sentiment** → Red
-   **Intensity**: The intensity of the color or the size of the marker will reflect the volume of sentiment.

### Interactive Popups

-   On clicking a state or city, a popup card will display a sentiment breakdown:
    -   **Location**: Chennai
    -   **Positive**: 51%
    -   **Neutral**: 18%
    -   **Negative**: 31%
    -   **Total Records**: 670

### Analytics Panel

A side panel will show:

-   A **pie chart** for India’s overall sentiment distribution.
-   A **bar chart** for the top 5 states with the highest sentiment polarity.

### Realtime Updates

-   The map and charts will update in real-time as new feedback data is added to Firestore.

### Filters & Search

-   **Dropdown Filters**: To filter sentiment by:
    -   State / City
    -   Time Range (Today, Last 7 Days, Last 30 Days)
-   **Search Bar**: For quick location lookup.

## Key Features

-   **Interactive Map**: Displays sentiment data on a map of India with color-coded markers (Green for positive, Yellow for neutral, Red for negative).
-   **Real-time Updates**: The dashboard automatically reflects changes in the underlying sentiment data in real-time from Firestore.
-   **Detailed Pop-ups**: Clicking on a location marker reveals a detailed breakdown of sentiment percentages and total records.
-   **Analytics Panel**: A side panel provides an at-a-glance overview with a pie chart for national sentiment and a bar chart for top states.
-   **Filtering and Search**: Users can filter data by State/City and time range (Today, Last 7 Days, etc.) and search for locations.
-   **Heatmap View**: An optional toggle to visualize sentiment density as a heatmap.
-   **CSV/PDF Export**: A button to download the current sentiment data summary as a CSV or PDF file.
-   **Dark Mode**: A toggle to switch between light and dark themes for improved readability.

## Technical Stack

-   **Frontend**: Next.js, React, Tailwind CSS
-   **Backend**: Firebase (Firestore, Cloud Functions)
-   **Mapping**: Google Maps API / Mapbox
-   **Deployment**: Vercel / Firebase Hosting
