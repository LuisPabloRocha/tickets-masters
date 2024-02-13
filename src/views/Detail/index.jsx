import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import styles from './Detail.module.css'
import { es } from 'date-fns/locale';


const Detail = () => {

    const { eventId } = useParams();
    const [eventData, setEventData] = useState({});
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`,);
                const data = await response.json();
                setEventData(data);
                setIsLoading(false);

            } catch (error) {
                setEventData({});
                setError(error);
                setIsLoading(false);

            }
        };

        fetchEventData();
    }, []);

    if (isLoading && Object.keys(eventData) === 0) {
        return <div>Cargando evento...</div>
    }

    if (Object.keys(error) > 0) {
        return <div>Ha ocurrido un error...</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.mainInfoContainer}>
                <img src={eventData.images?.[0].url} className={styles.image} alt={eventData.name}>
                </img>
                <h4 className={styles.eventName}>{eventData.name}</h4>
                <p className={styles.eventInfo}>{eventData.info}</p>
                {eventData.dates?.start.dateTime ? <p className={styles.eventDate}>{format(new Date(eventData.dates?.start.dateTime), 'd LLLL yyyy H:mm', { locale: es })}hrs</p> : null}
            </div>
            <div className={styles.seatInfoContainer}>
                <h6 className={styles.seatMapTitle}>Mapa del evento</h6>
                <img src={eventData.seatmap?.staticUrl}></img>
                <p className={styles.pleaseNoteLegend}>{eventData.pleaseNote}</p>
                <p className={styles.priceRangesText}>Rango de precios:{eventData.priceRanges?.[0].min}-{eventData.priceRanges?.[0].max} {eventData.priceRanges?.[0].currency}</p>
            </div>
            <a href={eventData.url}> 
                Ir por tus boletos
            </a>
        </div>
    );
}

export default Detail;