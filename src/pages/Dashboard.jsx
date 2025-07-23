import { useState, useEffect } from 'react'
import ProductButton from '../components/ProductButton'
import Receipt from '../components/Receipt'

export default function Dashboard({ productos, onAgregar, setProductos }) {
  const [seleccionados, setSeleccionados] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas')
  const [mostrarBoleta, setMostrarBoleta] = useState(false)
   const [imagenes, setImagenes] = useState([])

  const agregarAVenta = (producto) => {
    setSeleccionados([...seleccionados, producto])
  }

  const limpiarBoleta = () => {
    setSeleccionados([])
  }

  const handleEliminarProducto = (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    const nuevos = productos.filter(p => p.id !== id)
    setProductos(nuevos)
    localStorage.setItem('productos', JSON.stringify(nuevos))
  }

  const productosFiltrados =
    categoriaSeleccionada === 'todas'
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada)

  const categoriasUnicas = ['todas', ...new Set(productos.map(p => p.categoria))]
  

    useEffect(() => {
    fetch('/data/imagenes.json')
      .then(res => res.json())
      .then(data => setImagenes(data))
      .catch(err => console.error('Error cargando imágenes:', err))
  }, [])
  

  const obtenerImagen = (categoria) => {
  const encontrada = imagenes.find((img) => img.categoria === categoria)
  return encontrada?.imagen || null
}


  return (
    <div className="h-screen flex flex-col md:flex-row gap-4 p-4 bg-white/30 backdrop-blur-md rounded-xl shadow-lg overflow-y-hidden">
      
      {/* 🔴 Overlay opaco si boleta está visible */}
      {mostrarBoleta && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => setMostrarBoleta(false)} // opcional: cerrar al hacer clic fuera
        />
      )}

      {/* 🧾 BOLETA (encima del overlay) */}
      {mostrarBoleta && (
        <Receipt
          venta={seleccionados}
          onClear={limpiarBoleta}
          onClosed={() => setMostrarBoleta(false)} // ✅ cerrar desde botón interno
        />
      )}

      {/* 🟢 Panel Izquierdo */}
      <div className="md:w-2/3 flex flex-col gap-4 overflow-y-auto z-10">
        {/* Filtro */}
        <div className="bg-white p-4 rounded shadow">
          <label className="block font-semibold text-gray-700 mb-2">Categorías:</label>
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400"
          >
            {categoriasUnicas.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Productos */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold text-indigo-700 mb-3">🛒 TIENDA</h2>
          {productosFiltrados.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay productos disponibles</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
           {productosFiltrados.map(producto => (
  <ProductButton
    key={producto.id}
    producto={producto}
    onClick={agregarAVenta}
    onEliminar={handleEliminarProducto}
    imagen={obtenerImagen(producto.categoria)} // 👈 Aquí está el pase de imagen
  />
))}

            </div>
          )}
        </div>
      </div>

      {/* 🔵 Panel Derecho: Botones */}
      <div className="md:w-1/3 flex flex-col gap-4 z-10">
        <button
          onClick={() => setMostrarBoleta(!mostrarBoleta)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-1 rounded shadow-md"
        >
          {mostrarBoleta ? 'Ocultar Boleta' : 'Ver Boleta'}
        </button>

        <button
          onClick={onAgregar}
          className="bg-gray-800 hover:bg-gray-900 text-white py-1 px-1 rounded shadow"
        >
          ← Volver
        </button>
      </div>
    </div>
  )
}
