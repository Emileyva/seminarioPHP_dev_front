import React, { useState, useEffect } from "react";
import { getMazos, eliminarMazo, editarMazo } from "@/services/MazosService";
import { notifySuccess, notifyError } from "@/components/Notificaciones";
import { useNavigate } from "react-router-dom";

const MazosPages = () => {
  const [mazos, setMazos] = useState([]);
  const [editingMazoId, setEditingMazoId] = useState(null);
  const [newMazoName, setNewMazoName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMazos = async () => {
      const response = await getMazos();
      if (response.error) {
        notifyError("Error al cargar los mazos.");
      } else {
        setMazos(response);
      }
    };
    fetchMazos();
  }, []);

  const handleEliminar = async (mazoId) => {
    const response = await eliminarMazo(mazoId);
    if (response.error) {
      notifyError(response.error);
    } else {
      notifySuccess("Mazo eliminado correctamente.");
      setMazos(mazos.filter((mazo) => mazo.id !== mazoId));
    }
  };

  const handleEditar = async (mazoId) => {
    if (!newMazoName.trim()) {
      notifyError("El nombre del mazo no puede estar vacío.");
      return;
    }
    const response = await editarMazo(mazoId, { nombre: newMazoName });
    if (response.error) {
      notifyError(response.error);
    } else {
      notifySuccess("Mazo editado correctamente.");
      setMazos(
        mazos.map((mazo) =>
          mazo.id === mazoId ? { ...mazo, nombre: newMazoName } : mazo
        )
      );
      setEditingMazoId(null);
      setNewMazoName("");
    }
  };

  const handleVerMazo = (mazo) => {
    // Mostrar modal con las cartas del mazo
    notifySuccess(`Mostrando cartas del mazo: ${mazo.nombre}`);
  };

  const handleJugar = (mazoId) => {
    navigate(`/jugar/${mazoId}`);
  };

  const handleCrearNuevoMazo = () => {
    navigate("/alta-mazo");
  };

  return (
    <div>
      <h2>Mis Mazos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del Mazo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mazos.map((mazo) => (
            <tr key={mazo.id}>
              <td>
                {editingMazoId === mazo.id ? (
                  <input
                    type="text"
                    value={newMazoName}
                    onChange={(e) => setNewMazoName(e.target.value)}
                  />
                ) : (
                  mazo.nombre
                )}
              </td>
              <td>
                <button onClick={() => handleVerMazo(mazo)}>Ver Mazo</button>
                <button
                  onClick={() => handleEliminar(mazo.id)}
                  disabled={mazo.usadoEnPartida}
                >
                  Eliminar
                </button>
                {editingMazoId === mazo.id ? (
                  <button onClick={() => handleEditar(mazo.id)}>Guardar</button>
                ) : (
                  <button onClick={() => setEditingMazoId(mazo.id)}>
                    Editar
                  </button>
                )}
                <button onClick={() => handleJugar(mazo.id)}>Jugar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleCrearNuevoMazo}
        disabled={mazos.length >= 3}
        style={{ marginTop: "20px" }}
      >
        Alta de nuevo mazo
      </button>
    </div>
  );
};

export default MazosPages;