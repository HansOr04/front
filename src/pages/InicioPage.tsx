// src/pages/InicioPage.tsx

'use client'

import React from 'react'

export const InicioPage = () => {
  return (
    <div className="text-center text-white">
      <h1 className="text-6xl font-bold" style={{ margin: '3rem', paddingTop: '4rem' }}>
        Conecta con el futuro de la cobranza
      </h1>
      <div className="flex justify-center" style={{ gap: '1rem', flexWrap: 'wrap' }}>
        <button className="btn btn-white">
          Contáctanos
        </button>
      </div>
    </div>
  )
}