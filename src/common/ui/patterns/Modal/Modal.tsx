import { CloseButton, Dialog, Portal, type DialogRootProps } from '@chakra-ui/react';

export type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  primaryCta?: React.ReactNode;
  secondaryCta?: React.ReactNode;
  triggerElement?: React.ReactNode;
} & DialogRootProps;

export const Modal = (props: ModalProps) => {
  const { children, open, setOpen, title, primaryCta, secondaryCta, triggerElement, ...rest } = props;

  return (
    <Dialog.Root
      lazyMount
      placement="center"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      closeOnInteractOutside
      closeOnEscape
      {...rest}>
      {triggerElement && <Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.Footer>
              {secondaryCta}
              {primaryCta}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
