import { useEffect, useState } from 'react';
import axios from 'axios';
import UM from '../../components/Algorithms/UM';
import HEF from '../../components/Algorithms/HEF';
import CLAHE from '../../components/Algorithms/CLAHE';
import Output from '../../components/Algorithms/Output';
import './ImageApp.css';

function ImageApp() {
    const [algo, setAlgo] = useState(0);
    const [file, setFile] = useState(null);
    const [fileName, setFilename] = useState(null);
    const [outputFile, setOutputFile] = useState(null);
    const [output, setOutput] = useState(false)
    const [load, setLoad] = useState(false)
    const fileTypes = ["JPG", "PNG"];

    useEffect(() => setAlgo(1), [])

    useEffect(() => {
        const leftValue = [2, 39, 79]
        const black = document.querySelectorAll('.active-black');
        black[0].style.left = `${leftValue[algo - 1]}%`;
        // black[0].style.left = "86%";
    }, [algo])

    const handleChange = (file) => {
        setFile(URL.createObjectURL(file))
        const data = new FormData();
        data.append("files[]", file)
        axios.post("http://127.0.0.1:5000/upload", data).then(res => {
            setFilename(res.data.fileUrl)
        }).catch(err => console.log(err));
        console.log(file)
    };

    const submitHandler = obj => {
        toggleOutput();
        setLoad(true)
        console.log(obj)
        if (obj.algo === "um") {
            let radius = (obj.filter !== "Gaussian" ? '0' : obj.radius);
            let filter = ["Gaussian", "Median", "Maximum", "Minimum"]
            setOutputFile(<img className='output-img' alt="img" src={`http://127.0.0.1:5000/send/um/${filter.indexOf(obj.filter) + 1}/${fileName}/${radius}/${obj.amount}`} />)
        }
        else if (obj.algo === "hef") {
            setOutputFile(<img className='output-img' alt="img" src={`http://127.0.0.1:5000/send/hef/${fileName}/${obj.d0}`} />)
            // axios.get(`http://127.0.0.1:5000/send/hef/${fileName}/${obj.d0}`).then(res => {
            //     // const base64 = btoa(
            //     //     new Uint8Array(res.data).reduce(
            //     //         (data, byte) => data + String.fromCharCode(byte),
            //     //         ''
            //     //     )
            //     // )
            //     setOutputFile(<img src={}/>)
            // }).catch(err => console.log(err));
            // console.log(outputFile)
        }
        else {
            // axios.get(`http://127.0.0.1:5000/send/clahe/${fileName}`).then(res => setOutputFile(res.data)).catch(err => console.log(err));
            setOutputFile(<img className='output-img' alt="img" src={`http://127.0.0.1:5000/send/clahe/${fileName}`} />)
        }

        setLoad(false)
    }
    const toggleOutput = () => {
        setOutput(pre => !pre);
    }
    return (
        <div className='image-app'>
            <div className='input-controls'>
                <div className='active-black' id='activeBar'></div>
                <button className={algo == 1 ? "white" : null} onClick={() => setAlgo(1)}>UM</button>
                <button className={algo == 2 ? "white" : null} onClick={() => setAlgo(2)}>HEF</button>
                <button className={algo == 3 ? "white" : null} onClick={() => setAlgo(3)}>CLAHE</button>
            </div>

            {algo === 1 && !output ? <UM output={outputFile} toggleOutput={toggleOutput} fileTypes={fileTypes} handleChange={handleChange} submitHandler={submitHandler} /> : null}
            {algo === 2 && !output ? <HEF output={outputFile} toggleOutput={toggleOutput} fileTypes={fileTypes} handleChange={handleChange} submitHandler={submitHandler} /> : null}
            {algo === 3 && !output ? <CLAHE output={outputFile} toggleOutput={toggleOutput} fileTypes={fileTypes} handleChange={handleChange} submitHandler={submitHandler} /> : null}
            {output ? <Output out={outputFile} in={file} load={load} toggleOutput={toggleOutput} /> : null}
        </div>
    )
}

export default ImageApp;