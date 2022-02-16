let frenchVoice: SpeechSynthesisVoice;
function getFrenchVoice(synth: SpeechSynthesis) {
    synth.getVoices().forEach((value) => {
        if (value.lang.toLowerCase().includes('fr')) {
            frenchVoice = value;
        }
    })
}

async function speak(textToRead: string, synth: SpeechSynthesis) {
    if (!frenchVoice) {
        getFrenchVoice(synth);
    }
    if (synth.speaking) {
        console.error("speechSynthesis.speaking")
        return
    }
    if (textToRead !== "") {
        const utterThis = new SpeechSynthesisUtterance(textToRead)
        // utterThis.onend = function (event) {
        //   onEndCallback("_play")
        // }
        // , onEndCallback: (status: string) => void,
        utterThis.onerror = function (event) {
            console.error("SpeechSynthesisUtterance.onerror")
        }
        // utterThis.voice = voices[0]
        utterThis.pitch = 1;
        utterThis.rate = 1;
        utterThis.voice = frenchVoice;

        synth.speak(utterThis);
    }

}

export {speak};