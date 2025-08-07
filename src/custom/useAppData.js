/**
 * useAppData - Custom React Hook para cargar rutas de aplicaciones desde un archivo JSON.
 *
 * Copyright (c) 2025 Antonio León (Toño)
 * 
 * MIT License
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// src/hooks/useAppLinks.js

import { useEffect, useState } from "react";

export default function useAppData(fuente = "/data/apps.json") {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch(fuente);
        const data = await res.json();
        setApps(data);
      } catch (error) {
        console.error("❌ Error al cargar rutas de apps:", error);
      }
    }

    cargar();
  }, [fuente]);

  return apps;
}
