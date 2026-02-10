interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({
  message = 'Oh no! Something went wrong. Please try again later.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="pt-12 text-center" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-md bg-brand-purple px-4 py-2 text-sm font-medium text-white hover:bg-brand-purple-dark cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2"
        >
          Retry
        </button>
      )}
    </div>
  )
}
