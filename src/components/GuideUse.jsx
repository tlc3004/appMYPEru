import { useState } from 'react'
import '../styles/styles.css'

const pasos = [
  {
    titulo: '1. Añadir Productos',
    descripcion: 'Usa el formulario para ingresar productos con nombre, precio y categoría.',
    emoji: '📝'
  },
  {
    titulo: '2. Categorías Inteligentes',
    descripcion: 'Las categorías se guardan automáticamente para reutilizar fácilmente.',
    emoji: '🧠'
  },
  {
    titulo: '3. Ir a la Tienda',
    descripcion: 'Haz clic en "Ir a Mi Tienda" para activar el modo de venta.',
    emoji: '🏪'
  },
  {
    titulo: '4. Agregar a Boleta',
    descripcion: 'Toca un producto para agregarlo a la boleta. Puedes ver el total y eliminar productos.',
    emoji: '🛒'
  },
  {
    titulo: '5. Ver Boleta',
    descripcion: 'Haz clic en "Ver Boleta" para ver un resumen de tu venta.',
    emoji: '📋'
  }
]

export default function GuideUse({ onVolver }) {
  const [pasoActual, setPasoActual] = useState(0)

  const siguiente = () => {
    if (pasoActual < pasos.length - 1) setPasoActual(pasoActual + 1)
  }

  const anterior = () => {
    if (pasoActual > 0) setPasoActual(pasoActual - 1)
  }

  return (
    <div className="max-w-xl mx-auto bg-white/90 p-6 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Guía de Uso Interactiva
      </h2>

      <div className="text-center">
        <div className="text-6xl mb-4">{pasos[pasoActual].emoji}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{pasos[pasoActual].titulo}</h3>
        <p className="text-gray-600">{pasos[pasoActual].descripcion}</p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={anterior}
          disabled={pasoActual === 0}
          className={`px-4 py-2 rounded ${
            pasoActual === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          ← Anterior
        </button>

        {pasoActual < pasos.length - 1 ? (
          <button
            onClick={siguiente}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Siguiente →
          </button>
        ) : (
          <button
            onClick={onVolver}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cerrar Guía
          </button>
        )}
      </div>

      <div className="text-center mt-4 text-sm text-gray-500">
        Paso {pasoActual + 1} de {pasos.length}
      </div>
    </div>
  )
}
