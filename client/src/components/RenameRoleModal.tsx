import { useState } from 'react'
import Modal, { ModalClose, ModalDescription } from './Modal'

type RenameRoleModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentName: string
  onConfirm: (newName: string) => void
  isPending?: boolean
}

export default function RenameRoleModal({
  open,
  onOpenChange,
  currentName,
  onConfirm,
  isPending = false,
}: RenameRoleModalProps) {
  const [name, setName] = useState(currentName)
  const [prevOpen, setPrevOpen] = useState(open)

  // Current name populates the input when the modal opens
  if (open && !prevOpen) {
    setName(currentName)
  }
  if (open !== prevOpen) {
    setPrevOpen(open)
  }

  const trimmed = name.trim()
  const isUnchanged = trimmed === currentName
  const isEmpty = trimmed.length === 0

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Rename role">
      <ModalDescription className="mt-2 text-sm text-gray-400">
        Enter a new name for the role &ldquo;{currentName}&rdquo;.
      </ModalDescription>

      <label className="mt-4 block text-sm font-medium text-gray-500">
        Role name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-required="true"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
        />
      </label>

      <div className="mt-6 flex justify-end gap-3">
        <ModalClose>
          <button
            disabled={isPending}
            className="rounded-sm px-4 py-1 text-sm font-medium text-gray-400 border border-gray-200 hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
          >
            Cancel
          </button>
        </ModalClose>
        <button
          disabled={isEmpty || isUnchanged || isPending}
          onClick={() => onConfirm(trimmed)}
          className="rounded-sm px-4 py-1 text-sm font-medium text-white bg-brand-purple border border-brand-purple hover:bg-brand-purple/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2"
        >
          {isPending ? 'Saving…' : 'Save'}
        </button>
      </div>
    </Modal>
  )
}
