import { Box, HStack, IconButton, Spacer, Text } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import React from 'react';

type ListProps = {
  items: {
    id: string;
    title: string;
  }[];
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
};

const List = (props: ListProps) => {
  const { items, removeItem, editItem } = props;
  return (
    <Box>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <HStack as="article" key={id}>
            <Text>{title}</Text>
            <Spacer />
            <HStack>
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                onClick={() => editItem(id)}
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                onClick={() => removeItem(id)}
              />
            </HStack>
          </HStack>
        );
      })}
    </Box>
  );
};

export default List;
