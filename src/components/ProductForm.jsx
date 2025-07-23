import { useState, useEffect } from 'react'
import '../styles/styles.css'

export default function ProductForm({ onAdd }) {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [categoria, setCategoria] = useState('')
  const [categoriasGuardadas, setCategoriasGuardadas] = useState([])

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('categorias')) || []
    setCategoriasGuardadas(guardadas)
  }, [])

  const guardarCategoria = (nueva) => {
    if (!nueva) return
    const yaExiste = categoriasGuardadas.includes(nueva)
    if (!yaExiste) {
      const nuevas = [...categoriasGuardadas, nueva]
      setCategoriasGuardadas(nuevas)
      localStorage.setItem('categorias', JSON.stringify(nuevas))
    }
  }

  const eliminarTodasLasCategorias = () => {
    if (window.confirm('¿Deseas borrar todas las categorías guardadas?')) {
      localStorage.removeItem('categorias')
      setCategoriasGuardadas([]) // Limpia también en el estado
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nombre || !precio || !categoria) return
    onAdd({ nombre, precio: parseFloat(precio), categoria })
    guardarCategoria(categoria)
    setNombre('')
    setPrecio('')
    setCategoria('')
  }

  return (
    <div>
      {/* Botón de reinicio de categorías */}
      <div className="form mb-4 text-right">
        <button
          onClick={eliminarTodasLasCategorias}
          className="text-sm text-red-600 hover:text-red-800 underline"
        >
          Borrar categorías guardadas
        </button>
      </div>

  <form onSubmit={handleSubmit} className="space-y-4">
  {/* INPUT CATEGORÍA - primero */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Categoría</label>
    <input
      list="categorias"
      type="text"
      className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none"
      value={categoria}
      onChange={(e) => setCategoria(e.target.value)}
      placeholder="Ej: Embutidos ..."
    />
    <datalist id="categorias">
      {categoriasGuardadas.map((cat, i) => (
        <option key={i} value={cat} />
      ))}
    </datalist>
  </div>

  {/* INPUT NOMBRE */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Nombre del producto</label>
    <input
      type="text"
      className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      placeholder="Ej: Chorizos (pqt ó und)..."
    />
  </div>

  {/* INPUT PRECIO */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Precio (S/.)</label>
    <input
      type="number"
      step="0.01"
      className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none"
      value={precio}
      onChange={(e) => setPrecio(e.target.value)}
      placeholder="Ej: 3.50 ... 12.00"
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
