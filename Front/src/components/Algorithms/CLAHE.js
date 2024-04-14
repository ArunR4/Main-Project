import { FileUploader } from "react-drag-drop-files";

function CLAHE({ fileTypes, handleChange, submitHandler, output, toggleOutput }) {
    return (
        <div className='input-main'>
            {!!output && <a className="right-btn" onClick={toggleOutput}><i class="fa-regular fa-circle-right"></i></a>}
            <div className="input-main-div">
                <h3>Upload a Image :</h3>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            </div>

            <button onClick={() => submitHandler({
                algo: 'clahe'
            })}>Submit</button>
        </div>
    )
}

export default CLAHE