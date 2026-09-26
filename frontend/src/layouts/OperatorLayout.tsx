import {
  AlertTriangle,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
} from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  {
    label: 'Overview',
    icon: LayoutDashboard,
    path: '/operator/dashboard',
  },
  {
    label: 'Trips',
    icon: CalendarDays,
    path: '/operator/dashboard?section=trips',
  },
  {
    label: 'Bookings',
    icon: ClipboardList,
    path: '/operator/dashboard?section=bookings',
  },
  {
    label: 'Operations',
    icon: Settings,
    path: '/operator/dashboard?section=operations',
  },
  {
    label: 'Alerts',
    icon: AlertTriangle,
    path: '/operator/dashboard?section=alerts',
  },
]

export function OperatorLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/operator/login')
  }

  return (
    <div className="min-h-screen bg-[#0d0b0a] text-[#f7f2ea]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-[#0d0b0a]/95 backdrop-blur-xl flex items-center justify-between px-5">
        <div>
          <p className="text-lg font-semibold tracking-tight">Tripora</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4a72c]">
            Operator Portal
          </p>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg border border-white/10 text-white/70 hover:text-white transition"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64
          border-r border-white/10
          bg-[#100d0c]
          flex flex-col
          transition-transform duration-300
          lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="h-20 px-6 flex items-center border-b border-white/10">
          <div>
            <p className="text-xl font-semibold tracking-tight">
              Tripora
            </p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-[#d4a72c]">
              Operator Portal
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <p className="px-3 mb-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
            Management
          </p>

          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  rounded-xl px-3 py-3
                  text-sm transition
                  ${
                    isActive
                      ? 'bg-[#d4a72c]/10 text-[#d4a72c]'
                      : 'text-white/50 hover:bg-white/[0.04] hover:text-white'
                  }
                  `
                }
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10">
          <div className="mb-3 rounded-xl bg-white/[0.03] border border-white/10 p-3">
            <p className="text-xs text-white/40">Signed in as</p>
            <p className="mt-1 text-sm text-white/80 truncate">
              Operator
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/50 hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <Outlet />
      </main>
    </div>
  )
}