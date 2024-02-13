import { useState } from 'react';
import eventsJSON from '../data/events.json';

//HOOK PARA HACER UNA LLAMADA A LA API Y GUARDARLA EN EL ESTADO LOCAL
const useEventsData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState();

    //Load API CALL
    const fetchEvents = async (params) => {
        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX${params?.length ? params : ''}`,);
            const data = await response.json();

            setData(data);
            setisLoading(false);
        }
        catch (error) {

        }
    };
    
    return {
        events: data?._embedded?.events || [],
        page: data?.page || {},
        isLoading,
        error,
        fetchEvents,
    };
};

export default useEventsData;