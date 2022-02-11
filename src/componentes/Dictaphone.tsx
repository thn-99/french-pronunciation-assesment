import { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Result, Word } from '../openIpa/constants/Interfaces';
import parseFrench from '../openIpa/transcription/french/ParseFrench';
import { compareTwoStrings } from 'string-similarity';
import { Box, Center, Circle, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { FaMicrophone } from 'react-icons/fa'
import {  getWagnerFischerScore, makeWagnerFicherMatrix } from './costMatrix';
const Dictaphone = () => {
  const givenText = useRef<HTMLInputElement>(null);
  const {
    transcript,
    listening,
    resetTranscript
  } = useSpeechRecognition();

  const [lastListeningState, setLastListeningState] = useState(false);
  useEffect(() => {
    if (lastListeningState && !listening) {
      toPhonemes();
    }
    setLastListeningState(listening);
  }, [listening])


  const [givenTextWordsPhonemes, setgivenTextWordsPhonemes] = useState<string>();
  const [transcriptWordsPhonemes, settranscriptWordsPhonemes] = useState<string>();
  const [wordsPuntuation, setWordsPuntuation] = useState<number>();
  const [phonemesPuntuation, setPhonemesPuntuation] = useState<number>();
  const [phonemesPuntuationWagnerFischer,setPhonemesPuntuationWagnerFischer] = useState<number>();



  const onClickStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language: 'fr-FR' });
  }

  const toPhonemes = () => {

    let givenTextValue = '';
    if (givenText.current) {
      givenTextValue = givenText.current.value;
    }

    const givenTextConverted = parseFrench(givenTextValue, true, true);
    const transcriptConverted = parseFrench(transcript, true, true);


    let givenPhonemesText = getStringFromConversionToIpaResult(givenTextConverted);
    setgivenTextWordsPhonemes(givenPhonemesText);


    let transPhonemesText = getStringFromConversionToIpaResult(transcriptConverted);
    settranscriptWordsPhonemes(transPhonemesText);


    const wordPunt = compareTwoStrings(transcript, givenTextValue);
    setWordsPuntuation(wordPunt);

    const phonemesPunt = compareTwoStrings(transPhonemesText, givenPhonemesText);
    setPhonemesPuntuation(phonemesPunt);
    ;
    const WagnerFischerDistance =  getWagnerFischerScore(givenPhonemesText,transPhonemesText);
    setPhonemesPuntuationWagnerFischer(WagnerFischerDistance)
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





  return (
    <Box>
      <Input ref={givenText} isDisabled={listening} defaultValue='je aime vous'></Input>
      <Center>
        <Circle size={'50px'} onClick={onClickStart} backgroundColor={listening ? 'green' : 'red'} >
          <FaMicrophone />
        </Circle>
      </Center>



      <Box mt={6}>
        <Heading textAlign={'left'}>Comparison by words</Heading>
        <Flex textAlign={'left'}>
          <Box width={'25%'}>
            <Text>Given text:</Text>
          </Box>
          <Box width={'75%'}>
            <Text>{givenText.current?.value}</Text>
          </Box>
        </Flex>
        <Flex textAlign={'left'}>
          <Box width={'25%'}>
            <Text>Converted text:</Text>
          </Box>
          <Box width={'75%'}>
            <Text>{transcript}</Text>
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
            <Text>ScoreFischer:</Text>
          </Box>
          <Box width={'75%'}>
            <Text>{phonemesPuntuationWagnerFischer}</Text>
          </Box>
        </Flex>
      </Box>

    </Box>
  );
};
export default Dictaphone;
