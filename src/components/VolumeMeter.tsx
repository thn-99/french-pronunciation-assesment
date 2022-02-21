import { Circle } from "@chakra-ui/react";
import React,{ useEffect, useState } from "react";

const VolumeMeter = () => {



    const [microphoneLoudness, setMicrophoneLoudness] = useState<number>();
    let microPhoneIntervalHolder: any = null;


    useEffect(() => {
        startListening();
        return (): void => {
            clearInterval(microPhoneIntervalHolder);
            microPhoneIntervalHolder=null;
        }
    },[])

    async function startListening() {
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true
                }
            });
            const audioContext = new AudioContext();
            const audioSource = audioContext.createMediaStreamSource(audioStream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 512;
            analyser.minDecibels = -127;
            analyser.maxDecibels = 0;
            analyser.smoothingTimeConstant = 0.4;
            audioSource.connect(analyser);
            const volumes = new Uint8Array(analyser.frequencyBinCount);
            const volumeCallback = () => {
                analyser.getByteFrequencyData(volumes);
                let volumeSum = 0;
                for (const volume of volumes)
                    volumeSum += volume;
                setMicrophoneLoudness(volumeSum / volumes.length);
                // Value range: 127 = analyser.maxDecibels - analyser.minDecibels;
            };
            microPhoneIntervalHolder = setInterval(volumeCallback, 50);
        } catch (e) {
            console.error('Failed get microphone volume', e);
        }

    }





    return (
        <Circle size={(microphoneLoudness?microphoneLoudness*0.4:20) + 'px'} bg="black" ></Circle>
    )
}

export default VolumeMeter;