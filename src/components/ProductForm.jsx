import { useState, useEffect } from 'react'

export default function ProductForm({ onAdd = [] }) {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [categoria, setCategoria] = useState('')
  const [categoriasGuardadas, setCategoriasGuardadas] = useState([])

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('categorias')) || []
    // Limpiar duplicados y espacios extra
    const unicas = [...new Set(guardadas.map(c => c.trim().toLowerCase()))]
    setCategoriasGuardadas(unicas)
  }, [])

  const guardarCategoria = (nueva) => {
    if (!nueva) return
    const formateada = nueva.trim().toLowerCase()
    if (categoriasGuardadas.includes(formateada)) return

    const nuevas = [...categoriasGuardadas, formateada]
    setCategoriasGuardadas(nuevas)
    localStorage.setItem('categorias', JSON.stringify(nuevas))
  }

  const eliminarTodasLasCategorias = () => {
    if (window.confirm('¿Deseas borrar todas las categorías guardadas?')) {
      localStorage.removeItem('categorias')
      setCategoriasGuardadas([])
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

    guardarCategoria(categoriaLimpia)

    // ✅ Limpiar inputs de verdad
    setNombre('')
    setPrecio('')
    setCategoria('')
  }

  return (
    <div>
      {/* 🔘 Botón de reinicio de categorías */}
      <div className="form mb-4 text-right ">
        <button
          onClick={eliminarTodasLasCategorias}
          className="text-sm text-red-600 hover:text-red-800 underline"
        >
          Borrar categorías guardadas
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* CATEGORÍA - con datalist */}
        <div className='overflow-y-auto scroll-invisible z-30'>
          <label className="block text-sm font-medium text-gray-300 ">Categoría</label>
          <input
            list="categorias"
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-red-600 focus:outline-none"
            placeholder="Ej: carnes, gaseosas, etc."
          />
          <datalist id="categorias">
            {categoriasGuardadas.map((cat, i) => (
              <option key={i} value={cat} />
            ))}
          </datalist>
        </div>

        {/* NOMBRE */}
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

        {/* PRECIO */}
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

        {/* BOTÓN SUBMIT */}
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
