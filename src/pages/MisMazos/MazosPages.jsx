import React, { useState, useEffect } from "react";
import { getMazos, eliminarMazo, editarMazo, getCartasDeMazo } from "@/services/MazosService";
import { notifySuccess, notifyError } from "@/components/Notificaciones";
import { useNavigate } from "react-router-dom";
import MazoModal from "./MazoModal"; // Importa el modal
import "@/assets/styles/MazosPages.css"; // Importa el nuevo CSS

const MazosPages = () => {
  const [mazos, setMazos] = useState([]);
  const [editingMazoId, setEditingMazoId] = useState(null);
  const [newMazoName, setNewMazoName] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
  const [mazoSeleccionado, setMazoSeleccionado] = useState(null); // Estado para el mazo seleccionado
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
    // Busca el mazo para verificar si fue usado
    const mazo = mazos.find((m) => m.id === mazoId);
    if (!mazo.usadoEnPartida) {
      const confirmado = window.confirm("¿Seguro que quieres eliminar este mazo?");
      if (!confirmado) return;
    }
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
    navigate(`/jugar/${mazoId}`); // Redirige a la página de jugar con el mazoId en la URL
  };

  const handleCrearNuevoMazo = () => {
    navigate("/alta-mazo");
  };

  return (
    <div className="mazos-container">
      <h2>Mis Mazos</h2>
      <table className="mazos-table">
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
              <td >
                <button className="ver-mazo" onClick={() => handleVerMazo(mazo)}>Ver Mazo</button>
                <button
                  className="eliminar"
                  onClick={() => handleEliminar(mazo.id)}
                  disabled={mazo.usadoEnPartida}
                >
                  Eliminar
                </button>
                {editingMazoId === mazo.id ? (
                  <span style={{ display: "inline-flex", gap: "5px" }}>
                    <button onClick={() => handleEditar(mazo.id)} style={{ backgroundColor: "#007bff", color: "#fff" }} >Guardar</button>
                    <button
                      className="cancelar"
                      onClick={() => {
                        setEditingMazoId(null);
                        setNewMazoName("");
                      }}
                    >
                      Cancelar
                    </button>
                  </span>
                ) : (
                  <button className="editar" onClick={() => setEditingMazoId(mazo.id)}>Editar</button>
                )}
                <button className="jugar" onClick={() => handleJugar(mazo.id)}>Jugar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleCrearNuevoMazo}
        disabled={mazos.length >= 3}
        className="crear-mazo"
        style={{ backgroundColor: "#007bff", color: "#fff" }}
      >
        Alta de nuevo mazo
      </button>
      {mazos.length >= 3 && (
        <div className="mazos-limite">
          Solo puedes tener hasta 3 mazos.
        </div>
      )}
      <MazoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        mazo={mazoSeleccionado}
      />
    </div>
  );
};

export default MazosPages;