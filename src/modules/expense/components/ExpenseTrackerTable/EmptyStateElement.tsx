import { Typography } from '@/common/ui';
import { Flex } from '@chakra-ui/react';
import { Cat } from 'lucide-react';

export const EmptyStateElement = () => (
  <Flex
    align="center"
    gap={2}>
    <Cat />
    <Typography
      highlightColor="text.accent"
      highlightText="expense"
      fontWeight="medium">
      Add an expense to get started!
    </Typography>
  </Flex>
);
