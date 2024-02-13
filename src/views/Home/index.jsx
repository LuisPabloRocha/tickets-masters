import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import useEventsData from "../../hooks/useEventsData";
import useEventsResults from '../../state/events-results';
import ReactPaginate from 'react-paginate';
import styles from './Home.module.css'

import Navbar from '../../components/Navbar';
import Events from '../../components/Events';

const Home = () => {
    const { data, isLoading, error, fetchEvents } = useEventsResults();
    const events = useMemo(() => data?._embedded?.events || [], [data?._embedded?.events]);
    const page = useMemo(()=> data?.page || {}, [data?.page]);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef();

    const fetchMyEventsRef = useRef();
    fetchMyEventsRef.current = fetchEvents;

    useEffect(() => {
        fetchMyEventsRef.current();
    }, []);

    const handleNavBarSearch = (term) => {
        setSearchTerm(term);
        fetchEvents(`&keyword=${term}`);
    };

    const handlePageClick = useCallback(({ selected }) => {
        fetchEvents(`&keyword=${searchTerm}&page=${selected}`)

    }, [searchTerm, fetchEvents]);

    const renderEvents = () => {
        if (isLoading) {
            return <div>CARGANDO RESULTADOS</div>;
        }
        if (error) {
            return <div>HA OCURRIDO UN ERROR</div>
        }
        return (
            <div>
                <Events searchTerm={searchTerm} events={events}></Events>
                <ReactPaginate
                    className={styles.pagination}
                    nextClassName={styles.next}
                    previousClassName={styles.previous}
                    pageClassName={styles.page}
                    activeClassName={styles.activePage}
                    disabledClassName={styles.disablePage}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={page.totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        );
    }

    return (
        <>
            <Navbar onSearch={handleNavBarSearch} ref={containerRef}></Navbar>
            {renderEvents()}
        </>
    )

}

export default Home;