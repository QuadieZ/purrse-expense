import { meowKitSystem } from '@/common/ui/styles/theme';
import { ChakraProvider } from '@chakra-ui/react';

export type MeowKitProviderProps = {
  children: React.ReactNode;
};

export const MeowKitProvider = ({ children }: MeowKitProviderProps) => {
  return <ChakraProvider value={meowKitSystem}>{children}</ChakraProvider>;
};
