export default function ProductButton({ producto, onClick, onEliminar }) {
  return (
    <div className="relative group">
      <button
        className="w-full h-20 sm:h-16 bg-indigo-100 rounded shadow hover:bg-indigo-200 flex items-center justify-center text-center p-2"
        onClick={() => onClick(producto)} // ← Aquí se dispara "Agregar a venta"
      >
        <div>
          <strong className="text-sm">{producto.nombre}</strong>
        </div>
      </button>

      <button
        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
        onClick={(e) => {
          e.stopPropagation()
          onEliminar(producto.id)
        }}
        title="Eliminar producto"
      >
        ✕
      </button>
    </div>
  )
}
