import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Alert from './components/Alert';
import List from './components/List';

type ListType = {
  id: string;
  title: string;
}[];

type AlertType = {
  show: boolean;
  msg: string;
  type: 'success' | 'warning' | 'info' | undefined | 'error' | 'loading';
};

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list') as string);
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState<string>('');
  const [list, setList] = useState<ListType>(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState<null | string>(null);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    msg: '',
    type: undefined,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'warning', 'Please enter value');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (
    show = false,
    type:
      | 'success'
      | 'warning'
      | 'info'
      | undefined
      | 'error'
      | 'loading' = undefined,

    msg = ''
  ) => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'warning', 'empty list');
    setList([]);
  };

  const removeItem = (id: string) => {
    showAlert(true, 'warning', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id: string) => {
    const specificItem = list.find((item) => item.id === id) ?? {
      id: '',
      title: '',
    };
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <Container maxW="container.md" p="14">
      <Box as="section" boxShadow="base">
        <form onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <Heading as="h3" textAlign="center">
            Grocery Bud
          </Heading>
          <HStack>
            <Input
              type="text"
              placeholder="e.g. eggs"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <Button type="submit">{isEditing ? 'Edit' : 'Submit'}</Button>
          </HStack>
        </form>
        {list.length > 0 && (
          <VStack>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <Button colorScheme="red" variant="link" onClick={clearList}>
              Clear items
            </Button>
          </VStack>
        )}
      </Box>
    </Container>
  );
}

export default App;
