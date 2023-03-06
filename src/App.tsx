import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { fetchContent, parseContentIntoSentences } from './lib/content';
import { useSpeech } from './lib/useSpeech';

function App() {
    const [sentences, setSentences] = useState<Array<string>>([]);
    const { currentWord, currentSentence, controls } = useSpeech(sentences);
    useEffect(() => {
        getSentences();
    }, []);

    const getSentences = async () => {
        try {
            const response = await fetchContent();
            if (response.status === 200) {
                const result = await response.json();
                if (result && result.content) {
                    const sentenceArray = parseContentIntoSentences(
                        result.content
                    );
                    console.log(sentenceArray);
                    if (sentenceArray.length > 0) {
                        setSentences(sentenceArray);
                    }
                }
            }
        } catch (error) {}
    };
    const pausePlayHandler = () => {
        // if(controls.playingState === 'paused') {

        // }
        controls.setPlayingState(controls.playingState)
    };
    console.log(controls.playingState)
    return (
        <div className='App'>
            <h1>Text to speech</h1>
            <div>
                <CurrentlyReading currentSentence={currentSentence}  currentWord={currentWord}/>
            </div>
            <div>
                <Controls
                    pausePlayHandler={pausePlayHandler}
                    getSentences={getSentences}
                />
            </div>
        </div>
    );
}

export default App;
