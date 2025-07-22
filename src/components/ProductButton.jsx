export default function ProductButton({ producto, onClick }) {
  return (
    <button
      className="bg-white border border-gray-300 rounded shadow-md px-6 py-3 text-lg font-semibold text-gray-800 hover:bg-red-100 hover:scale-105 transition transform"
      onClick={() => onClick(producto)}
    >
      {producto.nombre}
    </button>
  )
}
