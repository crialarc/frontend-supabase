'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function NuevoGrupoPage() {
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase
      .from('grupo_empresarial')
      .insert([{ nombre }])

    if (error) {
      setMensaje('❌ Error al guardar: ' + error.message)
    } else {
      setMensaje('✅ Grupo guardado correctamente')
      setTimeout(() => router.push('/grupos'), 1000)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-xl bg-white">
      <h1 className="text-2xl font-bold mb-4">➕ Nuevo Grupo Empresarial</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del grupo"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Guardar Grupo
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
