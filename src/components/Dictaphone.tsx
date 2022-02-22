import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import parseFrench from '../openIpa/transcription/french/ParseFrench';
import { compareTwoStrings } from 'string-similarity';
import { Box, Button, Center, Circle, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { FaMicrophone } from 'react-icons/fa'
import { getWagnerFischerScore, getWagnerFischerScoreWithoutSpaces } from '../utils/WagnerFischerUtils';
import VolumeMeter from './VolumeMeter';
import WordColorScore from './WordColorScore';
import { speak } from '../utils/TextToSpeech';
import RealTimeValidation from './RealTimeValidation';
import { getStringFromConversionToIpaResult, groupWordsByError, replaceNumbersByWordsInString, WordsComparison } from '../utils/SpeechToTextUtils';
const speechSynt = window.speechSynthesis;


const Dictaphone = () => {
  const [lastListeningState, setLastListeningState] = useState(false);
  const [givenTextWordsPhonemes, setGivenTextWordsPhonemes] = useState<string>();
  const [transcriptWordsPhonemes, setTranscriptWordsPhonemes] = useState<string>();
  const [wordsPuntuation, setWordsPuntuation] = useState<number>();
  const [phonemesPuntuation, setPhonemesPuntuation] = useState<number>();
  const [phonemesPuntuationWagnerFischer, setPhonemesPuntuationWagnerFischer] = useState<number>();
  const [phonemesPuntuationWagnerFischerWithoutSpaces, setPhonemesPuntuationWagnerFischerWithoutSpaces] = useState<number>();
  const [finalTextComparison, setFinalTextComparison] = useState<WordsComparison[]>();
  const [givenText, SetGivenText] = useState<string>();
  const givenTextRef = useRef<HTMLInputElement>(null);

  // custom hook for the webSpeecApi for Typescript to manage the states of the WebSpeechApi states
  const {
    transcript, //The transcripted text as the user speaks, readonly : string
    listening, // Changes whenever the user starts the listening process, or stops it, readonly : boolean
    resetTranscript // function to reset the transcript value
  } = useSpeechRecognition();


  //Assigns the default input to the clean input
  useEffect(() => {
    onInputChange();
  }, [])

  //To call the scoring method when finished to listen
  useEffect(() => {
    if (lastListeningState && !listening) {
      convertAndScore();
    }
    setLastListeningState(listening);
  }, [listening])

  // cleans the new input from the html input and assigns it to givenText, resets transcript and Finalcomparison.
  function onInputChange() {
    if (givenTextRef.current) {
      const cleanedText = givenTextRef.current.value.replace(/[.,/#!$%^&*;:{}=_`~()]/g, "");
      SetGivenText(cleanedText);
    } else {
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



  const convertAndScore = () => {


    if (!givenText) {
      return;

    }

    if (givenText == '' || transcript == '') {
      return;
    }
    const textComparison = groupWordsByError(givenText, transcript);

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
        <div>{givenText && !finalTextComparison ? <RealTimeValidation givenText={givenText} transcript={transcript} /> : null}</div>
        <div>{finalTextComparison ? <WordColorScore wordsComparison={finalTextComparison} /> : null}</div>
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


