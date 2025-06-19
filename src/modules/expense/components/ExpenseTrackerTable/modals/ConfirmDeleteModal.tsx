import { MeowButton, Modal, Typography } from '../../../../../common/ui';

export const ConfirmDeleteModal = ({
  open,
  setOpen,
  handleSubmit,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSubmit: () => void;
}) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Add Expense"
      unmountOnExit
      primaryCta={
        <MeowButton
          label="Confirm"
          enableHoverAnimation={false}
          onClick={() => {
            handleSubmit();
            setOpen(false);
          }}
        />
      }
      secondaryCta={
        <MeowButton
          label="Cancel"
          onClick={() => setOpen(false)}
          enableHoverAnimation={false}
          variant="secondaryOutline"
        />
      }>
      <Typography>Are you sure you want to delete the selected expenses?</Typography>
    </Modal>
  );
};
