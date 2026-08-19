import { useState, useEffect } from "react";
import { apiFetch } from "../API/RegistroAPI";

export function useUsuarioActual() {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        console.log("Token en useUsuarioActual:", token);

        if (!token) {
            setLoading(false);
            return;
        }

        apiFetch("/api/usuarios/ActRes", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => {
                console.log("Usuario obtenido:", data);
                setUsuario(data);
            })
            .catch(err => {
                console.error("Error obteniendo usuario:", err);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    return { usuario, loading };
}