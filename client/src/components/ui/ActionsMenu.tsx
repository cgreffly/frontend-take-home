import { Ellipsis } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type ActionItem = {
  label: string
  onSelect: () => void
}

type ActionsMenuProps = {
  items: ActionItem[]
  label?: string
}

export default function ActionsMenu({
  items,
  label = 'Actions',
}: ActionsMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex items-center justify-center rounded-full p-1 text-gray-400 hover:bg-gray-150 data-[state=open]:bg-gray-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple cursor-pointer"
          aria-label={label}
        >
          <Ellipsis className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[120px] rounded-md bg-white p-1 shadow-2xl"
          sideOffset={5}
          align="end"
          aria-label={label}
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.label}
              className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-400 outline-none cursor-pointer hover:bg-gray-150 focus:bg-gray-150 focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:rounded-sm"
              onSelect={item.onSelect}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export type { ActionItem, ActionsMenuProps }
