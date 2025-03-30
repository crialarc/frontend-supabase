// ✅ app/grupos/page.tsx

'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function GruposPage() {
  type Grupo = {
    id: number
    nombre: string
  }

  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    const fetchGrupos = async () => {
      const { data, error } = await supabase
        .from('grupo_empresarial')
        .select('id, nombre')
        .order('id')

      if (error) console.error(error)
      else setGrupos(data as Grupo[])
    }
    fetchGrupos()
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">⬅ Volver al menú principal</Link>
        <input
          type="text"
          placeholder="Buscar grupo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full md:w-80 border p-2 rounded"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">🏢 Lista de Grupos Empresariales</h1>

      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-200">
        <table className="min-w-full text-sm text-gray-700 border-collapse border border-black">
          <thead className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 border border-black text-left">ID</th>
              <th className="px-4 py-3 border border-black text-left">Nombre</th>
              <th className="px-4 py-3 border border-black text-center">Editar</th>
            </tr>
          </thead>
          <tbody>
            {grupos
              .filter((g) => g.nombre.toLowerCase().includes(busqueda.toLowerCase()))
              .map((g, i) => (
                <tr
                  key={g.id}
                  className={`${
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-4 py-3 border border-black">{g.id}</td>
                  <td className="px-4 py-3 border border-black">{g.nombre}</td>
                  <td className="px-4 py-3 border border-black text-center">
                    <Link
                      href={`/grupos/editar/${g.id}`}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}