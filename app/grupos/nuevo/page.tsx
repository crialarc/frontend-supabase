'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function NuevoGrupoPage() {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('grupo_empresarial').insert([{ nombre }])

    if (error) {
      setMensaje('❌ Error: ' + error.message)
    } else {
      setMensaje('✅ Grupo guardado')
      setNombre('')
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
      <h1 className="text-2xl font-bold mb-4">➕ Crear Nuevo Grupo Empresarial</h1>
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
