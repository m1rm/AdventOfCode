const fs = require('fs');
const { parse } = require('path');

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
            parsedMaps[line] = []
            currentKey = line
        } else {
            const splitLine = line.split(' ')
            const destinationRangeStart = parseInt(splitLine[0])
            const sourceRangeStart = parseInt(splitLine[1])
            const rangeSize = parseInt(splitLine[2])
            let sourceRangeEnd = 0
            if (rangeSize === 0) {
                sourceRangeEnd = sourceRangeStart
            } else {
                sourceRangeEnd = sourceRangeStart + rangeSize - 1
            }
            let innerMap = {}
            innerMap['sourceRangeStart'] = sourceRangeStart
            innerMap['sourceRangeEnd'] = sourceRangeEnd
            innerMap['destinationRangeStart'] = destinationRangeStart
            innerMap['range'] = rangeSize

            parsedMaps[currentKey].push(innerMap)
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
        // console.log('seed: ', seed )
        let soil = 0
        for (let range of seedToSoilMap.values()) {
            if (seed < range['sourceRangeStart'] ||
                seed > range['sourceRangeEnd']) {
                    soil = seed
            } else {
                soil = seed - range['sourceRangeStart'] + range['destinationRangeStart']
                break
        }
        }
        // console.log('soil: ', soil)

        let fertilizer = 0
        for (let range of soilToFertilizerMap) {
            if (soil < range['sourceRangeStart'] ||
                soil > range['sourceRangeEnd']) {
                    fertilizer = soil
            } else {
                fertilizer = soil - range['sourceRangeStart'] + range['destinationRangeStart']
                break
            }
        }
        // console.log('fertilizer: ', fertilizer)

        let water = 0
        for(let range of fertilizerToWaterMap) {
            if (fertilizer < range['sourceRangeStart'] ||
                fertilizer > range['sourceRangeEnd']) {
                    water = fertilizer
            } else {
                water = fertilizer - range['sourceRangeStart'] + range['destinationRangeStart']
                break
            }
        }
        // console.log('water: ', water)

        let light = 0
        for(let range of waterToLightMap) {
            if (water < range['sourceRangeStart'] ||
                water > range['sourceRangeEnd']) {
                    light = water
            } else {
                light = water - range['sourceRangeStart'] + range['destinationRangeStart']
                break
            }
        }
        // console.log('light: ', light)

        let temperature = 0
        for (let range of lightToTemperatureMap) {
            if (light < range['sourceRangeStart'] ||
                light > range['sourceRangeEnd']) {
                    temperature = light
            } else {
                temperature = light - range['sourceRangeStart'] + range['destinationRangeStart']
                break
            }
        }
        // console.log('temperature: ', temperature)

        let humidity = 0
        for (let range of temperatureToHumidityMap) {
            if (temperature < range['sourceRangeStart'] ||
                temperature > range['sourceRangeEnd']) {
                    humidity = temperature
            } else {
                humidity = temperature - range['sourceRangeStart'] + range['destinationRangeStart']
                break
            }
        }
        // console.log('humidity: ', humidity)

        let location = 0
        for (let range of humidityToLocationMap) {
            if (humidity < range['sourceRangeStart'] || 
                humidity > range['sourceRangeEnd']) {
                    location = humidity
            } else {
                location = humidity - range['sourceRangeStart'] + range['destinationRangeStart']
                break
            }
        }

        // console.log('location: ', location)
    locations.push(location)

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

    const maps = extractMaps(strippedInput)
    console.log(maps)
    // const maps = enrichSeedToSoilMap(seeds, tmp)

    const locations = findLocations(seeds, maps)
    // console.log(locations)
    console.log('Part 1: ', Math.min(...locations)) // 126235741 too low



}

main()