'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

// ============================================
// Toaster Configuration
// ============================================

export function Toaster() {
  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1C1917',
          color: '#FAFAF9',
          fontSize: '14px',
          borderRadius: '8px',
          padding: '12px 16px',
        },
        success: {
          iconTheme: {
            primary: '#0D9488',
            secondary: '#FAFAF9',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FAFAF9',
          },
        },
      }}
    />
  );
}
