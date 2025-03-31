'use client'

import ContactoForm, { Contacto } from '../ContactoForm'
import { supabase } from '@/lib/supabase'

export default function NuevoContactoPage() {
  const contactoInicial: Contacto = {
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
  }

  const crearContacto = async (data: Contacto) => {
    const { error } = await supabase.from('contacto').insert([data])
    if (error) console.error('Error al crear contacto:', error)
  }

  return <ContactoForm initialData={contactoInicial} onSubmit={crearContacto} modo="crear" />
}