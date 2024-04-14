import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import InputRange from 'react-input-range';

function HEF({ fileTypes, handleChange, submitHandler, toggleOutput, output }) {
    const [value, setValue] = useState(10);

    const rangeInput = (value) => {
        setValue(value)
    }
    return (
        <div className='input-main'>
            {!!output && <a className="right-btn" onClick={toggleOutput}><i class="fa-regular fa-circle-right"></i></a>}
            <div className="input-main-div">
                <h3>Upload a Image :</h3>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            </div>

            <div className="input-main-div">
                <h3>Select D0 value for High cut :</h3>
                <InputRange
                    maxValue={90}
                    minValue={1}
                    value={value}
                    onChange={rangeInput} />
            </div>

            <button onClick={() => submitHandler({
                algo: 'hef',
                d0: value
            })}>Submit</button>
        </div>
    )
}

export default HEF