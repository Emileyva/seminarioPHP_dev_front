import React, { useEffect, useState } from "react";
import { getEstadisticas } from "@/controllers/GetEstadisticas.js";

const StatPage = () => {
  const [estadisticas, setEstadisticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("desc"); // Orden por defecto: mejor performance

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchEstadisticas = async () => {
      const data = await getEstadisticas();
      // Calcula el promedio de partidas ganadas
      const processedData = data.map((stat) => ({
        ...stat,
        totalPartidas: stat.ganadas + stat.empatadas + stat.perdidas,
        promedioGanadas: stat.ganadas / (stat.ganadas + stat.empatadas + stat.perdidas || 1),
      }));
      setEstadisticas(processedData);
      setLoading(false);
    };
    fetchEstadisticas();
  }, []);

  if (loading) return <div>Cargando estadísticas...</div>;

  if (estadisticas.error) {
    return <div>Error: {estadisticas.error}</div>;
  }

  // Ordenar estadísticas
  const sortedEstadisticas = [...estadisticas].sort((a, b) => {
    if (order === "desc") {
      return b.promedioGanadas - a.promedioGanadas;
    } else {
      return a.promedioGanadas - b.promedioGanadas;
    }
  });

  // Paginado
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEstadisticas = sortedEstadisticas.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(estadisticas.length / itemsPerPage);

  return (
    <div>
      <h2>Estadísticas de usuarios</h2>
      <button onClick={() => setOrder(order === "desc" ? "asc" : "desc")}>
        Ordenar por {order === "desc" ? "peor" : "mejor"} performance
      </button>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nombre Público</th>
            <th>Partidas Totales</th>
            <th>Ganadas</th>
            <th>Empatadas</th>
            <th>Perdidas</th>
            <th>Promedio Ganadas</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEstadisticas.map((stat, idx) => (
            <tr
              key={idx}
              style={{
                backgroundColor: idx === 0 && currentPage === 1 ? "#FFD700" : "transparent", // Destacar al mejor
                fontWeight: idx === 0 && currentPage === 1 ? "bold" : "normal",
              }}
            >
              <td>{stat.nombre_publico || `Usuario ${stat.usuario_id}`}</td>
              <td>{stat.totalPartidas}</td>
              <td>{stat.ganadas}</td>
              <td>{stat.empatadas}</td>
              <td>{stat.perdidas}</td>
              <td>{(stat.promedioGanadas * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default StatPage;