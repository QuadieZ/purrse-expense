import { Image, Stack } from '@chakra-ui/react';
import { ExpenseTrackerTablePage } from '../modules';

function App() {
  return (
    <Stack
      w="100vw"
      maxH="100vh"
      h="100vh"
      gap={0}
      px={8}
      py={4}>
      <Image
        src="/purrse-logo.png"
        alt="logo"
        w="fit-content"
        objectFit="contain"
        h="64px"
      />
      <Stack
        w="100%"
        overflow="hidden"
        flex={1}
        pb={4}>
        <ExpenseTrackerTablePage />
      </Stack>
    </Stack>
  );
}

export default App;
