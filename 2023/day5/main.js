const fs = require('fs')

const charCodeZero = "0".charCodeAt()
const charCodeNine = "9".charCodeAt()

function isDigitCode(n) {
    return(n >= charCodeZero && n <= charCodeNine);
}

/**
 * example: seed to soil
 * destRangeStart sourceRangeStart range
 * soil                   seed     range
 * 50                      98        2
 * */ 


function extractMaps(mapInput) {
    let parsedMaps = {}
    let currentKey = ''
    for (let line of mapInput) {
        if (!isDigitCode(line[0].charCodeAt())) {
            parsedMaps[line] = {}
            currentKey = line
        } else {
           const splitLine = line.split(' ')
           const destinationRangeStart = parseInt(splitLine[0])
           const sourceRangeStart = parseInt(splitLine[1])
           const rangeSize = parseInt(splitLine[2])

            for (let i = 0; i < rangeSize; i++) {
                const destinationValue = destinationRangeStart + i
                const sourceValue = sourceRangeStart + i
                parsedMaps[currentKey][sourceValue] = destinationValue.toString()
           }
        } 
    }

    return parsedMaps
}

function enrichSeedToSoilMap(seeds, parsedMaps) {
    for (let seed of seeds) {
        if (!parsedMaps['seed-to-soil'].hasOwnProperty(seed)) {
            parsedMaps['seed-to-soil'][seed] = seed
        }
    }
    return parsedMaps
}

function findLocations(seeds, maps) {
    let locations = []
    const seedToSoilMap = maps['seed-to-soil']
    const soilToFertilizerMap = maps['soil-to-fertilizer']
    const fertilizerToWaterMap = maps['fertilizer-to-water']
    const waterToLightMap = maps['water-to-light']
    const lightToTemperatureMap = maps['light-to-temperature']
    const temperatureToHumidityMap = maps['temperature-to-humidity']
    const humidityToLocationMap = maps['humidity-to-location']
    for (let seed of seeds) {
        const soil = seedToSoilMap[seed]
        let fertilizer = soilToFertilizerMap[soil]
        if (fertilizer === undefined) {
            fertilizer = soil
        }
        let water = fertilizerToWaterMap[fertilizer]
        if (water === undefined) {
            water = fertilizer
        }
        let light = waterToLightMap[water]
        if (light === undefined) {
            light = water
        }
        let temperature = lightToTemperatureMap[light]
        if (temperature === undefined) {
            temperature = light
        }
        let humidity = temperatureToHumidityMap[temperature]
        if (humidity === undefined) {
            humidity = temperature
        }
        let location = humidityToLocationMap[humidity]
        if (location === undefined) {
            location = humidity
        }
        locations.push(parseInt(location))
    }
    return locations
}

function main() {
    const input = fs.readFileSync('challenge_input.txt', 'utf8').trimEnd();

    const splitInput = input.split("\n")

    const seedsString = splitInput[0].replace('seeds: ', '')
    const seeds = seedsString.split(' ')

    let strippedInput = []
    for (let line of splitInput) {
        if (line.startsWith('seed-') ||
            line.startsWith('soil-') ||
            line.startsWith('f') ||
            line.startsWith('w') ||
            line.startsWith('l') ||
            line.startsWith('t') ||
            line.startsWith('h'))
        {
            line = line.replace(' map:', '')
        }
        if (line !== '') {
            strippedInput.push(line.trim())
        }
    }

    // remove the seeds
    strippedInput.shift()

    const tmp = extractMaps(strippedInput)
    const maps = enrichSeedToSoilMap(seeds, tmp)

    const locations = findLocations(seeds, maps)
    console.log('Part 1: ', Math.min(...locations))



}

main()