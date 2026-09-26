import { Outlet } from 'react-router-dom'
import { Footer } from '../components/navigation/Footer'
import { Navbar } from '../components/navigation/Navbar'

export function MainLayout() {
  return (
    <div className="min-h-svh bg-ink text-cream-soft">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-amber focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
