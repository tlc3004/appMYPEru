import { useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import Dashboard from './pages/Dashboard'
import GuideUse from './components/GuideUse' // ✅ nombre corregido aquí si se llama GuideUse.jsx
import './styles/styles.css'

export default function App() {
  const [productos, setProductos] = useState([])
  const [modoVenta, setModoVenta] = useState(false)
  const [mostrarGuia, setMostrarGuia] = useState(false)
  const [categoriasBase, setCategoriasBase] = useState([])

  // Cargar productos guardados
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('productos')) || []
    setProductos(guardados)
  }, [])

  // Cargar categorías base desde el JSON
  useEffect(() => {
    fetch('/data/imagenes.json')
      .then(res => res.json())
      .then(data => {
        const categorias = data.map(item => item.categoria)
        setCategoriasBase(categorias)
      })
      .catch(err => console.error('Error cargando categorías base:', err))
  }, [])

  // Guardar productos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos))
  }, [productos])

  // Agregar producto con ID único
  const agregarProducto = (producto) => {
    const nuevo = { ...producto, id: Date.now() }
    setProductos([...productos, nuevo])
  }

  return (
    <div className="min-h-screen bg-[url('/img/Interacci%C3%B3n%20digital%20en%20la%20calle.png')] bg-cover bg-center py-4 md:px-1">
      {modoVenta ? (
        <Dashboard
          productos={productos}
          setProductos={setProductos}
          onAgregar={() => setModoVenta(false)}
        />
      ) : mostrarGuia ? (
        <GuideUse onVolver={() => setMostrarGuia(false)} />
      ) : (
        <div className="max-w-3xl mx-auto bg-white/90 shadow-md rounded-lg p-6">
          <header className="text-center mb-6 bg-white/70 p-4 rounded">
            <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 tracking-tight">
              APP-MYPEru
            </h1>
            <p className="text-gray-800 mt-2 text-lg">
              Caja registradora para emprendedores peruanos
            </p>
          </header>

          <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Añadir a mi inventario</h2>

          <ProductForm onAdd={agregarProducto} sugerencias={categoriasBase} />

          <div className="mt-6 flex justify-between">
            <button
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded shadow"
              onClick={() => setMostrarGuia(true)}
            >
              ¿Cómo se usa?
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow"
              onClick={() => setModoVenta(true)}
            >
              Ir a Mi Tienda
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
