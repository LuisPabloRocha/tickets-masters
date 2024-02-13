import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { Link } from 'react-router-dom';

const Navbar = forwardRef(({ onSearch }, ref) => {
    const [search, setSearch] = useState('');
    const containerRef = useRef();

    useEffect(() => {
        console.log('onsearch');
    }, [onSearch]);

    useEffect(() => {
        console.log("componente listo")
    }, [])

    useEffect(() => {
        console.log("search cambio")
    }, [search])

    useImperativeHandle(ref, () => ({ //Acceso por el padre
        search,
        setSearch
    }));

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch(search);
        }
    };
    return (
        <div ref={ref} style={{
            marginBottom: 14,
            width: '100%',
            display: 'flex',
        }}>
            <div style={{ flex: 1, display: 'flex' }}>
                <p style={{ fontSize: '19px', fontWeight: 'bold' }}>Ticketmaster</p>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: "center", justifyContent: 'flex-end' }}>
                <input placeholder="Busca tu evento favorito"
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    value={search}
                    style={{
                        fontSize: 16,
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: 'none',
                        width: '200px'
                    }}>

                </input>
                <Link to="/profile/my-info" style={{
                    marginLeft:24,
                    TextDecoration: 'none'
                }}>Mi Perfil</Link>

            </div>
        </div>
    );

});
Navbar.displayName = 'Navbar';
export default Navbar;