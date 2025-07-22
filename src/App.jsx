import { useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import Dashboard from './pages/Dashboard'
import './styles/styles.css'

export default function App() {
  const [productos, setProductos] = useState([])
  const [modoVenta, setModoVenta] = useState(false)

  // Cargar productos guardados
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('productos')) || []
    setProductos(guardados)
  }, [])

  // Guardar productos cada vez que cambian
  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos))
  }, [productos])

  // Agregar un nuevo producto con ID
  const agregarProducto = (producto) => {
    const nuevo = { ...producto, id: Date.now() }
    setProductos([...productos, nuevo])
  }

return (
  <div className="min-h-screen bg-[url('/img/Interacci%C3%B3n%20digital%20en%20la%20calle.png')] bg-cover bg-center py-4 px-2 md:px-10">
    {!modoVenta ? (
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
        <ProductForm onAdd={agregarProducto} />
<div className="mt-6 flex justify-center">
  <button
    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow"
    onClick={() => setModoVenta(true)}
  >
    Ir a Mi Tienda
  </button>
</div>


      </div>
    ) : (
      <Dashboard
        productos={productos}
        setProductos={setProductos}
        onAgregar={() => setModoVenta(false)}
      
      />

      
    )}
  </div>
)

}
