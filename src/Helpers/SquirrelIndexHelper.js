// SquirrelIndexHelp.js

export function getRegion(location) {
    // Parse the input string
    // captures the digits and assigns it to hectare (\d+) and ([A-Za-z]+) matches one or more lerrters A-Z
    const [, hectare, letter] = location.match(/(\d+)([A-Za-z]+)/);

    // Determine the region based on the criteria
    let region = '';
    const number = parseInt(hectare);
    const letterUpperCase = letter.toUpperCase();

    // Determine vertical position
    if (number >= 1 && number <= 14) {
        region += 'South';
    } else if (number >= 15 && number <= 28) {
        region += 'Center';
    } else if (number >= 29 && number <= 42) {
        region += 'North';
    }

    // Determine horizontal position
    if (['A', 'B', 'C'].includes(letterUpperCase)) {
        region += 'West';
    } else if (['D', 'E', 'F'].includes(letterUpperCase)) {
        region += 'Center';
    } else if (['G', 'H', 'I'].includes(letterUpperCase)) {
        region += 'East';
    }

    // If the region is Center both vertically and horizontally
    if (region === 'CenterCenter') {
        return 'Center';
    }

    // Determine final region
    if (region === '') {
        region = 'Unknown';
    } else {
        region = region.charAt(0).toUpperCase() + region.slice(1);
    }

    return region;
}

export function reverseRegion(region) {
    // Define an object mapping each region to its corresponding range of hectare-letter combinations
    const regionRanges = {
        'SouthWest': { start: 1, end: 14, letters: ['A', 'B', 'C'] },
        'CenterWest': { start: 15, end: 28, letters: ['A', 'B', 'C'] },
        'NorthWest': { start: 29, end: 42, letters: ['A', 'B', 'C'] },
        'SouthCenter': { start: 1, end: 14, letters: ['D', 'E', 'F'] },
        'Center': { start: 15, end: 28, letters: [ 'D', 'E', 'F'] },
        'NorthCenter': { start: 29, end: 42, letters: ['D', 'E', 'F'] },
        'SouthEast': { start: 1, end: 14, letters: ['G', 'H', 'I'] },
        'CenterEast': { start: 15, end: 28, letters: ['G', 'H', 'I'] },
        'NorthEast': { start: 29, end: 42, letters: ['G', 'H', 'I'] },
    };

    // Check if the region exists in the regionRanges object
    if (!(region in regionRanges)) {
        return [];
    }

    const { start, end, letters } = regionRanges[region];

    // Iterate over the range for the given region and construct the array of hectare-letter pairs
    const result = [];
    for (let number = start; number <= end; number++) {
        letters.forEach(letter => {
            result.push(`${number<=9?"0"+number:number}${letter}`);
        });
    }
    return result;
}