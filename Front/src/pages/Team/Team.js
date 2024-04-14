import './Team.css';
import image from '../../assets/Pro.png'
import TeamCard from '../../components/TeamCard/TeamCard';

const Team = () => {
    const teamMember = [
        { image: image, para: "I am Arun, from Mannargudi.loram asnjds react app for project main college." },
        { image: image, para: "I am Arun, from Mannargudi.loram asnjds react app for project main college." },
        { image: image, para: "I am Arun, from Mannargudi.loram asnjds react app for project main college." },
    ]
    return (
        <div className='team' id='team'>
            <div className='team-guide'>
                <img src={image} alt="image" />
                <p>With decades of maintenance of way expertise and experience, no one knows the rail like Loram. Today, with our Loram Technologies business group, we’re leveraging our accumulated data, analytics and maintenance algorithms with advanced inspection technologies to provide you actionable intelligence with real-time monitoring</p>
            </div>

            <div className='team-member'>
                {teamMember.map(el => <TeamCard image={el.image} para={el.para} />)}
            </div>
        </div>
    );
}

export default Team;