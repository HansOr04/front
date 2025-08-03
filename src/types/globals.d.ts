import { ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export interface HeaderProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export interface CircularNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export interface ContentSectionsProps {
  activeSection: string
}