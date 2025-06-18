'use client';

import { Field, HStack, Portal, Select, Stack, createListCollection, type SelectRootProps } from '@chakra-ui/react';

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectFormProps = {
  label: string;
  isRequired?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
  labelWidth?: string;
  options: SelectOption[];
  errorMessage?: string;
  placeholder?: string;
  isModal?: boolean;
} & SelectRootProps;

const Wrapper = ({ isModal, children }: { isModal: boolean; children: React.ReactNode }) =>
  isModal ? <>{children}</> : <Portal>{children}</Portal>;

export const SelectForm = (props: SelectFormProps) => {
  const {
    label,
    isRequired,
    value,
    onChange,
    labelWidth,
    options,
    errorMessage,
    placeholder,
    isModal = false,
    ...rest
  } = props;

  const collections = createListCollection({
    items: options,
  });
  return (
    <Field.Root
      w="100%"
      required
      invalid={!!errorMessage}>
      <HStack
        gap={4}
        alignItems="flex-start">
        <Field.Label
          mt={2}
          fontSize="md"
          w={labelWidth ?? 'fit-content'}>
          {label} {isRequired && <Field.RequiredIndicator />}
        </Field.Label>
        <Stack>
          <Select.Root
            width="100%"
            minW="200px"
            colorPalette="brandPalette"
            value={value}
            onValueChange={(e) => onChange?.(e.value)}
            {...rest}
            collection={collections}>
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder={placeholder} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Wrapper isModal={isModal}>
              <Select.Positioner>
                <Select.Content>
                  {collections.items.map((option) => (
                    <Select.Item
                      item={option}
                      key={option.value}>
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Wrapper>
          </Select.Root>
          {errorMessage && <Field.ErrorText color="red">{errorMessage}</Field.ErrorText>}
        </Stack>
      </HStack>
    </Field.Root>
  );
};
