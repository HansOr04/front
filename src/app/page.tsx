'use client'

import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { CircularNavigation } from '../components/layout/CircularNavigation'
import { AvatarSection } from '../components/layout/AvatarSection'
import { ContentSections } from '../components/sections/ContentSections'
import { ChatWidget } from '../components/chat/ChatWidget'

export default function Home() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <Header 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isChatOpen={isChatOpen}
        onChatToggle={setIsChatOpen}
      />
      
      <main className="main-content">
        {activeSection === 'inicio' ? (
          // Layout para Inicio (con navegación circular)
          <>
            {/* Left Side - Navigation */}
            <div className="left-side">
              <CircularNavigation 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
            </div>
            
            {/* Avatar positioned between sections */}
            <AvatarSection />

            {/* Right Side - Content */}
            <div className="right-side">
              <ContentSections activeSection={activeSection} />
            </div>
          </>
        ) : (
          // Layout para otras secciones (centrado con navegación y avatar visibles)
          <>
            {/* Left Side - Navigation (visible pero sin interactuar con el layout) */}
            <div className="left-side">
              <CircularNavigation 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
            </div>
            
            {/* Avatar positioned between sections */}
            <AvatarSection />

            {/* Centered Content que ocupa todo el espacio disponible */}
            <div className="content-overlay">
              <ContentSections activeSection={activeSection} />
            </div>
          </>
        )}
      </main>

      {/* Chat Widget */}
      <ChatWidget 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  )
}