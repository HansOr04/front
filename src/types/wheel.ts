// src/types/wheel.ts

export interface WheelSection {
  id: number;
  label: string;
  angle: number;
  color: string;
  discount?: number;
  isWinning: boolean;
}

export interface WheelResult {
  id: string;
  section: string;
  discount?: number;
  isWinning: boolean;
  message: string;
  angle?: number;
  spinDuration?: number;
}

// Backend response type (para mapear correctamente)
export interface WheelBackendResult {
  id: string;
  section: string;
  discountPercentage: number;
  isWinning: boolean;
  resultMessage: string;
  spinDuration: number;
}

export interface WheelProps {
  sections?: WheelSection[];
  onResult?: (result: WheelResult) => void;
  onSpin?: () => void;
  disabled?: boolean;
  size?: number;
  spinDuration?: number;
}

export interface WheelState {
  isSpinning: boolean;
  rotation: number;
  hasSpun: boolean;
  result: WheelResult | null;
  sessionId: string;
}

// Default wheel sections with guaranteed 10% OFF result
export const DEFAULT_WHEEL_SECTIONS: WheelSection[] = [
  { 
    id: 1, 
    label: '5% OFF', 
    angle: 0, 
    color: '#D62336',
    discount: 5,
    isWinning: true
  },
  { 
    id: 2, 
    label: 'Sin premio', 
    angle: 60, 
    color: '#798553',
    isWinning: false
  },
  { 
    id: 3, 
    label: '10% OFF', 
    angle: 120, 
    color: '#D62336',
    discount: 10,
    isWinning: true
  },
  { 
    id: 4, 
    label: 'Sin premio', 
    angle: 180, 
    color: '#6b7280',
    isWinning: false
  },
  { 
    id: 5, 
    label: '20% OFF', 
    angle: 240, 
    color: '#798553',
    discount: 20,
    isWinning: true
  },
  { 
    id: 6, 
    label: '15% OFF', 
    angle: 300, 
    color: '#6b7280',
    discount: 15,
    isWinning: true
  }
];

// Animation settings
export const WHEEL_ANIMATION = {
  SPIN_DURATION: 3000,
  EASING: 'cubic-bezier(0.23, 1, 0.32, 1)',
  MIN_SPINS: 3,
  MAX_SPINS: 5
} as const;

// Helper function to map backend result to frontend result
export const mapBackendToWheelResult = (backendResult: WheelBackendResult): WheelResult => {
  return {
    id: backendResult.id,
    section: backendResult.section,
    discount: backendResult.discountPercentage,
    isWinning: backendResult.isWinning,
    message: backendResult.resultMessage,
    spinDuration: backendResult.spinDuration
  };
};