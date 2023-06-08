import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../API/config.api";
import Swal from "sweetalert2";
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { useOrdenes } from "../OrdenesComponents/OrdenesContext/OrdenProvider";
import { useServicios } from "../ServicioComponents/ServiciosContext/ServicioProvider";
import { useUsuarios } from "../usuarioComponents/UsuariosContext/UsuarioProvider";
export const VerificarToken = () => {
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const { cerrarSesionProductos } = useProductos();
  const { cerrarSesionOrdenes } = useOrdenes();
  const { cerrarSesionServicios } = useServicios();
  const { cerrarSesionUsuarios } = useUsuarios();
  useEffect(() => {
    const token = localStorage.getItem("token");

    const verificarToken = async () => {
      const respuesta = await fetch(`${API_BASE_URL}api/verificacion/token`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });

      if (respuesta.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Sesión expirada",
          text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        cerrarSesionProductos();
        cerrarSesionOrdenes();
        cerrarSesionServicios();
        cerrarSesionUsuarios();
        navigate("/login"); // Redirigir al inicio de sesión si el token no es válido

        return;
      }

      const data = await respuesta.json();
      setMensaje(data.message);
    };

    if (token) {
      const intervalId = setInterval(verificarToken, 10000); // Ejecutar cada 5 segundos

      return () => {
        clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
      };
    }
  }, []);

  return null;
};
