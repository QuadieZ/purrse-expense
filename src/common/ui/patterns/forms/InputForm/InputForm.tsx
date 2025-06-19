import { Field, HStack, Input, Stack, type InputProps } from '@chakra-ui/react';

export type InputFormProps = {
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  labelWidth?: string;
  errorMessage?: string;
} & Omit<InputProps, 'onChange'>;

export const InputForm = (props: InputFormProps) => {
  const { label, isRequired, placeholder, value, onChange, labelWidth, errorMessage, ...rest } = props;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <Field.Root
      required
      invalid={!!errorMessage}
      w="100%">
      <HStack
        gap={4}
        w="100%"
        alignItems="flex-start">
        {label && (
          <Field.Label
            mt={2}
            fontSize={['sm', 'md']}
            w={labelWidth ?? 'fit-content'}>
            {label} {isRequired && <Field.RequiredIndicator />}
          </Field.Label>
        )}
        <Stack w="100%">
          <Input
            background="white"
            placeholder={placeholder}
            variant="outline"
            required={isRequired}
            value={value}
            onChange={handleChange}
            colorPalette="brandPalette"
            w="100%"
            {...rest}
          />
          {errorMessage && <Field.ErrorText color="red">{errorMessage}</Field.ErrorText>}
        </Stack>
      </HStack>
    </Field.Root>
  );
};
