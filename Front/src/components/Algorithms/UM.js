import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Dropdown from 'react-dropdown';
import InputRange from 'react-input-range';
import 'react-dropdown/style.css';
import 'react-input-range/lib/css/index.css'

function UM({ fileTypes, handleChange, submitHandler, toggleOutput, output }) {
    const [filter, setFilter] = useState("Gaussian")
    const [valueRadius, setValueRadius] = useState(10);
    const [value, setValue] = useState(2);
    const options = [
        'Gaussian', 'Median', 'Minimum', 'Maximum'
    ];
    const defaultOption = options[0];
    const changeHandler = (value) => {
        setFilter(value.value);
    }
    const rangeInput = (value) => {
        setValue(value)
    }
    const rangeInputRadius = (value) => {
        setValueRadius(value)
    }

    // const submitHandler = () => {
    // let obj = {
    //     filter: filter,
    //     raidus: valueRadius,
    //     amount: value
    // }
    // }

    return (
        <div className='input-main'>
            {!!output && <a className="right-btn" onClick={toggleOutput}><i class="fa-regular fa-circle-right"></i></a>}
            <div className="input-main-div">
                <h3>Upload a Image :</h3>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            </div>

            <div className="input-main-div">
                <h3>Select a Filter :</h3>
                <Dropdown options={options} onChange={changeHandler} value={defaultOption} placeholder="Select an option" />
            </div>

            {filter === 'Gaussian' ? <div className="input-main-div">
                <h3>Choose value for radius :</h3>
                <InputRange
                    maxValue={20}
                    minValue={1}
                    value={valueRadius}
                    onChange={rangeInputRadius} />
            </div> : null}

            <div className="input-main-div">
                <h3>Choose value for amount :</h3>
                <InputRange
                    maxValue={20}
                    minValue={1}
                    value={value}
                    onChange={rangeInput} />
            </div>

            <button onClick={() => submitHandler({
                algo: 'um',
                filter: filter,
                radius: valueRadius,
                amount: value
            })}>Submit</button>
        </div>
    )
}

export default UM