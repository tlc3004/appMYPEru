export default function ProductButton({ producto, onClick, onEliminar, imagen }) {
  return (
    <div className="relative w-full max-w-[130px] mx-auto group">
      <button
        className="w-full h-24 bg-indigo-100 rounded shadow hover:bg-indigo-200 flex flex-col items-center justify-center p-2"
        onClick={() => onClick(producto)}
      >
    {imagen && (
  <div className="text-3xl mb-1">
    {imagen}
  </div>
)}

        <strong className="text-sm text-center">{producto.nombre}</strong>
      </button>

      <button
        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 m-1  group-hover:opacity-100 transition"
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
