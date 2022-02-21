/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { WordsComparison } from "../utils/SpeechToTextUtils";

const WordColorScore = (props: any) => {

    function getColor(error: number | undefined): string {
        if (typeof error === 'number' && error !== undefined) {
            if (error >= 0.7) {
                return "red";
            } else if (error > 0.3) {
                return "orange";
            } else {
                return "green";
            }
        } else {
            return "red"
        }
    }

    function getColoredWord(word: WordsComparison) {

        if (word.givenWord && word.convertedWord) {
            return <Text key={word.index} color={getColor(word.error)} >{word.givenWord}&nbsp;</Text>
        } else if (word.givenWord) {
            return <Text key={word.index} color={"red"}>{word.givenWord}&nbsp;</Text>
        } else {
            return <Text key={word.index} color={"red"} >_&nbsp;</Text>
        }
    }

    function getScoreOfWordComparison(words: WordsComparison[]) {
        const totalError: number = words.reduce((totalError: number, word) => {
            if (word.error !== undefined) { return totalError += word.error } else { return 1 }
        }, 0);

        return 1 - (totalError / words.length);
    }

    return (

        <Box>
            <Flex>
                {props.wordsComparison && props.wordsComparison.map(getColoredWord)}
            </Flex>
            <Box>
                <Text>Accuracy </Text><Text>{getScoreOfWordComparison(props.wordsComparison).toFixed(2)}</Text>
            </Box>
        </Box>
    )
}

export default WordColorScore;