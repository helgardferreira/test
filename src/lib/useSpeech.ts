import { useCallback, useEffect, useState } from 'react';
import { createSpeechEngine, PlayingState, SpeechEngine } from './speech';

const useSpeech = (sentences: Array<string>) => {
    /*
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
  */
    const [playingState, setPlayingState] = useState('initialized');
    const [currentSentence, setCurrentSentence] = useState('');
    const [currentWord, setCurrentWord] = useState('');
    const [counter, setCounter] = useState(0);

    const onBoundary = (e: SpeechSynthesisEvent) => {
        console.log(e);
        const currentsen = sentences[counter];

        let cur = currentsen.substr(e.charIndex, e.charLength);
        console.log(cur);
        setCurrentWord(cur);
    };
    const onEnd = (e: SpeechSynthesisEvent) => {
        setCounter((counter) => counter + 1);
    };
    const onStateUpdate = (state: PlayingState) => {
        setPlayingState(state);
    };

    const { state, play, pause, cancel, load } = createSpeechEngine({
        onBoundary,
        onEnd,
        onStateUpdate,
    });

    useEffect(() => {
        setCounter(0);
    }, [sentences]);

    useEffect(() => {
        const currentsen = sentences[counter];
        if (currentsen) {
            setCurrentSentence(currentsen);
            load(currentsen);
            play();
        }
    }, [sentences, counter]);

    const controls = {
        state,
        playingState,
        play,
        pause,
        cancel,
        load,
        setPlayingState: (value: string) => setPlayingState(value),
    };

    return {
        currentWord,
        currentSentence,
        controls,
    };
};

export { useSpeech };
