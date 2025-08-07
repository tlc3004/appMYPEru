import { useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import Dashboard from './pages/Dashboard'
import GuideUse from './components/GuideUse'
import './styles/styles.css'
import LegalBadgeHibrido from './custom/LegalBadgeHibrido'
import useAppData from './custom/useAppData'

export default function App() {
  const [productos, setProductos] = useState([])
  const [modoVenta, setModoVenta] = useState(false)
  const [mostrarGuia, setMostrarGuia] = useState(false)
  const [categoriasBase, setCategoriasBase] = useState([])
  const [categoriasGuardadas, setCategoriasGuardadas] = useState([])
  const [ iconos, setIconos]=useState(true)
  const apps=useAppData('/data/apps.json')

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

  // Cargar categorías guardadas
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('categorias')) || []
    setCategoriasGuardadas(guardadas)
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
    <div className="overflow-y-scroll max-h-[100vh] scroll-invisible">
      <div className="min-h-screen bg-[url('/img/Interacci%C3%B3n%20digital%20en%20la%20calle.png')] bg-cover bg-center py-4 md:px-1">
   <div className="fixed top-10 left-2 flex flex-col gap-4 z-10">
  {apps.map((app, index) => (
    <a key={index} href={app.url}>
      <img
        src={app.logo}
        alt={app.nombre}
        title={app.nombre}
        className="relative mb-20 left-5 w-10 h-10 gap-10 hover:scale-110 transition-transform cursor-pointer"
      />
    </a>
  ))}
</div>




        {modoVenta ? (
          <Dashboard
            productos={productos}
            setProductos={setProductos}
            onAgregar={() => setModoVenta(false)}
            setCategoriasGuardadas={categoriasGuardadas}
          />
        ) : mostrarGuia ? (
          <GuideUse onVolver={() => setMostrarGuia(false)} />
        ) : (
          <div className="max-w-3xl mx-auto bg-white/90 shadow-md rounded-lg p-6">
            <header className="text-center mb-6 bg-white/70 p-4 rounded">
              <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 tracking-tight">
                APPMYPErú
              </h1>
              <p className="text-gray-800 mt-2 text-lg">
                Caja registradora para emprendedores peruanos
              </p>
            </header>

            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Añadir a mi inventario</h2>

            <ProductForm onAdd={agregarProducto} sugerencias={categoriasBase} />

            <div className="mt-6 flex justify-between">
              <button
                className="bg-gray-700 hover:bg-gray-900 text-white font-semibold px-6 py-2 rounded shadow"
                onClick={() => setMostrarGuia(true)}
              >
                Modo de Uso 👈
              </button>
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-md shadow ml-6"
                onClick={() => setModoVenta(true)}
              >
                Ir a Mi Tienda
              </button>
            {/* 🎯 Íconos legales abajo como querías, sin footer */}
                        <div className="mt-4 flex gap-4 justify-center">
              <LegalBadgeHibrido clave="terminos" className={() => setIconos()} />
              <LegalBadgeHibrido clave="politica" className={() => setIconos(true)} />
            </div>

 
            <div className="iconos  translate-x-2 flex flex-row gap-4 z-10">
              <LegalBadgeHibrido clave="terminos" className={() => setIconos()} />
              <LegalBadgeHibrido clave="politica" className={() => setIconos(true)} />
            </div>
            </div>
                  </div>  
                )
              }
            </div>
          </div>
        )
      }