import { useState, useEffect } from "react";

export function useUsuarioActual() {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token en useUsuarioActual:", token); // 👈 agrega esto

        if (!token) {
            setLoading(false);
            return;
        }

        fetch("http://localhost:8080/api/usuarios/ActRes", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(r => {
                console.log("Status ActRes:", r.status); // 👈 agrega esto
                return r.json();
            })
            .then(data => {
                console.log("Usuario obtenido:", data); // 👈 agrega esto
                setUsuario(data);
            })
            .catch(err => console.error("Error obteniendo usuario:", err))
            .finally(() => setLoading(false));
    }, []);

    return { usuario, loading };
}