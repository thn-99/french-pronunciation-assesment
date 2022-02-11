import './App.css';
import Dictaphone from './componentes/Dictaphone';
import { Box, Center, Text } from '@chakra-ui/react';
import { useSpeechRecognition } from 'react-speech-recognition';

function App() {

  const {
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <Center>
        <Box>
          <Text>Browser doesn't support speech recognition</Text>
        </Box>
      </Center>
    );
  } else {

    return (
      <Box className="App" width='60%' margin='auto'>
        <Dictaphone />
      </Box>
    );
  }
}

export default App;
