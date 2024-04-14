import Spinner from "../Spinner/Spinner"

function Output(props) {
    return (
        <div className='output-main'>

            <a className="left-btn" onClick={props.toggleOutput}><i class="fa-regular fa-circle-left"></i></a>
            {!props.load ? <div className='before'>
                <h2>Before</h2>
                <img src={props.in} alt='image' />
            </div> : <Spinner />}

            {!props.load && <div className='after'>
                <h2>After</h2>
                {props.out && props.out}
            </div>}
        </div>
    )
}

export default Output