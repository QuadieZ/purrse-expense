import { Field, HStack, NumberInput, Stack, type NumberInputRootProps } from '@chakra-ui/react';

export type NumberInputFormProps = {
  label: string;
  isRequired?: boolean;
  value?: number;
  onChange?: (value: number) => void;
  labelWidth?: string;
  errorMessage?: string;
} & Omit<NumberInputRootProps, 'value' | 'onValueChange' | 'onChange'>;

export const NumberInputForm = (props: NumberInputFormProps) => {
  const { label, isRequired, value, onChange, labelWidth, errorMessage, defaultValue = 0, ...rest } = props;

  return (
    <Field.Root
      w="100%"
      required
      invalid={!!errorMessage}>
      <HStack
        gap={4}
        w="100%"
        alignItems="flex-start">
        <Field.Label
          mt={2}
          fontSize="md"
          w={labelWidth ?? 'fit-content'}>
          {label} {isRequired && <Field.RequiredIndicator />}
        </Field.Label>
        <Stack w="100%">
          <NumberInput.Root
            bg="white"
            min={0}
            colorPalette="brandPalette"
            defaultValue={defaultValue.toString()}
            step={10}
            w="100%"
            required={isRequired}
            value={value?.toString()}
            onValueChange={(details) => onChange?.(parseInt(details.value) ?? 0)}
            {...rest}>
            <NumberInput.Control />
            <NumberInput.Input />
          </NumberInput.Root>
          {errorMessage && <Field.ErrorText color="red">{errorMessage}</Field.ErrorText>}
        </Stack>
      </HStack>
    </Field.Root>
  );
};
