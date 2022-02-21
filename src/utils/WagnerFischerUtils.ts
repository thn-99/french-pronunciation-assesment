const consonantsCostsMatrix: Record<string, Record<string, number>> = {
    "p": {
        "p": 0,
        "t": 1,
        "k": 2,
        "b": 1,
        "d": 2,
        "g": 3,
        "f": 1,
        "s": 2,
        "ʃ": 3,
        "v": 2,
        "z": 3,
        "ʒ": 4,
        "m": 3,
        "n": 4,
        "ɲ": 5,
        "l": 3,
        "R": 4
    },
    "t": {
        "p": 1,
        "t": 0,
        "k": 1,
        "b": 2,
        "d": 1,
        "g": 2,
        "f": 2,
        "s": 1,
        "ʃ": 2,
        "v": 3,
        "z": 2,
        "ʒ": 3,
        "m": 4,
        "n": 3,
        "ɲ": 4,
        "l": 2,
        "R": 3
    },
    "k": {
        "p": 2,
        "t": 1,
        "k": 0,
        "b": 3,
        "d": 2,
        "g": 1,
        "f": 3,
        "s": 2,
        "ʃ": 1,
        "v": 4,
        "z": 3,
        "ʒ": 2,
        "m": 5,
        "n": 4,
        "ɲ": 3,
        "l": 3,
        "R": 4
    },
    "b": {
        "p": 1,
        "t": 2,
        "k": 3,
        "b": 0,
        "d": 1,
        "g": 2,
        "f": 2,
        "s": 3,
        "ʃ": 4,
        "v": 1,
        "z": 2,
        "ʒ": 3,
        "m": 2,
        "n": 3,
        "ɲ": 4,
        "l": 2,
        "R": 3
    },
    "d": {
        "p": 2,
        "t": 1,
        "k": 2,
        "b": 1,
        "d": 0,
        "g": 1,
        "f": 3,
        "s": 2,
        "ʃ": 3,
        "v": 2,
        "z": 1,
        "ʒ": 2,
        "m": 3,
        "n": 2,
        "ɲ": 3,
        "l": 1,
        "R": 2
    },
    "g": {
        "p": 3,
        "t": 2,
        "k": 1,
        "b": 2,
        "d": 1,
        "g": 0,
        "f": 4,
        "s": 3,
        "ʃ": 2,
        "v": 3,
        "z": 2,
        "ʒ": 1,
        "m": 4,
        "n": 3,
        "ɲ": 2,
        "l": 2,
        "R": 3
    },
    "f": {
        "p": 1,
        "t": 2,
        "k": 3,
        "b": 2,
        "d": 3,
        "g": 4,
        "f": 0,
        "s": 1,
        "ʃ": 2,
        "v": 1,
        "z": 2,
        "ʒ": 3,
        "m": 4,
        "n": 5,
        "ɲ": 6,
        "l": 4,
        "R": 3
    },
    "s": {
        "p": 2,
        "t": 1,
        "k": 2,
        "b": 3,
        "d": 2,
        "g": 3,
        "f": 1,
        "s": 0,
        "ʃ": 1,
        "v": 2,
        "z": 1,
        "ʒ": 2,
        "m": 5,
        "n": 4,
        "ɲ": 5,
        "l": 3,
        "R": 2
    },
    "ʃ": {
        "p": 3,
        "t": 2,
        "k": 1,
        "b": 4,
        "d": 3,
        "g": 2,
        "f": 2,
        "s": 1,
        "ʃ": 0,
        "v": 3,
        "z": 2,
        "ʒ": 1,
        "m": 6,
        "n": 5,
        "ɲ": 4,
        "l": 4,
        "R": 3
    },
    "v": {
        "p": 2,
        "t": 3,
        "k": 4,
        "b": 1,
        "d": 2,
        "g": 3,
        "f": 1,
        "s": 2,
        "ʃ": 3,
        "v": 0,
        "z": 1,
        "ʒ": 2,
        "m": 3,
        "n": 4,
        "ɲ": 5,
        "l": 3,
        "R": 2
    },
    "z": {
        "p": 3,
        "t": 2,
        "k": 3,
        "b": 2,
        "d": 1,
        "g": 2,
        "f": 2,
        "s": 1,
        "ʃ": 2,
        "v": 1,
        "z": 0,
        "ʒ": 1,
        "m": 4,
        "n": 3,
        "ɲ": 4,
        "l": 2,
        "R": 1
    },
    "ʒ": {
        "p": 4,
        "t": 3,
        "k": 2,
        "b": 3,
        "d": 2,
        "g": 1,
        "f": 3,
        "s": 2,
        "ʃ": 1,
        "v": 2,
        "z": 1,
        "ʒ": 0,
        "m": 5,
        "n": 4,
        "ɲ": 3,
        "l": 3,
        "R": 2
    },
    "m": {
        "p": 3,
        "t": 4,
        "k": 5,
        "b": 2,
        "d": 3,
        "g": 4,
        "f": 4,
        "s": 5,
        "ʃ": 6,
        "v": 3,
        "z": 4,
        "ʒ": 5,
        "m": 0,
        "n": 1,
        "ɲ": 2,
        "l": 2,
        "R": 3
    },
    "n": {
        "p": 4,
        "t": 3,
        "k": 4,
        "b": 3,
        "d": 2,
        "g": 3,
        "f": 5,
        "s": 4,
        "ʃ": 5,
        "v": 4,
        "z": 3,
        "ʒ": 4,
        "m": 1,
        "n": 0,
        "ɲ": 1,
        "l": 1,
        "R": 2
    },
    "ɲ": {
        "p": 5,
        "t": 4,
        "k": 3,
        "b": 4,
        "d": 3,
        "g": 2,
        "f": 6,
        "s": 5,
        "ʃ": 4,
        "v": 5,
        "z": 4,
        "ʒ": 3,
        "m": 2,
        "n": 1,
        "ɲ": 0,
        "l": 2,
        "R": 3
    },
    "l": {
        "p": 3,
        "t": 2,
        "k": 3,
        "b": 2,
        "d": 1,
        "g": 2,
        "f": 4,
        "s": 3,
        "ʃ": 4,
        "v": 3,
        "z": 2,
        "ʒ": 3,
        "m": 2,
        "n": 1,
        "ɲ": 2,
        "l": 0,
        "R": 1
    },
    "R": {
        "p": 4,
        "t": 3,
        "k": 4,
        "b": 3,
        "d": 2,
        "g": 3,
        "f": 3,
        "s": 2,
        "ʃ": 3,
        "v": 2,
        "z": 1,
        "ʒ": 2,
        "m": 3,
        "n": 2,
        "ɲ": 3,
        "l": 1,
        "R": 0
    }
}

const vowelCostMatrix: Record<string, Record<string, number>> = {
    "a": {
        "a": 0,
        "i": 3,
        "u": 3,
        "o": 2,
        "e": 2,
        "y": 4,
        "ø": 3,
        "ɛ": 1,
        "ɔ": 1,
        "œ": 2,
        "ã": 1,
        "ɛ̃": 2,
        "ɔ̃": 2,
        "œ̃": 3,
        "Ê": 1,
        "Ô": 1,
        "Û": 2,
        "µ": 2,
        "&": 1
    },
    "i": {
        "a": 3,
        "i": 0,
        "u": 2,
        "o": 3,
        "e": 1,
        "y": 1,
        "ø": 2,
        "ɛ": 2,
        "ɔ": 4,
        "œ": 3,
        "ã": 4,
        "ɛ̃": 3,
        "ɔ̃": 5,
        "œ̃": 4,
        "Ê": 1,
        "Ô": 3,
        "Û": 2,
        "µ": 3,
        "&": 1
    },
    "u": {
        "a": 3,
        "i": 2,
        "u": 0,
        "o": 1,
        "e": 3,
        "y": 1,
        "ø": 2,
        "ɛ": 4,
        "ɔ": 2,
        "œ": 3,
        "ã": 4,
        "ɛ̃": 5,
        "ɔ̃": 3,
        "œ̃": 4,
        "Ê": 3,
        "Ô": 1,
        "Û": 2,
        "µ": 4,
        "&": 2
    },
    "o": {
        "a": 2,
        "i": 3,
        "u": 1,
        "o": 0,
        "e": 2,
        "y": 2,
        "ø": 1,
        "ɛ": 3,
        "ɔ": 1,
        "œ": 2,
        "ã": 3,
        "ɛ̃": 4,
        "ɔ̃": 2,
        "œ̃": 3,
        "Ê": 2,
        "Ô": 0,
        "Û": 1,
        "µ": 3,
        "&": 1
    },
    "e": {
        "a": 2,
        "i": 1,
        "u": 3,
        "o": 2,
        "e": 0,
        "y": 2,
        "ø": 1,
        "ɛ": 1,
        "ɔ": 3,
        "œ": 2,
        "ã": 3,
        "ɛ̃": 2,
        "ɔ̃": 4,
        "œ̃": 3,
        "Ê": 0,
        "Ô": 2,
        "Û": 1,
        "µ": 2,
        "&": 0
    },
    "y": {
        "a": 4,
        "i": 1,
        "u": 1,
        "o": 2,
        "e": 2,
        "y": 0,
        "ø": 1,
        "ɛ": 3,
        "ɔ": 3,
        "œ": 2,
        "ã": 5,
        "ɛ̃": 4,
        "ɔ̃": 4,
        "œ̃": 3,
        "Ê": 2,
        "Ô": 2,
        "Û": 1,
        "µ": 3,
        "&": 1
    },
    "ø": {
        "a": 3,
        "i": 2,
        "u": 2,
        "o": 1,
        "e": 1,
        "y": 1,
        "ø": 0,
        "ɛ": 2,
        "ɔ": 2,
        "œ": 1,
        "ã": 4,
        "ɛ̃": 3,
        "ɔ̃": 3,
        "œ̃": 2,
        "Ê": 1,
        "Ô": 1,
        "Û": 0,
        "µ": 2,
        "&": 0
    },
    "ɛ": {
        "a": 1,
        "i": 2,
        "u": 4,
        "o": 3,
        "e": 1,
        "y": 3,
        "ø": 2,
        "ɛ": 0,
        "ɔ": 2,
        "œ": 1,
        "ã": 2,
        "ɛ̃": 1,
        "ɔ̃": 3,
        "œ̃": 2,
        "Ê": 0,
        "Ô": 2,
        "Û": 1,
        "µ": 1,
        "&": 0
    },
    "ɔ": {
        "a": 1,
        "i": 4,
        "u": 2,
        "o": 1,
        "e": 3,
        "y": 3,
        "ø": 2,
        "ɛ": 2,
        "ɔ": 0,
        "œ": 1,
        "ã": 2,
        "ɛ̃": 3,
        "ɔ̃": 1,
        "œ̃": 2,
        "Ê": 2,
        "Ô": 0,
        "Û": 1,
        "µ": 2,
        "&": 1
    },
    "œ": {
        "a": 2,
        "i": 3,
        "u": 3,
        "o": 2,
        "e": 2,
        "y": 2,
        "ø": 1,
        "ɛ": 1,
        "ɔ": 1,
        "œ": 0,
        "ã": 3,
        "ɛ̃": 2,
        "ɔ̃": 2,
        "œ̃": 1,
        "Ê": 1,
        "Ô": 1,
        "Û": 0,
        "µ": 1,
        "&": 0
    },
    "ã": {
        "a": 1,
        "i": 4,
        "u": 4,
        "o": 3,
        "e": 3,
        "y": 5,
        "ø": 4,
        "ɛ": 2,
        "ɔ": 2,
        "œ": 3,
        "ã": 0,
        "ɛ̃": 1,
        "ɔ̃": 1,
        "œ̃": 2,
        "Ê": 2,
        "Ô": 2,
        "Û": 3,
        "µ": 1,
        "&": 2
    },
    "ɛ̃": {
        "a": 2,
        "i": 3,
        "u": 5,
        "o": 4,
        "e": 2,
        "y": 4,
        "ø": 3,
        "ɛ": 1,
        "ɔ": 3,
        "œ": 2,
        "ã": 1,
        "ɛ̃": 0,
        "ɔ̃": 2,
        "œ̃": 1,
        "Ê": 1,
        "Ô": 3,
        "Û": 2,
        "µ": 0,
        "&": 1
    },
    "ɔ̃": {
        "a": 2,
        "i": 5,
        "u": 3,
        "o": 2,
        "e": 4,
        "y": 4,
        "ø": 3,
        "ɛ": 3,
        "ɔ": 1,
        "œ": 2,
        "ã": 1,
        "ɛ̃": 2,
        "ɔ̃": 0,
        "œ̃": 1,
        "Ê": 3,
        "Ô": 1,
        "Û": 2,
        "µ": 1,
        "&": 2
    },
    "œ̃": {
        "a": 3,
        "i": 4,
        "u": 4,
        "o": 3,
        "e": 3,
        "y": 3,
        "ø": 2,
        "ɛ": 2,
        "ɔ": 2,
        "œ": 1,
        "ã": 2,
        "ɛ̃": 1,
        "ɔ̃": 1,
        "œ̃": 0,
        "Ê": 2,
        "Ô": 2,
        "Û": 1,
        "µ": 0,
        "&": 1
    },
    "Ê": {
        "a": 1,
        "i": 1,
        "u": 3,
        "o": 2,
        "e": 0,
        "y": 2,
        "ø": 1,
        "ɛ": 0,
        "ɔ": 2,
        "œ": 1,
        "ã": 2,
        "ɛ̃": 1,
        "ɔ̃": 3,
        "œ̃": 2,
        "Ê": 0,
        "Ô": 2,
        "Û": 1,
        "µ": 1,
        "&": 0
    },
    "Ô": {
        "a": 1,
        "i": 3,
        "u": 1,
        "o": 0,
        "e": 2,
        "y": 2,
        "ø": 1,
        "ɛ": 2,
        "ɔ": 0,
        "œ": 1,
        "ã": 2,
        "ɛ̃": 3,
        "ɔ̃": 1,
        "œ̃": 2,
        "Ê": 2,
        "Ô": 0,
        "Û": 1,
        "µ": 2,
        "&": 1
    },
    "Û": {
        "a": 2,
        "i": 2,
        "u": 2,
        "o": 1,
        "e": 1,
        "y": 1,
        "ø": 0,
        "ɛ": 1,
        "ɔ": 1,
        "œ": 0,
        "ã": 3,
        "ɛ̃": 2,
        "ɔ̃": 2,
        "œ̃": 1,
        "Ê": 1,
        "Ô": 1,
        "Û": 0,
        "µ": 1,
        "&": 0
    },
    "µ": {
        "a": 2,
        "i": 3,
        "u": 4,
        "o": 3,
        "e": 2,
        "y": 3,
        "ø": 2,
        "ɛ": 1,
        "ɔ": 2,
        "œ": 1,
        "ã": 1,
        "ɛ̃": 0,
        "ɔ̃": 1,
        "œ̃": 0,
        "Ê": 1,
        "Ô": 2,
        "Û": 1,
        "µ": 0,
        "&": 1
    },
    "&": {
        "a": 1,
        "i": 1,
        "u": 2,
        "o": 1,
        "e": 0,
        "y": 1,
        "ø": 0,
        "ɛ": 0,
        "ɔ": 1,
        "œ": 0,
        "ã": 2,
        "ɛ̃": 1,
        "ɔ̃": 2,
        "œ̃": 1,
        "Ê": 0,
        "Ô": 1,
        "Û": 0,
        "µ": 1,
        "&": 0
    }
}

function getCost(char1: string, char2: string): number {
    if (char1 === char2) {
        return 0;
    }
    else if (char1 in consonantsCostsMatrix && char2 in consonantsCostsMatrix) {
        return consonantsCostsMatrix[char1][char2];
    } else if (char1 in vowelCostMatrix && char2 in vowelCostMatrix) {
        return vowelCostMatrix[char1][char2];
    }else if( char1== " " || char2 == " "){
        return 4;
    }
    return 9;
}

function createWagnerFischerMatrix(str1: string, str2: string) {

    let distances: Array<Array<number>> = [];

    for (let index = 0; index < str2.length; index++) {
        distances[index] = [];
        for (let index2 = 0; index2 < str1.length; index2++) {
            distances[index][index2] = getCost(str1[index], str2[index2]);
        }

    }

    return distances;
}

function getWagnerFischerScore(str1: string, str2: string) {
    let str1Clean = str1.replace(/\s+/g, '');
    // let str2Clean = str2.replace(/\s+/g, '');

    const matrix = createWagnerFischerMatrix(str1, str2);
    let i = 0;
    let j = 0;
    let totalDistance = 0;
    while (i < matrix.length || j < matrix[0].length) {
        totalDistance += matrix[i][j];
        let right = 12, down = 12, next = 12;
        if (i < matrix.length-1 && j < matrix[0].length-1) {
            next = matrix[i + 1][j + 1];

        }
        if (i < matrix.length-1) {
            down = matrix[i + 1][j];
        }
        if (j < matrix[0].length-1) {
            right = matrix[i][j + 1];

        }

        if (next <= down && next <= right) {
            i++;
            j++;
        }
        else if (down <= right) {
            i++;
        } else {
            j++;
        }


    }
    const stringDistance = str1Clean.length * 9;
    const emptyStringDistance = (str1.length-str1Clean.length)*4;
    const reversePuntuation = totalDistance / (stringDistance+emptyStringDistance);
    return 1 - (reversePuntuation);
}

function getWagnerFischerScoreWithoutSpaces(str1: string, str2: string) {
    let str1Clean = str1.replace(/\s+/g, '');
    let str2Clean = str2.replace(/\s+/g, '');

    const matrix = createWagnerFischerMatrix(str1Clean, str2Clean);
    let i = 0;
    let j = 0;
    let totalDistance = 0;
    while (i < matrix.length || j < matrix[0].length) {
        totalDistance += matrix[i][j];
        let right = 12, down = 12, next = 12;
        if (i < matrix.length-1 && j < matrix[0].length-1) {
            next = matrix[i + 1][j + 1];

        }
        if (i < matrix.length-1) {
            down = matrix[i + 1][j];
        }
        if (j < matrix[0].length-1) {
            right = matrix[i][j + 1];

        }

        if (next <= down && next <= right) {
            i++;
            j++;
        }
        else if (down <= right) {
            i++;
        } else {
            j++;
        }


    }
    const stringDistance = str1Clean.length * 9;
    const reversePuntuation = totalDistance / (stringDistance);
    return 1 - (reversePuntuation);
}

export { createWagnerFischerMatrix, getWagnerFischerScore,getWagnerFischerScoreWithoutSpaces };