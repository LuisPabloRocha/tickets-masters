//import './styles.css';
import { Link } from 'react-router-dom';
import styles from './EventItem.module.css'
import useLikedEvents from '../../../../hooks/useLikedEvents';
import HeartFilled from '../../../../assets/heart_6862229.png';
import HeartUnfilled from '../../../../assets/heart_6862056.png';

const EventItem = ({ info, id, name, image, onEventClick }) => {
    const {isEventLiked, toggleEventLike} = useLikedEvents(id);
    const handleSeeMoreClick = (event) => {
        event.stopPropagation();
        onEventClick(id)
    }

    const handleHeartClick =()=>{
        toggleEventLike();
    }

    return (
        <div className={styles.eventItemContainer}>
            <div className={styles.imageContainer}>
                <img src={isEventLiked ? HeartFilled : HeartUnfilled} alt="Heart Button" className={styles.heartImage}  onClick={handleHeartClick} ></img>
                <img src={image} alt={name} width={200} ></img>
            </div>

            <div className={styles.infoContainer}>
                <h4 className={styles.eventName}>{name}</h4>
                <p className={styles.eventInfo}>{info}</p>
                <button className={styles.seeMoreEvent} onClick={handleSeeMoreClick}>Ver Más
                </button>
            </div>

        </div>

    );
};

export default EventItem;