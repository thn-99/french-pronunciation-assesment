import { Result } from "../openIpa/constants/Interfaces";
import parseFrench from "../openIpa/transcription/french/ParseFrench";
import { getWagnerFischerScore } from "./WagnerFischerUtils";

  

function getStringFromConversionToIpaResult(conversionResult: Result): string {
    let resultText = '';
    conversionResult.lines[0].words.forEach((word) => {
        word.syllables.forEach((syl) => {
            resultText += syl.ipa;
        })
    })
    return resultText;
}


function replaceNumbersByWordsInString(str:string){
    var writtenNumber = require('written-number');
    writtenNumber.defaults.lang = 'fr';
    const splittedStr = str.split(" ");
    splittedStr.forEach((word,i,arr) => {
      const number = parseInt(word);
      if(!isNaN(number)){
        arr[i]=writtenNumber(number);
      }
    })
    return splittedStr.join(" ");
  }


  function groupWordsByError(givenText:string,transcript:string): WordsComparison[]{
    const textComparison: WordsComparison[] = [];
    const givenTextArray = givenText.split(" ");

    let givenTextLastPointer = 0, convertedTextLastPointer = 0;
    let lastIi = 0;

    const transcriptedTextArray = replaceNumbersByWordsInString(transcript).split(" ");
    

    transcriptedTextArray.forEach((word, index) => {
      let givenTextIndex = givenTextLastPointer;
      while (givenTextIndex < (index + 3 < givenTextArray.length ? index + 3 : givenTextArray.length)) {
        if (word === givenTextArray[givenTextIndex] || getStringFromConversionToIpaResult(parseFrench(word)) === getStringFromConversionToIpaResult(parseFrench(givenTextArray[givenTextIndex]))) {

          lastIi++;
          let hadMiddleFirst, hadMiddleSecond = false;
          while (givenTextLastPointer < givenTextIndex) {
            hadMiddleFirst = true;
            if (textComparison[lastIi]) {
              textComparison[lastIi].givenWord += ' ' + givenTextArray[givenTextLastPointer];
            } else {
              textComparison[lastIi] = { givenWord: givenTextArray[givenTextLastPointer], scored: false, index: lastIi };
            }
            givenTextLastPointer++;
          }

          while (convertedTextLastPointer < index) {
            hadMiddleSecond = true;
            if (textComparison[lastIi] && textComparison[lastIi].convertedWord) {
              textComparison[lastIi].convertedWord += ' ' + transcriptedTextArray[convertedTextLastPointer];
            } else if (textComparison[lastIi]) {
              textComparison[lastIi].convertedWord = transcriptedTextArray[convertedTextLastPointer];
            } else {
              textComparison[lastIi] = { convertedWord: transcriptedTextArray[convertedTextLastPointer], scored: false, index: lastIi };
            }
            convertedTextLastPointer++;
          }

          if (hadMiddleFirst || hadMiddleSecond) {
            lastIi++;
          }

          textComparison.push({ givenWord: givenTextArray[givenTextIndex], convertedWord: word, scored: true, index: lastIi, error: 0 });
          givenTextLastPointer++;
          convertedTextLastPointer++;



          return;
        }
        givenTextIndex++;

      }




    })
    if (givenTextLastPointer < givenTextArray.length || convertedTextLastPointer < transcriptedTextArray.length) {
      textComparison.push({ scored: false, index: ++lastIi });

      while (givenTextLastPointer < givenTextArray.length) {
        if (textComparison[textComparison.length-1].givenWord) {
          textComparison[textComparison.length-1].givenWord += ' ' + givenTextArray[givenTextLastPointer];
        } else {
          textComparison[textComparison.length-1].givenWord = givenTextArray[givenTextLastPointer];
        }
        givenTextLastPointer++;
      }

      while (convertedTextLastPointer < transcriptedTextArray.length) {
        if (textComparison[textComparison.length-1].convertedWord) {
          textComparison[textComparison.length-1].convertedWord += ' ' + transcriptedTextArray[convertedTextLastPointer];
        } else {
          textComparison[textComparison.length-1].convertedWord = transcriptedTextArray[convertedTextLastPointer];
        }
        convertedTextLastPointer++;
      }
    }

    textComparison.forEach((w) => {
      if (!w.scored && w.convertedWord && w.givenWord) {
        const givenTextPhonemesString = getStringFromConversionToIpaResult(parseFrench(w.givenWord));
        const convertedTextPhonemesString = getStringFromConversionToIpaResult(parseFrench(w.convertedWord));
        w.error = 1 - getWagnerFischerScore(givenTextPhonemesString, convertedTextPhonemesString);
        w.scored = true;
      }
    })


    textComparison.forEach((w) => {
      if (!w.scored) {
        w.error = 1;
      }
    });

    return textComparison;
  }

export {getStringFromConversionToIpaResult,replaceNumbersByWordsInString,groupWordsByError};

export interface WordsComparison {
    givenWord?: string,
    convertedWord?: string,
    error?: number,
    index: number,
    scored: boolean,
  
  }
