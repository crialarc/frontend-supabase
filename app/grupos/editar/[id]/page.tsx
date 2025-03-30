'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function EditarGrupoPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const obtenerGrupo = async () => {
      const { data, error } = await supabase
        .from('grupo_empresarial')
        .select('nombre')
        .eq('id', id)
        .single()

      if (error) {
        console.error(error)
        setMensaje('❌ Error al obtener el grupo')
      } else {
        setNombre(data.nombre)
      }
    }
    if (id) obtenerGrupo()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('grupo_empresarial')
      .update({ nombre })
      .eq('id', id)

    if (error) {
      setMensaje('❌ Error: ' + error.message)
    } else {
      setMensaje('✅ Grupo actualizado')
      setTimeout(() => {
        router.push('/grupos')
      }, 1500)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white border rounded-xl shadow-xl">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">⬅ Volver al menú principal</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">✏️ Editar Grupo Empresarial</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del grupo"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
        >
          Actualizar Grupo
        </button>
        {mensaje && (
          <p
            className={`mt-4 font-semibold ${
              mensaje.startsWith('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {mensaje}
          </p>
        )}
      </form>
    </div>
  )
}
