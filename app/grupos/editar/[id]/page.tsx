'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function EditarGrupoPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const fetchGrupo = async () => {
      const { data, error } = await supabase
        .from('grupo_empresarial')
        .select('nombre')
        .eq('id', id)
        .single()

      if (error) console.error(error)
      else setNombre(data?.nombre || '')
    }
    fetchGrupo()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('grupo_empresarial')
      .update({ nombre })
      .eq('id', id)

    if (error) setMensaje('❌ Error: ' + error.message)
    else {
      setMensaje('✅ Grupo actualizado')
      setTimeout(() => router.push('/grupos'), 1500)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-xl bg-white">
      <h1 className="text-2xl font-bold mb-4">Editar Grupo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del grupo"
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Guardar
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
