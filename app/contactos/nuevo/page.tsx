'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ContactoPage() {
  // Tipos
  type Grupo = { id: number; nombre: string }

  // Estado del formulario
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

  // Estado para los grupos y mensaje
  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const cargarGrupos = async () => {
      const { data, error } = await supabase
        .from('grupo_empresarial')
        .select('id, nombre')
        .order('nombre', { ascending: true })

      if (error) {
        console.error(error)
      } else {
        setGrupos(data as Grupo[])
      }
    }
    cargarGrupos()
  }, [])

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
    const { error } = await supabase.from('contacto').insert([form])

    if (error) {
      setMensaje('❌ Error: ' + error.message)
    } else {
      setMensaje('✅ Contacto guardado')
      setForm({
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
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow-xl bg-white">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">⬅ Volver al menú principal</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">➕ Crear Nuevo Contacto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="cargo"
          value={form.cargo}
          onChange={handleChange}
          placeholder="Cargo"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="grupo_empresarial_id"
          value={form.grupo_empresarial_id}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Selecciona un grupo</option>
          {grupos.map((g) => (
            <option key={g.id} value={g.id}>
              {g.nombre}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <label>
            <input
              type="checkbox"
              name="es_qf"
              checked={form.es_qf}
              onChange={handleChange}
              className="mr-2"
            />
            ¿Es QF?
          </label>
          <label>
            <input
              type="checkbox"
              name="es_decisor"
              checked={form.es_decisor}
              onChange={handleChange}
              className="mr-2"
            />
            ¿Es Decisor?
          </label>
          <label>
            <input
              type="checkbox"
              name="enviar_facturas"
              checked={form.enviar_facturas}
              onChange={handleChange}
              className="mr-2"
            />
            Enviar Facturas
          </label>
          <label>
            <input
              type="checkbox"
              name="enviar_cobros"
              checked={form.enviar_cobros}
              onChange={handleChange}
              className="mr-2"
            />
            Enviar Cobros
          </label>
          <label>
            <input
              type="checkbox"
              name="activo"
              checked={form.activo}
              onChange={handleChange}
              className="mr-2"
            />
            Activo
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
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
