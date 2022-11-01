import ReactSlider from "react-slider";
import "../css/Slider.scss";
import {useState} from "react";


const Slider = (props) => {
    let title = props.title;
    let normalValue = props.normalValue;
    let initialState = props.initialState;
    const [currentValue, setCurrentValue] = useState(initialState);

    function onSliderChange(value) {
        setCurrentValue(value)
        // and then recalculate the results
    }

    return (
        <>
            <div>{currentValue}</div>
            <ReactSlider
                className="customSlider"
                trackClassName="customSlider-track"
                thumbClassName="customSlider-thumb"
                markClassName="customSlider-mark"
                marks={1}
                step={1}
                min={0}
                max={100}
                value={currentValue}
                onChange={(value) => onSliderChange(value)}
                renderMark={(props) => {
                    if (props.key === normalValue) {
                        props.className = "customSlider-mark customSlider-mark-before";
                    } else if (props.key === currentValue) {
                        props.className = "customSlider-mark customSlider-mark-active";
                    }
                    return <span {...props} />;
                }}
            />
        </>
    );
};

export default Slider;