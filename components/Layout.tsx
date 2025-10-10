import { ReactNode } from 'react'
import CartDrawer from './CartDrawer'
import { CartProvider } from './CartContext'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { div } from 'motion/react-client';
import { Analytics } from "@vercel/analytics/next"

interface LayoutProps {
  children: ReactNode
  className?: string
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div>
      <SpeedInsights />
      <Analytics/>

      <CartProvider>
        <CartDrawer />
        <div className="min-h-screen bg-orange-50 relative z-0">
          <main className={`${className} relative z-0`}>
            {children}
          </main>
        </div>
      </CartProvider>
    </div>

  )
}