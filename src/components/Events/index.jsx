
import EventItem from "./components/EventItem";
import { useNavigate } from 'react-router-dom';
import { memo } from "react";


//acceder a la data 

const Events = ({ searchTerm, events }) => {

    const navigate = useNavigate();


    const handleEventItemClick = (id) => {
        navigate(`/detail/${id}`)
    }

    const renderEvents = () => { //Filtrado del buscador
        let eventsFiltered = events;
        if (searchTerm.length > 0) {
            eventsFiltered = eventsFiltered.filter((item) => item.name.toLocaleLowerCase().includes(searchTerm));
        }
        return eventsFiltered.map((eventItem) => ( //muestra todos los eventos por el texto del input
            <EventItem
                key={eventItem.id}
                name={eventItem.name}
                info={eventItem.info}
                image={eventItem.images[0].url}
                onEventClick={handleEventItemClick}
                id={eventItem.id}
            ></EventItem>));
    };

    return (
        <div>
            Eventos
            {renderEvents()}
        </div>
    );
};
export default memo(Events);