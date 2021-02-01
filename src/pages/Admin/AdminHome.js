import React from "react";

import "./AdminHome.scss";

export default function AdminHome() {
  return (
    <div className="admin-home">
      <div className="admin-home__title">
        <h1>Bienvenido a Empresa X</h1>
      </div>
      <div className="admin-home__body">
        <p>
          Desde este sito podras consultar inventarios, agregar, editar y
          eliminar productos y sucursales
        </p>
      </div>
    </div>
  );
}
