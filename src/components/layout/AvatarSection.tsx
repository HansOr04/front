'use client'

import React from 'react'

export const AvatarSection = () => {
  return (
    <div className="avatar-container">
      <div className="avatar">
        {/* Placeholder para el video avatar */}
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#070E22',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold',
          borderRadius: '50%',
          border: '3px solid #798553'
        }}>
          🤖
        </div>
        {/* Cuando tengas el video, descomenta esto:
        <video 
          className="video-avatar"
          src="/assets/videos/VideoIntelcobroAvatar.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%'
          }}
        />
        */}
      </div>
    </div>
  )
}