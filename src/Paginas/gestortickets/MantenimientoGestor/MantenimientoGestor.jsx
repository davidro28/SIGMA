import React, { useState, useEffect } from 'react';
import SigmaHeader from '../../../Components/sigmaHeader/';
import VerticalNav from '../../../Components/verticalNav';
import CuadroInformativo from '../../../Components/cuadroInformacion';
import BuscadorMantenimiento from '../../../Components/buscadorMantenimiento';
import NuevaOrden from "../../../Components/nuevaOrden";
import OrdenesMantenimiento from '../../../Components/ordenesMantenimiento';
import FiltrarEstado from '../../../Components/filtrarEstado';
import FiltrarPrioridad from '../../../Components/filtrarPrioridad';
import { ordenService } from '../../../API/RegistroAPI';
import './MantenimientoGestor.css';

function MantenimientoGestor() {
    const menuItems = [
        { to: "/Home_gestortickets", label: "General" },
        { to: "/MantenimientoGestor", label: "Mantenimiento" }
    ];

    const [ordenes, setOrdenes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ordenService.listar()
            .then(data => setOrdenes(data))
            .catch(err => console.error("Error cargando órdenes:", err))
            .finally(() => setLoading(false));
    }, []);

    const onOrdenCreada = (nuevaOrden) => {
        setOrdenes(prev => [nuevaOrden, ...prev]);
    };

    const ordenesFiltradas = ordenes.filter((o) => {
        const texto = busqueda.toLowerCase();
        return (
            (o.ordenId || o.id || "").toLowerCase().includes(texto) ||
            (o.activoNombre || "").toLowerCase().includes(texto) ||
            (o.tecnicoNombre || "").toLowerCase().includes(texto)
        );
    });

    return (
        <div className="home-container">
            <header>
                <SigmaHeader />
            </header>
            <div className='layout'>
                <VerticalNav items={menuItems}/>
                <main className='content'>
                    <section>
                        <div className='parte-principal'>
                            <p className='parrafo_principal'>Mantenimiento</p>
                            <div className='grupo-derecha'>
                                <BuscadorMantenimiento busqueda={busqueda} setBusqueda={setBusqueda} />
                                <NuevaOrden onOrdenCreada={onOrdenCreada} />
                            </div>
                        </div>
                        <div className='cuadros-container'>
                            <CuadroInformativo
                                titulo="Ordenes Abiertas"
                                valor={ordenes.filter(o => o.estado !== "CERRADA").length}
                                estadistica="Incluye correctivo y preventivo"
                                sugerencia="12 vencen esta semana"
                                width="380px"
                            />
                            <CuadroInformativo titulo="Presupuesto" valor={1520} estadistica={3423} sugerencia="nada"/>
                            <CuadroInformativo titulo="Total de Tickets" valor={1102} estadistica={3423} sugerencia="nada"/>
                        </div>
                        <div className='container-grande'>
                            <div className='container-filtros'>
                                <FiltrarEstado />
                                <FiltrarPrioridad />
                            </div>
                            <div className='container-ordenes'>
                                {loading ? (
                                    <p style={{ padding: "1rem" }}>Cargando órdenes...</p>
                                ) : (
                                    <OrdenesMantenimiento ordenes={ordenesFiltradas}/>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default MantenimientoGestor;