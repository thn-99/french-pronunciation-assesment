import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Result } from '../openIpa/constants/Interfaces';
import parseFrench from '../openIpa/transcription/french/ParseFrench';
import { compareTwoStrings } from 'string-similarity';
import { Box, Button, Center, Circle, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { FaMicrophone } from 'react-icons/fa'
import { getWagnerFischerScore, getWagnerFischerScoreWithoutSpaces } from '../utils/WagnerFischerUtils';
import VolumeMeter from './VolumeMeter';
import WordColorScore from './WordColorScore';
import { speak } from './TextToSpeech';
import RealTimeValidation from './RealTimeValidation';
const speechSynt = window.speechSynthesis;
var writtenNumber = require('written-number');

export interface WordsComparison {
  givenWord?: string,
  convertedWord?: string,
  error?: number,
  index: number,
  scored: boolean,

}

const Dictaphone = () => {
  const [lastListeningState, setLastListeningState] = useState(false);
  const [givenTextWordsPhonemes, setGivenTextWordsPhonemes] = useState<string>();
  const [transcriptWordsPhonemes, setTranscriptWordsPhonemes] = useState<string>();
  const [wordsPuntuation, setWordsPuntuation] = useState<number>();
  const [phonemesPuntuation, setPhonemesPuntuation] = useState<number>();
  const [phonemesPuntuationWagnerFischer, setPhonemesPuntuationWagnerFischer] = useState<number>();
  const [phonemesPuntuationWagnerFischerWithoutSpaces, setPhonemesPuntuationWagnerFischerWithoutSpaces] = useState<number>();
  const [finalTextComparison, setFinalTextComparison] = useState<WordsComparison[]>();
  const [givenText,SetGivenText] = useState<string>();
  const givenTextRef = useRef<HTMLInputElement>(null);

  const {
    transcript,
    listening,
    resetTranscript
  } = useSpeechRecognition();


  //Assigns the default input to the clean input
  useEffect(()=>{
    onInputChange();
  },[])

  //To call the scoring method when finished to listen
  useEffect(() => {
    if (lastListeningState && !listening) {
      convertAndScore();
    }
    setLastListeningState(listening);
  }, [listening])

  //Every time the input changes, cleans the new input and set's to givenText, resets transcript and Finalcomparison.
  function onInputChange(){
    if(givenTextRef.current){
      const cleanedText = givenTextRef.current.value.replace(/[.,/#!$%^&*;:{}=_`~()]/g, "");
      SetGivenText(cleanedText);
    }else{
      SetGivenText(undefined);
    }
    setFinalTextComparison(undefined);
    resetTranscript();
  }


  const onListeningToggle = async () => {
    if (!listening) {
      resetTranscript();
      setFinalTextComparison(undefined);
      SpeechRecognition.startListening({ continuous: true, language: 'fr-FR' });


    } else {
      SpeechRecognition.stopListening();
    }
  }

  function replaceNumbersByWordsInString(str:string){
    const splittedStr = str.split(" ");
    splittedStr.forEach(word => {
      const number = parseInt(word);
      if(number != NaN){
        word=writtenNumber(number);
      }
    })
    return splittedStr.join(" ");
  }

  const convertAndScore = () => {


    if (!givenText) {
      return;

    }

    if (givenText == '' || transcript == '') {
      return;
    }
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

    setFinalTextComparison(textComparison);

    const givenTextConverted = parseFrench(givenText, true, false);
    const transcriptConverted = parseFrench(transcript, true, false);


    const givenPhonemesText = getStringFromConversionToIpaResult(givenTextConverted);
    setGivenTextWordsPhonemes(givenPhonemesText);


    const transPhonemesText = getStringFromConversionToIpaResult(transcriptConverted);
    setTranscriptWordsPhonemes(transPhonemesText);


    const wordPunt = compareTwoStrings(transcript, givenText);
    setWordsPuntuation(wordPunt);

    const phonemesPunt = compareTwoStrings(transPhonemesText, givenPhonemesText);
    setPhonemesPuntuation(phonemesPunt);

    const WagnerFischerDistance = getWagnerFischerScore(givenPhonemesText, transPhonemesText);
    setPhonemesPuntuationWagnerFischer(WagnerFischerDistance)
    const WagnerFischerDistanceWithoutSpaces = getWagnerFischerScoreWithoutSpaces(givenPhonemesText, transPhonemesText);
    setPhonemesPuntuationWagnerFischerWithoutSpaces(WagnerFischerDistanceWithoutSpaces)

  }


  function getStringFromConversionToIpaResult(conversionResult: Result): string {
    let resultText = '';
    conversionResult.lines[0].words.forEach((word) => {
      word.syllables.forEach((syl) => {
        resultText += syl.ipa;
      })
    })
    return resultText;
  }





  function playGivenText() {
    if (givenText && givenText !== '') {
      speak(givenText, speechSynt);
    }
  }


  return (
    <Box>
      <Input ref={givenTextRef} isDisabled={listening} onChange={onInputChange} defaultValue='je aime vous'></Input>
      <Button onClick={playGivenText}>Play</Button>
      <Center>
        <Circle size={'60px'} onClick={onListeningToggle} backgroundColor={listening ? 'green' : 'red'} >
          
          {listening ? <VolumeMeter /> : <FaMicrophone />}
        </Circle>
      </Center>
      <Center>
    <div>{givenText && !finalTextComparison ? <RealTimeValidation givenText={givenText} transcript={transcript} />:null}</div>
    <div>{finalTextComparison ? <WordColorScore wordsComparison={finalTextComparison} /> : null }</div>
    </Center>

      <Box mt={6}>
        <Heading textAlign={'left'}>Comparison by words</Heading>
        <Flex textAlign={'left'}>
          <Box width={'25%'}>
            <Text>Given text:</Text>
          </Box>
          <Box width={'75%'}>
            <Text>{givenText}</Text>
          </Box>
        </Flex>
        <Flex textAlign={'left'}>
          <Box width={'25%'}>
            <Text>Converted text:</Text>
          </Box>
          <Box width={'75%'}>
            <Text>{replaceNumbersByWordsInString(transcript)}</Text>
          </Box>
        </Flex>
        <Flex textAlign={'left'}>
          <Box width={'25%'}>
            <Text>Score:</Text>
          </Box>
          <Box width={'75%'}>
            <Text>{wordsPuntuation}</Text>
          </Box>
        </Flex>
      </Box>

      <Box mt={6}>
        <Heading textAlign={'left'}>Comparison by phonemes</Heading>
        <Flex textAlign={'left'}>
          <Box width={'25%'}>
            <Text>Given text phonemes:</Text>
          </Box>
          <Box width={'75%'}>
            <Text>{givenTextWordsPhonemes}</Text>
          </Box>
        </Flex>
        <Flex textAlign={'left'}>
          <Box width={'25%'}>
            <Text>Converted text phonemes:</Text>
          </Box>
          <Box width={'75%'}>
            <Text>{transcriptWordsPhonemes}</Text>
          </Box>
        </Flex>
        <Flex textAlign={'left'}>
          <Box width={'25%'}>
            <Text>Score:</Text>
          </Box>
          <Box width={'75%'}>
            <Text>{phonemesPuntuation}</Text>
          </Box>
        </Flex>
        <Flex textAlign={'left'}>
          <Box width={'25%'}>
            <Text>WagnerFischer With spaces:</Text>
          </Box>
          <Box width={'75%'}>
            <Text>{phonemesPuntuationWagnerFischer}</Text>
          </Box>
        </Flex>
        <Flex textAlign={'left'}>
          <Box width={'25%'}>
            <Text>WagnerFischer W/O spaces:</Text>
          </Box>
          <Box width={'75%'}>
            <Text>{phonemesPuntuationWagnerFischerWithoutSpaces}</Text>
          </Box>
        </Flex>
      </Box>

    </Box>
  );
};
export default Dictaphone;
