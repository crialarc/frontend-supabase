'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="max-w-2xl mx-auto mt-20 p-6 space-y-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800">🏠 Sistema Interno</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/grupos" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200">
          📋 Ver Grupos Empresariales
        </Link>

        <Link href="/grupos/nuevo" className="block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200">
          ➕ Crear Grupo Empresarial
        </Link>

        <Link href="/contactos" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200">
          📇 Ver Contactos
        </Link>

        <Link href="/contacto" className="block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200">
          ➕ Crear Contacto
        </Link>
      </div>
    </main>
  )
}
