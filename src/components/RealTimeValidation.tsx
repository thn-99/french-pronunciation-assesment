import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Result } from "../openIpa/constants/Interfaces";
import parseFrench from "../openIpa/transcription/french/ParseFrench";

interface RealTimeValidationProps {
    givenText: string,
    transcript: string
}

const RealTimeValidation = ({ givenText, transcript }: { givenText: string, transcript: string }) => {
    const [givenTextLastReadIndex, SetGivenTextLastReadIndex] = useState<number>(0);
    const [transcriptLastDetectedIndex, SetTranscriptLastDetectedIndex] = useState<number>(0);
    const [boldText, setBoldText] = useState<string>();
    const [normalText, setNormalText] = useState<string>();
    useEffect(() => {
        if(givenText != "Press to start"){
            setNewgivenTextLastReadIndex();
        }else{
            setNormalText("Press to start");
        }
    }, [transcript])


    function getStringFromConversionToIpaResult(conversionResult: Result): string {
        let resultText = '';
        conversionResult.lines[0].words.forEach((word) => {
            word.syllables.forEach((syl) => {
                resultText += syl.ipa;
            })
        })
        return resultText;
    }
    function setNewgivenTextLastReadIndex() {
        const splittedGivenText = givenText.split(" ");
        const splittedTranscript = transcript.split(" ");
        let transcriptLastDetectedIndexLocal = transcriptLastDetectedIndex;
        let givenTextLastReadIndexLocal = givenTextLastReadIndex
        for (let splittedTranscriptIndex = transcriptLastDetectedIndex; splittedTranscriptIndex < splittedTranscript.length; splittedTranscriptIndex++) {

            for (let splittedGivenTextIndex = givenTextLastReadIndex; splittedGivenTextIndex < (splittedGivenText.length >= splittedTranscriptIndex + 3 ? splittedGivenText.length : splittedTranscriptIndex + 3); splittedGivenTextIndex++) {
                const transcriptWord = splittedTranscript[splittedTranscriptIndex];
                const givenTextWord = splittedGivenText[splittedGivenTextIndex];
                    if (transcript && givenTextWord && transcriptWord === givenTextWord ) {

                    transcriptLastDetectedIndexLocal = splittedTranscriptIndex+1;
                    givenTextLastReadIndexLocal = splittedGivenTextIndex+1;
                }

            }

        }


        const splittedGivenTextUntilNewIndex = splittedGivenText.slice(0, givenTextLastReadIndexLocal);
        setBoldText(splittedGivenTextUntilNewIndex.join(" "));

        if (givenTextLastReadIndexLocal + 1 < splittedGivenText.length) {
            const splittedGivenTexttAfterNewIndex = splittedGivenText.slice(givenTextLastReadIndexLocal);
            setNormalText(splittedGivenTexttAfterNewIndex.join(" "));
        } else {
            setNormalText(" ");
        }
        SetTranscriptLastDetectedIndex(transcriptLastDetectedIndexLocal);
        SetGivenTextLastReadIndex(givenTextLastReadIndexLocal);


    }
    return (
        <div>
            <strong>{boldText}</strong> &nbsp;{normalText}
        </div>
    )
}



export default RealTimeValidation;