'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ContactoForm, { Contacto } from '../../ContactoForm'
import { supabase } from '@/lib/supabase'

export default function EditarContactoPage() {
  const params = useParams()
  const id = Number(params?.id)
  const [contacto, setContacto] = useState<Contacto | null>(null)

  useEffect(() => {
    const cargarContacto = async () => {
      const { data, error } = await supabase
        .from('contacto')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('❌ Error al cargar contacto:', error)
      } else {
        setContacto(data)
      }
    }

    if (id) cargarContacto()
  }, [id])

  const actualizarContacto = async (contacto: Contacto) => {
    const { id: _omitId, grupo_empresarial, ...contactoSinRelacion } = contacto
  
    console.log('🔁 Actualizando contacto:', contactoSinRelacion)
    console.log('🧪 ID del grupo:', contactoSinRelacion.grupo_empresarial_id)

    if (!contactoSinRelacion.grupo_empresarial_id || isNaN(Number(contactoSinRelacion.grupo_empresarial_id))) {
      console.error('⚠ grupo_empresarial_id inválido:', contactoSinRelacion.grupo_empresarial_id)
      return
    }   
  
    const { error, data } = await supabase
      .from('contacto')
      .update(contactoSinRelacion)
      .eq('id', id)
      .select()
  
    if (error) {
      console.error('❌ Error al actualizar contacto:', error)
    } else {
      console.log('✅ Contacto actualizado correctamente:', data)
    }
  }

  if (!contacto) return <p className="p-4">Cargando contacto...</p>

  return <ContactoForm initialData={contacto} onSubmit={actualizarContacto} modo="editar" />
}
