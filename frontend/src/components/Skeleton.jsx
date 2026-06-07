export function HikamSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-sand-200 p-5 sm:p-6 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-sand-200" />
        <div className="flex-1">
          <div className="h-3 bg-sand-200 rounded w-1/4 mb-3" />
          <div className="h-6 bg-sand-200 rounded w-3/4 mb-2" />
          <div className="h-6 bg-sand-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-sand-100 rounded w-full mb-2" />
          <div className="h-4 bg-sand-100 rounded w-4/5" />
        </div>
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-sand-200 border-t-sand-500 animate-spin" />
        <p className="font-sans text-sand-500 text-sm">Memuat...</p>
      </div>
    </div>
  )
}
