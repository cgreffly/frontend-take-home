import * as Dialog from '@radix-ui/react-dialog'

type ModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: React.ReactNode
}

export default function Modal({
  open,
  onOpenChange,
  title,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-xl bg-white p-6 shadow-lg focus:outline-none">
          <Dialog.Title className="text-xl font-bold text-gray-400">
            {title}
          </Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function ModalClose({ children }: { children: React.ReactNode }) {
  return <Dialog.Close asChild>{children}</Dialog.Close>
}

export const ModalDescription = Dialog.Description
