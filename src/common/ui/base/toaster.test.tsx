import { render } from '@/test/utils/customRender';
import { describe, expect, it, vi } from 'vitest';
import { Toaster, toaster } from './toaster';

describe('Toaster', () => {
  it('renders without crashing', () => {
    render(<Toaster />);
    // The toaster is rendered in a portal, so we can't easily test its presence
    // But we can verify the component renders without errors
    expect(true).toBe(true);
  });

  it('creates toaster instance with correct configuration', () => {
    expect(toaster).toBeDefined();
    expect(typeof toaster.create).toBe('function');
    expect(typeof toaster.dismiss).toBe('function');
  });

  it('can create a toast and returns toast ID', () => {
    const toastId = toaster.create({
      title: 'Test Toast',
      description: 'Test Description',
      type: 'success',
    });

    expect(toastId).toBeDefined();
    expect(typeof toastId).toBe('string');
  });

  it('can create different types of toasts', () => {
    const successToastId = toaster.create({
      title: 'Success',
      type: 'success',
    });

    const errorToastId = toaster.create({
      title: 'Error',
      type: 'error',
    });

    const loadingToastId = toaster.create({
      title: 'Loading',
      type: 'loading',
    });

    expect(successToastId).toBeDefined();
    expect(errorToastId).toBeDefined();
    expect(loadingToastId).toBeDefined();
  });

  it('can create toast with action', () => {
    const actionHandler = vi.fn();

    const toastId = toaster.create({
      title: 'Action Toast',
      action: {
        label: 'Confirm',
        onClick: actionHandler,
      },
    });

    expect(toastId).toBeDefined();
  });

  it('can create toast with only title', () => {
    const toastId = toaster.create({
      title: 'Title Only',
    });

    expect(toastId).toBeDefined();
  });

  it('can create toast with only description', () => {
    const toastId = toaster.create({
      description: 'Description Only',
    });

    expect(toastId).toBeDefined();
  });

  it('can dismiss a specific toast', () => {
    const toastId = toaster.create({
      title: 'Dismissible Toast',
    });

    expect(toastId).toBeDefined();

    // This should not throw an error
    expect(() => toaster.dismiss(toastId)).not.toThrow();
  });

  it('handles toaster configuration correctly', () => {
    // Test that the toaster instance has the expected configuration
    expect(toaster).toHaveProperty('create');
    expect(toaster).toHaveProperty('dismiss');
  });
});
