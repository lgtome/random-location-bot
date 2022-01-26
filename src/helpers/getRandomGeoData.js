function getRandomGeoData(min, max) {
    return +(Math.random() * (max - min) + min).toFixed(6)
}

module.exports = getRandomGeoData