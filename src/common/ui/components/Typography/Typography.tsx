'use client';

import { Heading, Highlight, Text, type ConditionalValue, type TextProps } from '@chakra-ui/react';
import { type ElementType } from 'react';

export type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'description1'
  | 'description2';

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

type fontSize = ConditionalValue<
  '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '5xl' | '6xl' | '7xl' | undefined
>;
const typographySizesMap: Record<TypographyVariants, fontSize> = {
  h1: '4xl',
  h2: '3xl',
  h3: '2xl',
  h4: 'xl',
  h5: 'lg',
  h6: 'md',
  subtitle: 'md',
  body1: 'md',
  body2: 'sm',
  body3: 'xs',
  description1: 'sm',
  description2: 'xs',
};

export type TypographyProps = {
  variant?: TypographyVariants;
  highlightText?: string;
  highlightColor?: string;
} & Omit<TextProps, 'variant'>;

const Container = ({
  children,
  highlightText,
  highlightColor,
}: Pick<TypographyProps, 'children' | 'highlightText' | 'highlightColor'>) => {
  if (highlightText) {
    if (!(typeof children === 'string')) {
      return;
    }

    return (
      <Highlight
        query={highlightText}
        styles={{
          color: highlightColor ?? 'brand.primary',
          fontWeight: 'semibold',
        }}>
        {children}
      </Highlight>
    );
  }

  return children;
};

export const Typography = (props: TypographyProps) => {
  const { variant = 'body1', children, highlightText, highlightColor, ...rest } = props;

  const isHeading = headings.includes(variant);

  if (isHeading) {
    return (
      <Heading
        as={variant as ElementType}
        size={typographySizesMap[variant]}
        color="text.primary"
        fontFamily="Quicksand Variable, Tahoma, system-ui, sans-serif"
        fontWeight="semibold"
        {...rest}>
        <Container
          highlightText={highlightText}
          highlightColor={highlightColor}>
          {children}
        </Container>
      </Heading>
    );
  }

  return (
    <Text
      fontSize={typographySizesMap[variant]}
      color={variant.includes('body') ? 'text.primary' : 'text.description'}
      {...rest}>
      <Container
        highlightText={highlightText}
        highlightColor={highlightColor}>
        {children}
      </Container>
    </Text>
  );
};
