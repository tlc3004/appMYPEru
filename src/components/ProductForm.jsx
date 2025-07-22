import { useState } from 'react'

export default function ProductForm({ onAdd }) {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [categoria, setCategoria] = useState('gaseosa')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nombre || !precio || !categoria) return
    onAdd({ nombre, precio: parseFloat(precio), categoria })
    setNombre('')
    setPrecio('')
    setCategoria('gaseosa')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre del producto</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Abarrotes"
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
          placeholder="Ej: 5.00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
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

      <div className="text-center">
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow"
        >
          Agregar producto
        </button>
      </div>
    </form>
  )
}
