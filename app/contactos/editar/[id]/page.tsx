'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function EditarContactoPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  type Grupo = { id: number; nombre: string }

  const [form, setForm] = useState({
    nombre: '',
    cargo: '',
    email: '',
    telefono: '',
    es_qf: false,
    es_decisor: false,
    enviar_facturas: false,
    enviar_cobros: false,
    activo: true,
    grupo_empresarial_id: '',
  })

  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const cargarDatos = async () => {
      const { data, error } = await supabase
        .from('contacto')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error(error)
      } else {
        setForm(data)
      }

      const grupos = await supabase
        .from('grupo_empresarial')
        .select('id, nombre')
        .order('nombre', { ascending: true })

      if (!grupos.error) setGrupos(grupos.data as Grupo[])
    }

    if (id) cargarDatos()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, type, checked } = target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { id: _, ...formSinId } = form // ← EXCLUIMOS el ID aquí
    const { error } = await supabase
      .from('contacto')
      .update(formSinId)
      .eq('id', id)

    if (error) {
      setMensaje('❌ Error: ' + error.message)
    } else {
      setMensaje('✅ Contacto actualizado')
      setTimeout(() => router.push('/contactos'), 1000)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow-xl bg-white">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">⬅ Volver al menú principal</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">✏️ Editar Contacto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="w-full border p-2 rounded" required />
        <input name="cargo" value={form.cargo} onChange={handleChange} placeholder="Cargo" className="w-full border p-2 rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" required />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="w-full border p-2 rounded" required />

        <select name="grupo_empresarial_id" value={form.grupo_empresarial_id} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Selecciona un grupo</option>
          {grupos.map((g) => (
            <option key={g.id} value={g.id}>{g.nombre}</option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <label><input type="checkbox" name="es_qf" checked={form.es_qf} onChange={handleChange} className="mr-2" /> ¿Es QF?</label>
          <label><input type="checkbox" name="es_decisor" checked={form.es_decisor} onChange={handleChange} className="mr-2" /> ¿Es Decisor?</label>
          <label><input type="checkbox" name="enviar_facturas" checked={form.enviar_facturas} onChange={handleChange} className="mr-2" /> Enviar Facturas</label>
          <label><input type="checkbox" name="enviar_cobros" checked={form.enviar_cobros} onChange={handleChange} className="mr-2" /> Enviar Cobros</label>
          <label><input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} className="mr-2" /> Activo</label>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Guardar Cambios
        </button>
        {mensaje && <p className={`mt-4 font-semibold ${mensaje.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{mensaje}</p>}
      </form>
    </div>
  )
}
