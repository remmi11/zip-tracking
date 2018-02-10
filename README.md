# Steps to deploy

1) Must first install bower dependencies. Find bower [here](https://bower.io/)
```
bower install
```

2) Add sharing url from google sheets
<img src = "https://github.com/remmi11/zip-tracking/blob/master/img/sharing.png" width="350">

Add to map.js
```javascript
var public_spreadsheet_url = 'your sharing url';
```

3) Acquire a [Mapbox API Key](https://www.mapbox.com/) (50000 free requests/mo)

Add to js/map.js

```javascript
L.mapbox.accessToken = ('your key here')
```