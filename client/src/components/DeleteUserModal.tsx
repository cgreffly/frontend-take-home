import * as Dialog from '@radix-ui/react-dialog'

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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-xl bg-white p-6 shadow-lg focus:outline-none">
          <Dialog.Title className="text-xl font-bold text-gray-400">
            Delete user
          </Dialog.Title>

          <Dialog.Description className="mt-3 text-sm text-gray-400">
            Are you sure? The user{' '}
            <span className="font-semibold">{userName}</span> will be
            permanently deleted.
          </Dialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="rounded-sm px-4 py-1 text-sm font-medium text-gray-400 border border-gray-200 hover:bg-gray-200 cursor-pointer">
                Cancel
              </button>
            </Dialog.Close>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
