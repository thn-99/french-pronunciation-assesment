import { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Result } from '../openIpa/constants/Interfaces';
import parseFrench from '../openIpa/transcription/french/ParseFrench';
import { compareTwoStrings } from 'string-similarity';
import { Box, Center, Circle, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { FaMicrophone } from 'react-icons/fa'
import { getWagnerFischerScore, getWagnerFischerScoreWithoutSpaces } from '../utils/WagnerFischerUtils';
const Dictaphone = () => {
  const [lastListeningState, setLastListeningState] = useState(false);
  const [givenTextWordsPhonemes, setGivenTextWordsPhonemes] = useState<string>();
  const [transcriptWordsPhonemes, setTranscriptWordsPhonemes] = useState<string>();
  const [wordsPuntuation, setWordsPuntuation] = useState<number>();
  const [phonemesPuntuation, setPhonemesPuntuation] = useState<number>();
  const [phonemesPuntuationWagnerFischer, setPhonemesPuntuationWagnerFischer] = useState<number>();
  const [phonemesPuntuationWagnerFischerWithoutSpaces, setPhonemesPuntuationWagnerFischerWithoutSpaces] = useState<number>();

  const givenText = useRef<HTMLInputElement>(null);
  const {
    transcript,
    listening,
    resetTranscript
  } = useSpeechRecognition();

  useEffect(() => {
    if (lastListeningState && !listening) {
      convertAndScore();
    }
    setLastListeningState(listening);
  }, [listening])





  const onListeningToggle = () => {
    if (!listening) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false, language: 'fr-FR' });
    }else{
      SpeechRecognition.stopListening();
    }
  }

  const convertAndScore = () => {
    let givenTextValue = '';
    if (givenText.current) {
      givenTextValue = givenText.current.value;
    }else{
      return;
    }

    if(givenTextValue==='' || transcript===''){
      return;
    }

    const givenTextConverted = parseFrench(givenTextValue, true, false);
    const transcriptConverted = parseFrench(transcript, true, false);


    const givenPhonemesText = getStringFromConversionToIpaResult(givenTextConverted);
    setGivenTextWordsPhonemes(givenPhonemesText);


    const transPhonemesText = getStringFromConversionToIpaResult(transcriptConverted);
    setTranscriptWordsPhonemes(transPhonemesText);


    const wordPunt = compareTwoStrings(transcript, givenTextValue);
    setWordsPuntuation(wordPunt);

    const phonemesPunt = compareTwoStrings(transPhonemesText, givenPhonemesText);
    setPhonemesPuntuation(phonemesPunt);
    ;
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





  return (
    <Box>
      <Input ref={givenText} isDisabled={listening} defaultValue='je aime vous'></Input>
      <Center>
        <Circle size={'50px'} onClick={onListeningToggle} backgroundColor={listening ? 'green' : 'red'} >
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