import { useState } from 'react'
import ProductButton from '../components/ProductButton'
import Receipt from '../components/Receipt'

export default function Dashboard({ productos, onAgregar }) {
  const [seleccionados, setSeleccionados] = useState([])
  const [mostrarBoleta, setMostrarBoleta] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas')

  const agregarAVenta = (producto) => {
    setSeleccionados([...seleccionados, producto])
  }

  const limpiarBoleta = () => {
    setSeleccionados([])
  }

  const productosFiltrados =
    categoriaSeleccionada === 'todas'
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-4">
      {/* Panel de productos */}
      <div className="md:col-span-2 flex flex-col gap-4">
        <div className="bg-white p-4 rounded shadow-md">
          <label className="block mb-2 font-semibold text-gray-700">
            Categorías:
          </label>
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          >
        <option value="todas">todas</option>
        <option value="gaseosa">Gaseosa</option>
          <option value="dulce">limpieza</option>
          <option value="embutido">Embutidos</option>
          <option value="Cervesas">Cervesas</option>
          <option value="Verduras">Verduras</option>
          <option value="Abarrotes">Abarrotes</option>
          <option value="Licores">Licores</option>
          <option value="aseo">aseo</option>
          <option value="Frutas">Frutas</option>
          <option value="Menestras">Menestras</option>
          <option value="Fideos">Fideos</option>
          <option value="helados">helados</option>
          <option value="Cigarros">Cigarros</option>
          <option value="Confites">Confites</option>
          </select>
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-bold text-indigo-700 mb-3">TIENDA</h2>
          {productosFiltrados.length === 0 ? (
            <p className="text-gray-500 text-sm">Ingrese un producto</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {productosFiltrados.map((producto) => (
                <ProductButton
                  key={producto.id}
                  producto={producto}
                  onClick={agregarAVenta}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Panel derecho - Receipt */}
      <div className="flex flex-col gap-4">
        {!mostrarBoleta ? (
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-2 px-4 rounded shadow-md transition"
            onClick={() => setMostrarBoleta(true)}
          >
            Monto Actual
          </button>
        ) : (
          <>
            <Receipt venta={seleccionados} onClear={limpiarBoleta} />
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white text-sm py-2 px-4 rounded shadow"
              onClick={() => setMostrarBoleta(false)}
            >
              Cerrar
            </button>
          </>
        )}

        <button
          className="bg-gray-800 hover:bg-gray-900 text-white text-sm py-2 px-4 rounded shadow"
          onClick={onAgregar}
        >
          ← Volver
        </button>
      </div>
    </div>
  )
}
