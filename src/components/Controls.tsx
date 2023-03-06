
// Implement a component that provides basic UI options such as playing, pausing and loading new content 
interface ControlsType {
    pausePlayHandler :() => void;
    getSentences :() => void;
}
export const Controls = (props: ControlsType) => {
    const {getSentences, pausePlayHandler} = props
  return (
    <div>
        <button onClick={pausePlayHandler}> pause</button>
        <button onClick={getSentences}>load more content</button>
    </div>
  );
};
