import {
  BarChart3,
  Bell,
  CalendarDays,
  ChevronRight,
  CircleCheck,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Settings,
  Users,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Section =
  | 'overview'
  | 'trips'
  | 'bookings'
  | 'operations'
  | 'alerts'

type Trip = {
  id: string
  name: string
  destination: string
  travelers: number
  date: string
  status: string
  statusType: 'success' | 'warning' | 'danger'
}

type Booking = {
  id: string
  trip: string
  service: string
  status: string
}

type Alert = {
  id: string
  title: string
  description: string
  type: 'warning' | 'danger' | 'info'
}

export function OperatorDashboardPage() {
  const navigate = useNavigate()

  const [activeSection, setActiveSection] =
    useState<Section>('overview')

  const [mobileOpen, setMobileOpen] = useState(false)

  /*
   * Live data states.
   * These start empty and should later be populated
   * from your Tripora backend/database.
   */
  const [trips] = useState<Trip[]>([])
  const [bookings] = useState<Booking[]>([])
  const [alerts] = useState<Alert[]>([])

  const navItems = [
    {
      id: 'overview' as Section,
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'trips' as Section,
      label: 'Trips',
      icon: Map,
    },
    {
      id: 'bookings' as Section,
      label: 'Bookings',
      icon: CalendarDays,
    },
    {
      id: 'operations' as Section,
      label: 'Operations',
      icon: BarChart3,
    },
    {
      id: 'alerts' as Section,
      label: 'Alerts',
      icon: Bell,
    },
  ]

  const handleLogout = () => {
    navigate('/operator/login')
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'trips':
        return <TripsSection trips={trips} />

      case 'bookings':
        return <BookingsSection bookings={bookings} />

      case 'operations':
        return <OperationsSection trips={trips} />

      case 'alerts':
        return <AlertsSection alerts={alerts} />

      default:
        return (
          <OverviewSection
            trips={trips}
            bookings={bookings}
            alerts={alerts}
            setActiveSection={setActiveSection}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0b0a] text-[#f7f2ea] flex">

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 border-r border-white/10 bg-[#11100e] flex flex-col transition-transform duration-300 ${
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold tracking-tight">
                Tripora
              </p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-[#d4a72c] mt-1">
                Operator Portal
              </p>
            </div>

            <button
              className="lg:hidden text-white/50 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setMobileOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                  active
                    ? 'bg-[#d4a72c]/10 text-[#d4a72c]'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon size={17} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/[0.04]">
            <Settings size={17} />
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-white/[0.04]"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">

        {/* Top bar */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-5 sm:px-8">
          <button
            className="lg:hidden text-white/60"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell size={19} className="text-white/50" />

              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#d4a72c]" />
              )}
            </div>

            <div className="h-8 w-8 rounded-full bg-[#d4a72c]/15 border border-[#d4a72c]/30 flex items-center justify-center text-xs text-[#d4a72c]">
              OP
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-5 sm:p-8 max-w-[1500px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

/* ─────────────────────────────
   OVERVIEW
───────────────────────────── */

function OverviewSection({
  trips,
  bookings,
  alerts,
  setActiveSection,
}: {
  trips: Trip[]
  bookings: Booking[]
  alerts: Alert[]
  setActiveSection: (section: Section) => void
}) {
  const travelerCount = trips.reduce(
    (total, trip) => total + trip.travelers,
    0
  )

  return (
    <div>

      {/* Heading */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#d4a72c]">
          Operator Dashboard
        </p>

        <h1 className="text-3xl sm:text-4xl font-semibold mt-2">
          Good morning 👋
        </h1>

        <p className="text-sm text-white/40 mt-2">
          Monitor your Tripora journeys and operations.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <StatCard
          label="Active Trips"
          value={String(trips.length)}
          icon={<Map size={18} />}
        />

        <StatCard
          label="Travelers"
          value={String(travelerCount)}
          icon={<Users size={18} />}
        />

        <StatCard
          label="Bookings"
          value={String(bookings.length)}
          icon={<CalendarDays size={18} />}
        />

        <StatCard
          label="Active Alerts"
          value={String(alerts.length)}
          icon={<Bell size={18} />}
          alert={alerts.length > 0}
        />

      </div>

      <div className="grid xl:grid-cols-[1.5fr_1fr] gap-6">

        {/* Trips */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02]">

          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="font-medium">
                Active Trips
              </h2>

              <p className="text-xs text-white/35 mt-1">
                Current trip operations
              </p>
            </div>

            <button
              onClick={() => setActiveSection('trips')}
              className="text-xs text-[#d4a72c] flex items-center gap-1"
            >
              View all
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="divide-y divide-white/10">

            {trips.length === 0 ? (
              <EmptyState
                icon={<Map size={20} />}
                title="No active trips"
                description="Trips created through Tripora will appear here."
              />
            ) : (
              trips.map((trip) => (
                <TripRow
                  key={trip.id}
                  trip={trip}
                />
              ))
            )}

          </div>
        </section>

        {/* Alerts */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02]">

          <div className="p-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bell
                size={16}
                className="text-[#d4a72c]"
              />

              <h2 className="font-medium">
                Operations Alerts
              </h2>
            </div>
          </div>

          <div className="p-5">

            {alerts.length === 0 ? (
              <div className="py-8 text-center">
                <CircleCheck
                  size={28}
                  className="mx-auto text-emerald-400/70"
                />

                <p className="text-sm mt-4">
                  No active alerts
                </p>

                <p className="text-xs text-white/35 mt-2">
                  New operational alerts will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.slice(0, 3).map((alert) => (
                  <AlertPreview
                    key={alert.id}
                    alert={alert}
                  />
                ))}

                <button
                  onClick={() => setActiveSection('alerts')}
                  className="mt-3 w-full rounded-xl bg-[#d4a72c] text-[#17110e] py-2.5 text-xs font-semibold hover:bg-[#e0b83c] transition"
                >
                  View Alerts
                </button>
              </div>
            )}

          </div>
        </section>

      </div>
    </div>
  )
}

/* ─────────────────────────────
   TRIPS
───────────────────────────── */

function TripsSection({
  trips,
}: {
  trips: Trip[]
}) {
  return (
    <div>

      <PageHeading
        eyebrow="Operations"
        title="Trips"
        description="Monitor and manage active Tripora journeys."
      />

      <div className="rounded-2xl border border-white/10 overflow-hidden">

        <div className="overflow-x-auto">

          {trips.length === 0 ? (
            <EmptyState
              icon={<Map size={20} />}
              title="No trips available"
              description="Live trips will appear here when they are created."
            />
          ) : (
            <table className="w-full text-sm">

              <thead className="bg-white/[0.03] text-xs text-white/40">
                <tr>
                  <th className="text-left p-4">
                    Trip
                  </th>

                  <th className="text-left p-4">
                    Destination
                  </th>

                  <th className="text-left p-4">
                    Travelers
                  </th>

                  <th className="text-left p-4">
                    Dates
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">

                {trips.map((trip) => (
                  <tr
                    key={trip.id}
                    className="hover:bg-white/[0.02]"
                  >
                    <td className="p-4 font-medium">
                      {trip.name}
                    </td>

                    <td className="p-4 text-white/50">
                      {trip.destination}
                    </td>

                    <td className="p-4 text-white/50">
                      {trip.travelers}
                    </td>

                    <td className="p-4 text-white/50">
                      {trip.date}
                    </td>

                    <td className="p-4">
                      <StatusBadge
                        status={trip.status}
                        type={trip.statusType}
                      />
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────
   BOOKINGS
───────────────────────────── */

function BookingsSection({
  bookings,
}: {
  bookings: Booking[]
}) {
  return (
    <div>

      <PageHeading
        eyebrow="Operations"
        title="Bookings"
        description="Track accommodation, transport and activity bookings."
      />

      <div className="rounded-2xl border border-white/10 overflow-hidden">

        <div className="overflow-x-auto">

          {bookings.length === 0 ? (
            <EmptyState
              icon={<CalendarDays size={20} />}
              title="No bookings available"
              description="Live bookings will appear here when travelers make reservations."
            />
          ) : (
            <table className="w-full text-sm">

              <thead className="bg-white/[0.03] text-xs text-white/40">
                <tr>
                  <th className="text-left p-4">
                    Booking
                  </th>

                  <th className="text-left p-4">
                    Trip
                  </th>

                  <th className="text-left p-4">
                    Service
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">

                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-white/[0.02]"
                  >
                    <td className="p-4 font-medium">
                      {booking.id}
                    </td>

                    <td className="p-4 text-white/50">
                      {booking.trip}
                    </td>

                    <td className="p-4 text-white/50">
                      {booking.service}
                    </td>

                    <td className="p-4">
                      <StatusBadge
                        status={booking.status}
                        type={
                          booking.status.toLowerCase() ===
                          'confirmed'
                            ? 'success'
                            : 'warning'
                        }
                      />
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────
   OPERATIONS
───────────────────────────── */

function OperationsSection({
  trips,
}: {
  trips: Trip[]
}) {
  return (
    <div>

      <PageHeading
        eyebrow="Live"
        title="Operations"
        description="Real-time overview of ongoing trips."
      />

      {trips.length === 0 ? (
        <EmptyState
          icon={<BarChart3 size={20} />}
          title="No active operations"
          description="Live trip operations will appear here."
        />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

          {trips.map((trip) => (
            <div
              key={trip.id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >

              <StatusBadge
                status={trip.status}
                type={trip.statusType}
              />

              <h3 className="font-medium mt-4">
                {trip.name}
              </h3>

              <p className="text-xs text-white/40 mt-1">
                {trip.destination} · {trip.travelers} travelers
              </p>

              <div className="mt-5 space-y-3 text-xs">

                <OperationItem
                  label="Accommodation"
                  done
                />

                <OperationItem
                  label="Transport"
                  done
                />

                <OperationItem
                  label="Activities"
                  done={trip.statusType === 'success'}
                />

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  )
}

/* ─────────────────────────────
   ALERTS
───────────────────────────── */

function AlertsSection({
  alerts,
}: {
  alerts: Alert[]
}) {
  return (
    <div>

      <PageHeading
        eyebrow="Smart Operations"
        title="Alerts & Adaptation"
        description="Review operational issues and Tripora recommendations."
      />

      {alerts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 p-6">

          <div className="flex items-center gap-3">

            <CircleCheck
              size={18}
              className="text-emerald-400"
            />

            <div>
              <p className="text-sm">
                No active alerts
              </p>

              <p className="text-xs text-white/40 mt-1">
                New operational alerts will appear here automatically.
              </p>
            </div>

          </div>
        </div>
      ) : (
        <div className="space-y-4">

          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >

              <div className="flex gap-4">

                <div className="h-9 w-9 rounded-xl bg-[#d4a72c]/10 flex items-center justify-center shrink-0">
                  <Bell
                    size={18}
                    className="text-[#d4a72c]"
                  />
                </div>

                <div className="flex-1">

                  <p className="text-sm font-medium">
                    {alert.title}
                  </p>

                  <p className="text-xs text-white/40 mt-1">
                    {alert.description}
                  </p>

                  <div className="flex gap-2 mt-4">

                    <button className="px-4 py-2 rounded-lg bg-[#d4a72c] text-[#17110e] text-xs font-semibold">
                      Review
                    </button>

                    <button className="px-4 py-2 rounded-lg border border-white/10 text-xs text-white/60">
                      Dismiss
                    </button>

                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  )
}

/* ─────────────────────────────
   COMPONENTS
───────────────────────────── */

function StatCard({
  label,
  value,
  icon,
  alert,
}: {
  label: string
  value: string
  icon: React.ReactNode
  alert?: boolean
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">

      <div className="flex items-center justify-between">

        <div className="h-9 w-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-[#d4a72c]">
          {icon}
        </div>

        {alert && (
          <span className="h-2 w-2 rounded-full bg-[#d4a72c]" />
        )}

      </div>

      <p className="text-2xl font-semibold mt-5">
        {value}
      </p>

      <p className="text-xs text-white/40 mt-1">
        {label}
      </p>

    </div>
  )
}

function TripRow({
  trip,
}: {
  trip: Trip
}) {
  return (
    <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between hover:bg-white/[0.02] transition">

      <div>
        <p className="text-sm font-medium">
          {trip.name}
        </p>

        <p className="text-xs text-white/40 mt-1">
          {trip.destination} · {trip.travelers} travelers
        </p>
      </div>

      <div className="flex items-center gap-4">

        <span className="text-xs text-white/35">
          {trip.date}
        </span>

        <StatusBadge
          status={trip.status}
          type={trip.statusType}
        />

      </div>
    </div>
  )
}

function StatusBadge({
  status,
  type,
}: {
  status: string
  type: 'success' | 'warning' | 'danger'
}) {
  const classes = {
    success:
      'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',

    warning:
      'bg-[#d4a72c]/10 text-[#d4a72c] border-[#d4a72c]/20',

    danger:
      'bg-red-400/10 text-red-400 border-red-400/20',
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] ${classes[type]}`}
    >
      {status}
    </span>
  )
}

function OperationItem({
  label,
  done,
}: {
  label: string
  done: boolean
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-white/45">
        {label}
      </span>

      {done ? (
        <CircleCheck
          size={15}
          className="text-emerald-400"
        />
      ) : (
        <span className="h-2 w-2 rounded-full bg-[#d4a72c]" />
      )}

    </div>
  )
}

function AlertPreview({
  alert,
}: {
  alert: Alert
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">

      <p className="text-sm font-medium">
        {alert.title}
      </p>

      <p className="text-xs text-white/40 mt-1 line-clamp-2">
        {alert.description}
      </p>

    </div>
  )
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="py-12 px-6 text-center">

      <div className="h-10 w-10 mx-auto rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/30">
        {icon}
      </div>

      <p className="text-sm mt-4">
        {title}
      </p>

      <p className="text-xs text-white/35 mt-2">
        {description}
      </p>

    </div>
  )
}

function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mb-8">

      <p className="text-xs uppercase tracking-[0.2em] text-[#d4a72c]">
        {eyebrow}
      </p>

      <h1 className="text-3xl sm:text-4xl font-semibold mt-2">
        {title}
      </h1>

      <p className="text-sm text-white/40 mt-2">
        {description}
      </p>

    </div>
  )
}