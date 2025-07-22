export default function ProductButton({ producto, onClick, onEliminar }) {
  return (
    <div className="relative group">
      <button
        className="w-full h-10 bg-indigo-100 rounded shadow hover:bg-indigo-200 flex items-center justify-center text-center p-2"
        onClick={() => onClick(producto)}
      >
        <div>
          <strong>{producto.nombre}</strong>
          <br />
          {/* <span className="text-sm text-gray-600">S/. {parseFloat(producto.precio).toFixed(2)}</span> */}
        </div>
      </button>

      {/* Botón de eliminar flotante */}
      <button
        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-3 h-3 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
        onClick={(e) => {
          e.stopPropagation()
          onEliminar(producto.id)
        }}
        title="Eliminar producto"
      >
        x
      </button>
    </div>
  )
}
