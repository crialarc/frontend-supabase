// ✅ app/contactos/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ContactosPage() {
  type Contacto = {
    id: number
    nombre: string
    cargo: string
    email: string
    telefono: string
    es_qf: boolean
    es_decisor: boolean
    enviar_facturas: boolean
    enviar_cobros: boolean
    activo: boolean
    grupo_empresarial: { nombre: string } | null
  }

  const [contactos, setContactos] = useState<Contacto[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchContactos = async () => {
      const { data, error } = await supabase
        .from('contacto')
        .select(`
          id,
          nombre,
          cargo,
          email,
          telefono,
          es_qf,
          es_decisor,
          enviar_facturas,
          enviar_cobros,
          activo,
          grupo_empresarial:grupo_empresarial_id(nombre)
        `)
        .order('id', { ascending: true })

      if (error) console.error(error)
      else setContactos(data as Contacto[])
    }
    fetchContactos()
  }, [])

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📋 Lista de Contactos</h1>

      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-200">
        <table className="min-w-full text-sm text-gray-700 border-collapse border border-black">
          <thead className="bg-gray-100 sticky top-0 z-10 text-xs text-gray-600 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 border border-black text-left">ID</th>
              <th className="px-4 py-3 border border-black text-left">Nombre</th>
              <th className="px-4 py-3 border border-black text-left">Cargo</th>
              <th className="px-4 py-3 border border-black text-left">Email</th>
              <th className="px-4 py-3 border border-black text-left">Teléfono</th>
              <th className="px-4 py-3 border border-black text-left">Grupo</th>
              <th className="px-4 py-3 border border-black text-center">QF</th>
              <th className="px-4 py-3 border border-black text-center">Decisor</th>
              <th className="px-4 py-3 border border-black text-center">Facturas</th>
              <th className="px-4 py-3 border border-black text-center">Cobros</th>
              <th className="px-4 py-3 border border-black text-center">Activo</th>
              <th className="px-4 py-3 border border-black text-center">Editar</th>
            </tr>
          </thead>
          <tbody>
            {contactos.map((c, i) => (
              <tr key={c.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                <td className="px-4 py-3 border border-black">{c.id}</td>
                <td className="px-4 py-3 border border-black">{c.nombre}</td>
                <td className="px-4 py-3 border border-black">{c.cargo}</td>
                <td className="px-4 py-3 border border-black">{c.email}</td>
                <td className="px-4 py-3 border border-black">{c.telefono}</td>
                <td className="px-4 py-3 border border-black">
                  <span className="inline-block bg-gray-200 px-2 py-1 rounded text-xs font-medium">
                    {c.grupo_empresarial?.nombre || '-'}
                  </span>
                </td>
                <td className="px-4 py-3 border border-black text-center">{c.es_qf ? '✔' : '✘'}</td>
                <td className="px-4 py-3 border border-black text-center">{c.es_decisor ? '✔' : '✘'}</td>
                <td className="px-4 py-3 border border-black text-center">{c.enviar_facturas ? '✔' : '✘'}</td>
                <td className="px-4 py-3 border border-black text-center">{c.enviar_cobros ? '✔' : '✘'}</td>
                <td className="px-4 py-3 border border-black text-center">{c.activo ? '✔' : '✘'}</td>
                <td className="px-4 py-3 border border-black text-center">
                  <button
                    onClick={() => router.push(`/editar-contacto/${c.id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1 px-3 rounded text-xs shadow"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
