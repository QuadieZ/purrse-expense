import { render } from '@/test/utils/customRender';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Modal, type ModalProps } from './Modal';

const defaultProps: ModalProps = {
  open: true,
  setOpen: vi.fn(),
  title: 'Test Modal',
  children: <div>Modal content</div>,
};

describe('Modal', () => {
  it('renders title and children when open', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal
        {...defaultProps}
        open={false}
      />,
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('renders primary CTA when provided', () => {
    render(
      <Modal
        {...defaultProps}
        primaryCta="Save"
      />,
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders secondary CTA when provided', () => {
    render(
      <Modal
        {...defaultProps}
        secondaryCta="Cancel"
      />,
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});
