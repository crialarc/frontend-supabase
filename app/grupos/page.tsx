// ✅ app/grupos/page.tsx - Lista de Grupos Empresariales con botón de edición

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ListaGruposPage() {
  type Grupo = {
    id: number
    nombre: string
  }

  const [grupos, setGrupos] = useState<Grupo[]>([])

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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🏢 Grupos Empresariales</h1>

      <div className="flex justify-end mb-4">
        <Link href="/grupos/nuevo" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          ➕ Nuevo Grupo
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-200">
        <table className="min-w-full text-sm text-gray-700 border-collapse border border-black">
          <thead className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 border border-black text-left">ID</th>
              <th className="px-4 py-3 border border-black text-left">Nombre</th>
              <th className="px-4 py-3 border border-black text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {grupos.map((g, i) => (
              <tr
                key={g.id}
                className={`$ {i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
              >
                <td className="px-4 py-3 border border-black">{g.id}</td>
                <td className="px-4 py-3 border border-black">{g.nombre}</td>
                <td className="px-4 py-3 border border-black text-center">
                  <Link
                    href={`/grupos/editar/${g.id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    ✏️ Editar
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
