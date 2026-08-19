import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

import { apiFetch } from "../../../API/RegistroAPI";

import "./Activos_responsable.css";

function Activos_responsable() {

    const navigate = useNavigate();

    const menuItems = [
        {
            to: "/Home_responsable",
            label: "General"
        },
        {
            to: "/Activos_responsable",
            label: "Activos"
        },
        {
            to: "/MisTickets",
            label: "Tickets"
        }
    ];

    const [activos, setActivos] = useState([]);
    const [usuarioActual, setUsuarioActual] = useState(null);

    const [filtroTipo, setFiltroTipo] =
        useState("Todos");

    const [filtroEstado, setFiltroEstado] =
        useState("Todos");

    const [busqueda, setBusqueda] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [activoSeleccionado, setActivoSeleccionado] =
        useState(null);


    useEffect(() => {

        const cargarDatos = async () => {

            try {

                const usuario = await apiFetch(
                    "/api/usuarios/ActRes"
                );

                setUsuarioActual(usuario);


                const data = await apiFetch(
                    "/api/activos"
                );


                const nombreUsuario = (
                    usuario.nombre ||
                    usuario.nom ||
                    usuario.email ||
                    ""
                )
                    .trim()
                    .toLowerCase();


                const misActivos = data.filter(
                    (activo) => {

                        const responsable = (
                            activo.responsable ||
                            ""
                        )
                            .trim()
                            .toLowerCase();

                        return (
                            responsable ===
                            nombreUsuario
                        );

                    }
                );


                setActivos(misActivos);

            } catch (error) {

                console.error(
                    "Error cargando datos:",
                    error
                );

                setActivos([]);

            } finally {

                setLoading(false);

            }

        };


        cargarDatos();

    }, []);

}