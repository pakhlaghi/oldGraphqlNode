const siege =
    require('siege');

siege()
    .on(5000)
    .for(10000).times
    .get('/test')
    .attack()