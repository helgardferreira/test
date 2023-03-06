// Implement a component that displays the currently read word and sentence
interface currentReading {
    currentSentence: string;
    currentWord: string;
}
export const CurrentlyReading = (props: currentReading) => {
    const { currentSentence, currentWord } = props;
    return (
        <div className='currently-reading'>
            <div>currentWord - <b>{currentWord}</b></div>
            <div>currentSentence - <b>{currentSentence}</b></div>
        </div>
    );
};
