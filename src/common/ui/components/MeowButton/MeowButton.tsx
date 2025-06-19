import { Button as BaseButton, chakra, type ButtonProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export type ButtonVariants = 'primary' | 'secondaryOutline' | 'secondarySolid' | 'ghost' | 'plain' | 'destructive';

export type MeowButtonProps = {
  variant?: ButtonVariants;
  label?: string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  href?: string;
  fullWidth?: boolean;
  enableHoverAnimation?: boolean;
} & Omit<ButtonProps, 'children' | 'disabled' | 'variant'>;

const commonProps: ButtonProps = {
  borderRadius: 'full',
};

const variantPropsMap: Record<ButtonVariants, ButtonProps> = {
  primary: {
    colorPalette: 'brandPalette',
  },
  secondaryOutline: {
    bg: 'transparent',
    color: 'brand.primary',
    borderColor: 'brand.primary',
    _hover: {
      bg: 'background.primary',
    },
  },
  secondarySolid: {
    bg: 'brand.secondary',
    color: 'text.contrast',
    _hover: {
      bg: 'brand.secondaryHover',
    },
  },
  ghost: {
    colorPalette: 'brandPalette',
    variant: 'ghost',
    _hover: {
      bg: 'brand.light',
    },
  },
  plain: {
    variant: 'plain',
  },
  destructive: {
    colorPalette: 'red',
  },
};

const ButtonLinkContainer = chakra(
  forwardRef(
    (
      {
        children,
        href,
        isDisabled,
        ...rest
      }: {
        children: React.ReactNode;
        href?: string;
        isDisabled?: boolean;
      } & React.ComponentPropsWithoutRef<'a'>,
      ref: React.Ref<HTMLAnchorElement>,
    ) => {
      const isExternal = href?.startsWith('http');
      const disabledProps = isDisabled
        ? {
            onClick: (e: React.MouseEvent) => e.preventDefault(),
            'data-disabled': '',
          }
        : {};

      return href ? (
        <a
          href={href}
          target={isExternal ? '_blank' : '_self'}
          rel="noreferrer"
          ref={ref}
          {...rest}
          {...disabledProps}>
          {children}
        </a>
      ) : (
        children
      );
    },
  ),
);

export const MeowButton = (props: MeowButtonProps) => {
  const { label, icon, isDisabled, href, fullWidth, variant = 'primary', enableHoverAnimation = true, ...rest } = props;

  return (
    <BaseButton
      {...commonProps}
      {...variantPropsMap[variant]}
      disabled={isDisabled}
      {...rest}
      asChild={!!href}
      width={fullWidth ? '100%' : 'fit-content'}
      focusRingColor="brandPalette.focusRing"
      fontWeight="semibold"
      transition="all 0.2s ease-in-out"
      size={['xs', 'sm', 'md']}
      _hover={
        enableHoverAnimation
          ? {
              transform: 'translateY(-2px)',
            }
          : {}
      }>
      <ButtonLinkContainer
        href={href}
        isDisabled={isDisabled}>
        {icon}
        {label}
      </ButtonLinkContainer>
    </BaseButton>
  );
};
