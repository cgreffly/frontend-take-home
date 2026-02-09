import { PlusIcon, SearchIcon } from 'lucide-react'

type SearchProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function Search({
  value,
  onChange,
  placeholder = 'Search',
}: SearchProps) {
  return (
    <div className="flex items-stretch gap-2 text-sm">
      <div className="flex items-center gap-2 w-full rounded-md border border-gray-200 px-4">
        <SearchIcon className="w-4 h-4 text-gray-300" />
        <input
          type="text"
          className="w-full border-none outline-none"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </div>
      <button className="flex items-center gap-2 bg-brand-purple text-white px-4 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-brand-purple-dark">
        <PlusIcon className="w-5 h-5" />
        Add User
      </button>
    </div>
  )
}
