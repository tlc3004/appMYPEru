import { useEffect, useState } from 'react';

export default function LegalBadgeHibrido({ clave, fuente = "/data/legaldata.json", className = "" }) {
  const [datos, setDatos] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function cargar() {
      const res = await fetch(fuente);
      const data = await res.json();
      const entry = data[clave];

      if (!entry) return;

      if (clave === "contacto") {
        setDatos(entry); // No intentes leer .txt ni redirigir
        return;
      }

      if (entry.ruta) {
        const txt = await fetch(entry.ruta).then(r => r.text());
        setDatos({ ...entry, contenido: txt });
      } else {
        setDatos(entry);
      }
    }

    cargar();
  }, [clave, fuente]);

  if (!datos) return null;

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <button
        onClick={() => setVisible(!visible)}
        className="text-xl rounded-full p-3 hover:scale-110 transition-transform"
        title={datos.titulo}
      >
        {datos.icono || "📄"}
      </button>

      {visible && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-80 bg-white border border-gray-300 shadow-lg rounded p-4 text-sm z-50">
          <h4 className="font-bold mb-2">{datos.titulo}</h4>

          {/* 👇 Solo esta parte se adapta según la clave */}
          {clave === "contacto" ? (
            <div className="text-sm text-gray-800">
              <p>Escribe tu número para que te contactemos:</p>
              <input
                type="tel"
                placeholder="Ej. +51 999 999 999"
                className="mt-2 w-full border px-2 py-1 rounded text-black"
              />
              <button
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => alert("https://www.whatsapp.com")}
              >
                Enviar mensaje
              </button>
            </div>
          ) : (
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap">{datos.contenido}</pre>
          )}

          <button
            className="mt-2 text-xs text-blue-500 hover:underline"
            onClick={() => setVisible(false)}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}
