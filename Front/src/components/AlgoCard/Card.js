import "./Card.css";

const Card = (props) => {
    return (
        <div className="about-card">
            <div className="card-black1"></div>
            <h1>{props.name}</h1>
           <p>{props.para}</p>
           <button>Try</button>
        </div>
    );
}

export default Card;