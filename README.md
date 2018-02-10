# Steps to deploy

1) Must first install bower dependencies [bower](https://bower.io/)
```
bower install
```

2) Add sharing url from google sheets
<img src = "https://github.com/remmi11/zip-tracking/blob/master/img/sharing.png" width="250")

3) Acquire a [Mapbox API Key](https://www.mapbox.com/) (geocoding API )

Add to js/map.js

```javascript
L.mapbox.accessToken = ('your key here')
```