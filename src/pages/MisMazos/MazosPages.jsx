import React, { useState, useEffect } from "react";
import { getMazos, eliminarMazo, editarMazo, getCartasDeMazo } from "@/services/MazosService";
import { notifySuccess, notifyError } from "@/components/Notificaciones";
import { useNavigate } from "react-router-dom";
import MazoModal from "./MazoModal"; // <-- Importa el modal

const MazosPages = () => {
  const [mazos, setMazos] = useState([]);
  const [editingMazoId, setEditingMazoId] = useState(null);
  const [newMazoName, setNewMazoName] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // <-- Estado para el modal
  const [mazoSeleccionado, setMazoSeleccionado] = useState(null); // <-- Estado para el mazo seleccionado
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
    const response = await editarMazo(mazoId, newMazoName);
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

  // MODIFICADO: Mostrar el modal con las cartas del mazo seleccionado
  const handleVerMazo = async (mazo) => {
    const response = await getCartasDeMazo(mazo.id);
    if (response.error) {
      notifyError(response.error);
      return;
    }
    setMazoSeleccionado({ ...mazo, cartas: response });
    setModalVisible(true);
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
                <button style={{ backgroundColor: "rgb(68, 65, 62)", border: "none", color: "white" }} onClick={() => handleVerMazo(mazo)}>Ver Mazo</button>
                <button style={{ backgroundColor: "red", border: "none", color: "white" }}
                  onClick={() => handleEliminar(mazo.id)}
                  disabled={mazo.usadoEnPartida}
                >
                  Eliminar
                </button>
                {editingMazoId === mazo.id ? (
                  <span style={{ display: "inline-flex", gap: "5px" }}>
                    <button onClick={() => handleEditar(mazo.id)}>Guardar</button>
                    <button
                      style={{ backgroundColor: "rgb(236, 160, 17)", border: "none", color: "white" }}
                      onClick={() => {
                        setEditingMazoId(null);
                        setNewMazoName("");
                      }}
                    >
                      Cancelar
                    </button>
                  </span>
                ) : (
                  <button
                    style={{ backgroundColor: "rgb(39, 96, 170)", border: "none", color: "white" }}
                    onClick={() => setEditingMazoId(mazo.id)}
                  >
                    Editar
                  </button>
                )}
                <button style={{ backgroundColor: "green", border: "none", color: "white" }} onClick={() => handleJugar(mazo.id)}>Jugar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleCrearNuevoMazo}
        disabled={mazos.length >= 3}
        style={{
          marginTop: "20px",
          backgroundColor: mazos.length >= 3 ? "#ccc" : "#007bff",
          color: mazos.length >= 3 ? "#666" : "white",
          cursor: mazos.length >= 3 ? "not-allowed" : "pointer"
        }}
      >
        Alta de nuevo mazo
      </button>
      {mazos.length >= 3 && (
        <div style={{ color: "red", marginTop: "10px" }}>
          Solo puedes tener hasta 3 mazos.
        </div>
      )}
      {/* MODAL */}
      <MazoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        mazo={mazoSeleccionado}
      />
    </div>
  );
};

export default MazosPages;