import { PlusIcon, SearchIcon } from 'lucide-react'

type SearchProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  addButtonLabel?: string
}

export default function Search({
  value,
  onChange,
  placeholder = 'Search',
  addButtonLabel = 'User',
}: SearchProps) {
  return (
    <div className="flex items-stretch gap-2 text-sm">
      <div
        className="flex items-center gap-2 w-full rounded-md border border-gray-200 px-4 focus-within:border-brand-purple focus-within:ring-1 focus-within:ring-brand-purple"
        role="search"
      >
        <SearchIcon className="w-4 h-4 text-gray-300" aria-hidden="true" />
        <input
          type="search"
          className="w-full border-none outline-none"
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </div>
      <button
        className="flex items-center gap-2 bg-brand-purple text-white px-4 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-brand-purple-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2"
        aria-label={`Add ${addButtonLabel}`}
      >
        <PlusIcon className="w-5 h-5" aria-hidden="true" />
        Add {addButtonLabel}
      </button>
    </div>
  )
}
