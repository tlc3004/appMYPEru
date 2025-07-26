import { useState, useEffect } from 'react'
import ProductButton from '../components/ProductButton'
import Receipt from '../components/Receipt'

export default function Dashboard({ productos, onAgregar, setProductos }) {
  const [seleccionados, setSeleccionados] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas')
  const [mostrarBoleta, setMostrarBoleta] = useState(false)
  const [imagenes, setImagenes] = useState([])

  const [categoriasGuardadas, setCategoriasGuardadas] = useState([])
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('categorias')) || []
    const unicas = [...new Set(guardadas.map(c => c.trim().toLowerCase()))]
    setCategoriasGuardadas(unicas)
  }, [])

  const agregarAVenta = (producto) => {
    setSeleccionados([...seleccionados, producto])
  }

  const limpiarBoleta = () => setSeleccionados([])

  const handleEliminarProducto = (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    const nuevos = productos.filter(p => p.id !== id)
    setProductos(nuevos)
    localStorage.setItem('productos', JSON.stringify(nuevos))
  }

  const productosFiltrados =
    categoriaSeleccionada === 'todas'
      ? productos
      : productos.filter(p => p.categoria === categoriaSeleccionada)

  useEffect(() => {
    fetch('/data/imagenes.json')
      .then(res => res.json())
      .then(data => setImagenes(data))
      .catch(err => console.error('Error cargando imagenes:', err))
  }, [])

  const obtenerImagen = (categoria) => {
    const encontrada = imagenes.find(img => img.categoria === categoria)
    return encontrada?.imagen || null
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="relative z-2 h-full flex flex-col md:flex-row gap-4 p-4 bg-white/30 backdrop-blur-md rounded-xl shadow-lg">
        {mostrarBoleta && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-4"
            onClick={() => setMostrarBoleta(false)}
          />
        )}

        {mostrarBoleta && (
          <Receipt
            venta={seleccionados}
            onClear={limpiarBoleta}
            onClosed={() => setMostrarBoleta(false)}
          />
        )}

        <div className="md:w-2/3 flex flex-col gap-4 overflow-y-auto scroll-invisible z-30 pr-1">
          <div className="bg-white p-4 rounded shadow">
            <label className="block font-semibold text-gray-700 mb-2">Categorías:</label>
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded focus:ring-2 focus:ring-indigo-100 overflow-y-auto scroll-invisible z-30"
            >
              <option value="todas">Todas</option>
              {categoriasGuardadas.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white p-4 rounded shadow overflow-y-auto scroll-invisible z-30 ">
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
                    imagen={obtenerImagen(producto.categoria)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col gap-4 z-30">
          <button
            onClick={() => setMostrarBoleta(!mostrarBoleta)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-3 rounded shadow-md"
          >
            {mostrarBoleta ? 'Ocultar Boleta' : 'Ver Boleta'}
          </button>

          <button
            onClick={onAgregar}
            className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-3 rounded shadow"
          >
            ← Agregar un Nuevo Producto
          </button>
        </div>
      </div>
    </div>
  )
}
