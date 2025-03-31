'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import GrupoForm, { Grupo } from '../../GrupoForm'
import { supabase } from '@/lib/supabase'

export default function EditarGrupoPage() {
  const params = useParams()
  const id = Number(params?.id)
  const [grupo, setGrupo] = useState<Grupo | null>(null)

  useEffect(() => {
    const fetchGrupo = async () => {
      const { data, error } = await supabase
        .from('grupo_empresarial')
        .select('id, nombre')
        .eq('id', id)
        .single()

      if (error) console.error('Error cargando grupo:', error)
      else setGrupo(data)
    }
    fetchGrupo()
  }, [id])

  return grupo ? <GrupoForm modo="editar" grupoInicial={grupo} /> : <p>Cargando...</p>
}
