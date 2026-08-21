import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    // =====================================================
    // ESTADO INICIAL: leer de localStorage si existe
    // =====================================================

    const [token, setToken] = useState(
        () => localStorage.getItem("token") || null
    );

    const [usuario, setUsuario] = useState(() => {

        const guardado = localStorage.getItem("usuario");

        return guardado
            ? JSON.parse(guardado)
            : null;

    });

    const [roles, setRoles] = useState(() => {

        const guardados = localStorage.getItem("roles");

        return guardados
            ? JSON.parse(guardados)
            : [];

    });


    // =====================================================
    // INICIAR SESIÓN
    // =====================================================

    const iniciarSesion = (data) => {

        setToken(data.token);

        setUsuario(data.usuario);

        setRoles(data.roles || []);


        // Persistir en localStorage

        localStorage.setItem("token", data.token);

        localStorage.setItem(
            "usuario",
            JSON.stringify(data.usuario)
        );

        localStorage.setItem(
            "roles",
            JSON.stringify(data.roles || [])
        );

    };


    // =====================================================
    // CERRAR SESIÓN
    // =====================================================

    const cerrarSesion = () => {

        setToken(null);

        setUsuario(null);

        setRoles([]);


        // Limpiar localStorage

        localStorage.removeItem("token");

        localStorage.removeItem("usuario");

        localStorage.removeItem("roles");

    };


    return (
        <AuthContext.Provider
            value={{
                token,
                usuario,
                roles,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {

    return useContext(AuthContext);

}