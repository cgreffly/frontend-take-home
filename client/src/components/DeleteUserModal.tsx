import Modal, { ModalClose } from './Modal'

type DeleteUserModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  userName: string
  onConfirm: () => void
}

export default function DeleteUserModal({
  open,
  onOpenChange,
  userName,
  onConfirm,
}: DeleteUserModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Delete user">
      <p className="mt-3 text-sm text-gray-400">
        Are you sure? The user <span className="font-semibold">{userName}</span>{' '}
        will be permanently deleted.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <ModalClose>
          <button className="rounded-sm px-4 py-1 text-sm font-medium text-gray-400 border border-gray-200 hover:bg-gray-200 cursor-pointer">
            Cancel
          </button>
        </ModalClose>
        <button
          onClick={() => {
            onConfirm()
            onOpenChange(false)
          }}
          className="rounded-sm px-4 py-1 text-sm font-medium text-red-600 bg-light-red border border-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
        >
          Delete user
        </button>
      </div>
    </Modal>
  )
}
