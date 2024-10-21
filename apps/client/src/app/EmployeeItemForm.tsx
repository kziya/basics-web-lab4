import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { EmployeeItem } from './EmployeeItem.types';

interface EmployeeItemFormProps {
  onSave: (item: EmployeeItem) => void;
  item: EmployeeItem | null;
  isEditing: boolean;
}

const EmployeeItemForm: React.FC<EmployeeItemFormProps> = ({
  onSave,
  item,
  isEditing,
}) => {
  const [formData, setFormData] = useState<EmployeeItem>({
    surname: '',
    roomNumber: '',
    itemName: '',
    issueDate: '',
  });

  useEffect(() => {
    if (isEditing && item) {
      setFormData(item);
    }
  }, [isEditing, item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, _id: isEditing ? item?._id : undefined });
    setFormData({ surname: '', roomNumber: '', itemName: '', issueDate: '' }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" mb={2}>
        <TextField
          name="surname"
          label="Surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          name="roomNumber"
          label="Room Number"
          value={formData.roomNumber}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          name="itemName"
          label="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          name="issueDate"
          label="Issue Date"
          type="date"
          value={formData.issueDate}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          {isEditing ? 'Update Item' : 'Add Item'}
        </Button>
      </Box>
    </form>
  );
};

export default EmployeeItemForm;
