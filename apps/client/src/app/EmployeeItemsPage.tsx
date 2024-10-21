import React, { useState } from 'react';
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

interface EmployeeItem {
  id?: number;
  surname: string;
  roomNumber: string;
  itemName: string;
  issueDate: string;
}

const EmployeeItemsPage: React.FC = () => {
  const [items, setItems] = useState<EmployeeItem[]>([]);
  const [currentItem, setCurrentItem] = useState<EmployeeItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveItem = (item: EmployeeItem) => {
    if (isEditing) {
      setItems(items.map((i) => (i.id === item.id ? item : i)));
      setIsEditing(false);
    } else {
      setItems([...items, { ...item, id: Date.now() }]);
    }
    setCurrentItem(null);
  };

  const handleDeleteItem = (id: number | undefined) => {
    setItems(items.filter((item) => item.id !== id));
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
              <TableRow key={item.id}>
                <TableCell>{item.surname}</TableCell>
                <TableCell>{item.roomNumber}</TableCell>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.issueDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditItem(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteItem(item.id)}>
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
