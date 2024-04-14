import './TeamCard.css'

const TeamCard = ({image,para}) =>  (
    <div className='team-card'>
        <div className='card-black'></div>
        <img src={image} alt="image"/>
        <p>{para}</p>
        <div className='team-link'>
        <a href="#"><i class="fa-brands fa-github"></i></a>
        <a href='#'><i class="fa-brands fa-linkedin"></i></a>
        </div>
    </div>
)
export default TeamCard;