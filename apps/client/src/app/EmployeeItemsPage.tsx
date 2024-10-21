import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import EmployeeItemForm from './EmployeeItemForm';
import { EmployeeItem } from './EmployeeItem.types';
import employeeItemApiService from './EmployeeItemService';

const EmployeeItemsPage: React.FC = () => {
  const [items, setItems] = useState<EmployeeItem[]>([]);
  const [currentItem, setCurrentItem] = useState<EmployeeItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    employeeItemApiService.getItemsList().then((items) => setItems(items));
  }, []);

  const handleSaveItem = (item: EmployeeItem) => {
    if (isEditing) {
      employeeItemApiService.updateItem(item._id as string, item).then(() => {
        setItems(items.map((i) => (i._id === item._id ? item : i)));
      });
      setIsEditing(false);
    } else {
      employeeItemApiService.createItem(item).then(() => {
        setItems([...items, { ...item, _id: '' }]);
      });
    }

    setCurrentItem(null);
  };

  const handleDeleteItem = (id: string | undefined) => {
    employeeItemApiService.deleteItem(id as string).then(() => {
      setItems(items.filter((item) => item._id !== id));
    });
  };

  const handleEditItem = (item: EmployeeItem) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  return (
    <Box mt={5}>
      <Typography variant="h4" gutterBottom>
        Employee Items
      </Typography>

      <EmployeeItemForm
        onSave={handleSaveItem}
        item={currentItem}
        isEditing={isEditing}
      />

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Сurname</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Issue Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.surname}</TableCell>
                <TableCell>{item.roomNumber}</TableCell>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.issueDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditItem(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteItem(item._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeItemsPage;
