import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export function OperatorLoginPage() {
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Temporary login for the frontend demo
    navigate('/operator/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0d0b0a] text-[#f7f2ea] flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition mb-10"
        >
          <ArrowLeft size={16} />
          Back to Tripora
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center">
              <LockKeyhole size={18} className="text-[#d4a72c]" />
            </div>

            <span className="text-xs tracking-[0.25em] uppercase text-[#d4a72c]">
              Tripora
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Operator Portal
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Sign in to manage trips and operations.
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl"
        >
          <div className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-white/50 mb-2">
                Email
              </label>

              <input
                type="email"
                required
                placeholder="operator@tripora.com"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-[#d4a72c]/60 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-white/50 mb-2">
                Password
              </label>

              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-[#d4a72c]/60 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#d4a72c] py-3 text-sm font-semibold text-[#17110e] hover:bg-[#e0b83c] transition"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-white/30">
          Authorized Tripora operators only.
        </p>
      </div>
    </div>
  )
}