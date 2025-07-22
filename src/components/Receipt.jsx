export default function Receipt({ venta, onClear }) {
  const total = venta.reduce((acc, p) => acc + p.precio, 0)

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-xs mx-auto transition-all duration-300 ease-in-out">
      <h2 className="text-lg font-bold mb-3 text-indigo-800 text-center">🧾 Boleta actual</h2>

      {venta.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">Aún no hay productos seleccionados</p>
      ) : (
        <ul className="divide-y divide-gray-200 max-h-56 overflow-y-auto mb-3">
          {venta.map((p, i) => (
            <li
              key={i}
              className="flex justify-between items-center py-2 text-sm text-gray-700 hover:bg-gray-100 px-2 rounded transition"
            >
              <span>{p.nombre}</span>
              <span className="font-semibold text-gray-900">S/. {p.precio.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Total */}
      <div className="mt-3 border-t pt-2 flex justify-between text-base font-bold text-gray-800">
        <span>Total:</span>
        <span>S/. {total.toFixed(2)}</span>
      </div>

      {/* Botón limpiar boleta */}
      {venta.length > 0 && (
        <button
          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-2 px-4 rounded shadow-sm transition duration-300 ease-in-out"
          onClick={onClear}
        >
          Limpiar Boleta
        </button>
      )}
    </div>
  )
}
