import { useState, useEffect } from 'react'

export default function ProductForm({ onAdd = [] }) {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [categoria, setCategoria] = useState('')
  const [categoriasPredeterminadas, setCategoriasPredeterminadas] = useState([])

  useEffect(() => {
    fetch('/data/imagenes.json')
      .then(res => res.json())
      .then(data => {
        const predeterminadas = data.map(item => item.categoria.trim().toLowerCase())
        setCategoriasPredeterminadas(predeterminadas)
      })
      .catch(err => console.error('Error al cargar las categorías predeterminadas:', err))
  }, [])

  const guardarCategoria = (nuevaCategoria) => {
    const categoriasExistentes = JSON.parse(localStorage.getItem('categorias')) || []
    const normalizada = nuevaCategoria.trim().toLowerCase()
    if (!categoriasExistentes.includes(normalizada)) {
      const actualizadas = [...categoriasExistentes, normalizada]
      localStorage.setItem('categorias', JSON.stringify(actualizadas))
    }
  }

  const eliminarTodasLasCategorias = () => {
    if (window.confirm('¿Deseas borrar todas las categorías guardadas?')) {
      localStorage.removeItem('categorias')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nombreLimpio = nombre.trim()
    const categoriaLimpia = categoria.trim().toLowerCase()
    const precioLimpio = parseFloat(precio)

    if (!nombreLimpio || !precioLimpio || !categoriaLimpia) {
      alert('Completa todos los campos correctamente')
      return
    }

    onAdd({
      nombre: nombreLimpio,
      precio: precioLimpio,
      categoria: categoriaLimpia
    })

    guardarCategoria(categoriaLimpia) // <-- Aquí se guarda bien

    setNombre('')
    setPrecio('')
    setCategoria('')
  }

  return (
    <div>
      <div className="form mb-4 text-right ">
        <button
          onClick={eliminarTodasLasCategorias}
          className="text-sm text-red-600 hover:text-red-800 underline"
        >
          Borrar categorías guardadas
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className='overflow-y-auto scroll-invisible z-30'>
          <label className="block text-sm font-medium text-gray-300">Categoría</label>
          <input
            list="categorias"
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-red-600 focus:outline-none"
            placeholder="Ej: carnes, gaseosas, etc."
          />
          <datalist id="categorias">
            {categoriasPredeterminadas.map((cat, i) => (
              <option key={i} value={cat} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del producto</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: chorizo "
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Precio (S/.)</label>
          <input
            type="number"
            step="0.01"
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ej: 3.50"
          />
        </div>

        <div className="btn-submit text-center">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow"
          >
            Agregar producto
          </button>
        </div>
      </form>
    </div>
  )
}
