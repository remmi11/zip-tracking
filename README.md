# Setup

## [See the Demo](https://zip-tracking.herokuapp.com/)

1. Add sharing url from google sheets
<img src = "https://github.com/remmi11/zip-tracking/blob/master/img/sharing.png" width="350">

   Add to js/map.js
```javascript
var public_spreadsheet_url = 'your sharing url';
```

2. Acquire a [Mapbox API Key](https://www.mapbox.com/) (50000 free geocode requests/mo)

   Add to js/map.js

```javascript
L.mapbox.accessToken = 'your key here';
```