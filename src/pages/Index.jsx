import { useState } from 'react';
import { Box, Button, Flex, Heading, Input, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={8}>
      <Flex as="nav" justify="space-between" align="center" mb={8}>
        <Heading size="lg">Todo App</Heading>
      </Flex>
      <Flex mb={4}>
        <Input
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button leftIcon={<FaPlus />} ml={2} onClick={addTask} colorScheme="blue">
          Add
        </Button>
      </Flex>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
            <Flex align="center">
              <ListIcon as={task.isCompleted ? FaCheckCircle : FaPlus} color={task.isCompleted ? 'green.500' : 'gray.500'} onClick={() => toggleTaskCompletion(task.id)} cursor="pointer" />
              <Box as="span" ml={2} textDecoration={task.isCompleted ? 'line-through' : 'none'}>
                {task.text}
              </Box>
            </Flex>
            <IconButton
              icon={<FaTrash />}
              colorScheme="red"
              variant="ghost"
              onClick={() => deleteTask(task.id)}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;