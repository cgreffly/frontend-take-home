import Modal, { ModalClose, ModalDescription } from './Modal'

type DeleteUserModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  userName: string
  onConfirm: () => void
  isPending?: boolean
}

export default function DeleteUserModal({
  open,
  onOpenChange,
  userName,
  onConfirm,
  isPending = false,
}: DeleteUserModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Delete user">
      <ModalDescription className="mt-3 text-sm text-gray-400">
        Are you sure? The user{' '}
        <span className="font-semibold">{userName}</span> will be permanently
        deleted.
      </ModalDescription>

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
          disabled={isPending}
          onClick={() => onConfirm()}
          className="rounded-sm px-4 py-1 text-sm font-medium text-red-600 bg-light-red border border-red-600 hover:bg-red-600 hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
        >
          {isPending ? 'Deleting…' : 'Delete user'}
        </button>
      </div>
    </Modal>
  )
}
