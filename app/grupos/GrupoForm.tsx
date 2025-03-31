// ✅ app/grupos/GrupoForm.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export type Grupo = {
  id?: number
  nombre: string
}

type GrupoFormProps = {
  modo: 'crear' | 'editar'
  grupoInicial?: Grupo
}

export default function GrupoForm({ modo, grupoInicial }: GrupoFormProps) {
  const [form, setForm] = useState<Grupo>({ nombre: '' })
  const [mensaje, setMensaje] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (grupoInicial) {
      setForm(grupoInicial)
    }
  }, [grupoInicial])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let error

    if (modo === 'crear') {
      const { error: insertError } = await supabase.from('grupo_empresarial').insert([form])
      error = insertError
    } else {
      const { error: updateError } = await supabase
        .from('grupo_empresarial')
        .update({ nombre: form.nombre })
        .eq('id', form.id)
      error = updateError
    }

    if (error) {
      setMensaje('❌ Error: ' + error.message)
    } else {
      setMensaje('✅ Grupo guardado correctamente')
      setTimeout(() => {
        router.push('/grupos')
      }, 1500)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-xl bg-white">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">⬅ Volver al menú principal</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">
        {modo === 'crear' ? '➕ Crear Nuevo Grupo Empresarial' : '✏️ Editar Grupo Empresarial'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre del Grupo"
          className="w-full border p-2 rounded"
          required
        />

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>

        {mensaje && (
          <p className={`mt-2 font-medium ${mensaje.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  )
}
