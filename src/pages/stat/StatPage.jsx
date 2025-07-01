import React, { useEffect, useState } from "react";
import { getEstadisticas } from "../../services/GetEstadisticas";

const StatPage = () => {
  const [estadisticas, setEstadisticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("desc"); // Orden por defecto: mejor performance

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchEstadisticas = async () => {
      const data = await getEstadisticas();
      if (Array.isArray(data.result)) {
        // Calcula el promedio de partidas ganadas
        const processedData = data.result.map((stat) => ({
          ...stat,
          totalPartidas: parseInt(stat.ganadas) + parseInt(stat.empatadas) + parseInt(stat.perdidas),
          promedioGanadas: parseInt(stat.ganadas) / (parseInt(stat.ganadas) + parseInt(stat.empatadas) + parseInt(stat.perdidas) || 1),
        }));
        setEstadisticas(processedData);
        console.log("Estadísticas obtenidas:", data);
      } else {
        console.error("La respuesta de la API no contiene un arreglo válido:", data);
        setEstadisticas({ error: "Formato de datos inválido" });
      }
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
      // Primero por promedio, luego por ganadas si hay empate
      return (
        b.promedioGanadas - a.promedioGanadas ||
        parseInt(b.ganadas) - parseInt(a.ganadas)
      );
    } else {
      return (
        a.promedioGanadas - b.promedioGanadas ||
        parseInt(a.ganadas) - parseInt(b.ganadas)
      );
    }
  });

  // Paginado
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEstadisticas = sortedEstadisticas.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(estadisticas.length / itemsPerPage);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "24px auto",
        padding: "16px",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", fontWeight: 600, marginBottom: 16, fontSize: 22 }}>
        Estadísticas de usuarios
      </h2>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <button
          onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
          style={{
            background: "#222",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 18px",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Ordenar por {order === "desc" ? "peor" : "mejor"} performance
        </button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 15,
            minWidth: 420,
          }}
        >
          <thead>
            <tr style={{ background: "#f6f6f6", color: "#333" }}>
              <th style={{ padding: 8, fontWeight: 600 }}>Nombre</th>
              <th style={{ padding: 8, fontWeight: 600 }}>Totales</th>
              <th style={{ padding: 8, fontWeight: 600 }}>Ganadas</th>
              <th style={{ padding: 8, fontWeight: 600 }}>Empatadas</th>
              <th style={{ padding: 8, fontWeight: 600 }}>Perdidas</th>
              <th style={{ padding: 8, fontWeight: 600 }}>Promedio</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEstadisticas.map((stat, idx) => (
              <tr
                key={idx}
                style={{
                  background: idx === 0 && currentPage === 1 ? "#ffe066" : "transparent",
                  fontWeight: idx === 0 && currentPage === 1 ? 600 : 400,
                  textAlign: "center",
                }}
              >
                <td style={{ padding: 8 }}>{stat.usuario || `Usuario ${stat.id}`}</td>
                <td style={{ padding: 8 }}>{stat.totalPartidas}</td>
                <td style={{ padding: 8 }}>{stat.ganadas}</td>
                <td style={{ padding: 8 }}>{stat.empatadas}</td>
                <td style={{ padding: 8 }}>{stat.perdidas}</td>
                <td style={{ padding: 8 }}>{(stat.promedioGanadas * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          marginTop: 18,
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            background: "#eee",
            color: "#333",
            border: "none",
            borderRadius: 5,
            padding: "6px 14px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            opacity: currentPage === 1 ? 0.5 : 1,
          }}
        >
          Anterior
        </button>
        <span style={{ fontSize: 15 }}>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            background: "#eee",
            color: "#333",
            border: "none",
            borderRadius: 5,
            padding: "6px 14px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            opacity: currentPage === totalPages ? 0.5 : 1,
          }}
        >
          Siguiente
        </button>
      </div>
      <style>{`
      @media (max-width: 700px) {
        div[style*="max-width: 600px"] {
          max-width: 98vw !important;
          padding: 4vw !important;
        }
        table {
          font-size: 13px !important;
          min-width: 340px !important;
        }
        h2 {
          font-size: 18px !important;
        }
      }
    `}</style>
    </div>
  );
};

export default StatPage;