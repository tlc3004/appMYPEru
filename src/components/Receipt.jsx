export default function Receipt({ venta, onClear, onClosed }) {
  const total = venta.reduce((acc, p) => acc + p.precio, 0)

  return (
    <aside className="fixed right-0 top-0 h-full w-72 bg-white shadow-lg border-l z-50 flex flex-col transition-transform duration-300">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-bold text-indigo-700">🧾 Boleta</h2>
        <button
          onClick={onClosed} // ✅ CORRECTO
          className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-2 rounded shadow-md"
        >
          Cerrar
        </button>
      </div>

      {/* Lista productos */}
      <div className="flex-1 overflow-y-auto p-4">
        {venta.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">
            Aún no hay productos seleccionados
          </p>
        ) : (
          <ul className="divide-y divide-gray-200 text-sm">
            {venta.map((p, i) => (
              <li key={i} className="flex justify-between py-2">
                <span>{p.nombre}</span>
                <span className="font-semibold">S/. {p.precio.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total y botón */}
      <div className="p-4 border-t">
        <div className="flex justify-between font-bold mb-3">
          <span>Total:</span>
          <span>S/. {total.toFixed(2)}</span>
        </div>
        {venta.length > 0 && (
          <button
            onClick={onClear}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded shadow"
          >
            Limpiar Boleta
          </button>
        )}
      </div>
    </aside>
  )
}
