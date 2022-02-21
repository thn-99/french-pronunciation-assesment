import { useEffect, useState } from "react";


const RealTimeValidation = ({ givenText, transcript }: { givenText: string, transcript: string }) => {
    const [givenTextLastReadIndex, SetGivenTextLastReadIndex] = useState<number>(0);
    const [transcriptLastDetectedIndex, SetTranscriptLastDetectedIndex] = useState<number>(0);
    const [boldText, setBoldText] = useState<string>();
    const [normalText, setNormalText] = useState<string>();
    

    useEffect(() => {
            setNewIndexesAndText();
    }, [transcript,givenText])


    function setNewIndexesAndText() {
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
        if(givenTextLastReadIndexLocal<splittedTranscript.length-3 && givenTextLastReadIndexLocal+2<splittedGivenText.length ){
            givenTextLastReadIndexLocal+=2;
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
        <>
            <strong>{boldText}</strong> &nbsp;{normalText}
        </>
    )
}



export default RealTimeValidation;