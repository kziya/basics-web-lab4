import { EmployeeItem } from './EmployeeItem.types';
import axios, { AxiosInstance } from 'axios';

export class EmployeeItemService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:4200/api',
    });
  }

  async getItemsList(): Promise<EmployeeItem[]> {
    const res = await this.axiosInstance.get<EmployeeItem[]>(
      '/employee-items/list'
    );

    return res.data;
  }

  async createItem(
    employeeItem: Omit<EmployeeItem, '_id'>
  ): Promise<EmployeeItem> {
    const res = await this.axiosInstance.post<EmployeeItem>(
      '/employee-items',
      employeeItem
    );

    return res.data;
  }

  async updateItem(id: string, employeeItem: EmployeeItem): Promise<void> {
    await this.axiosInstance.put<EmployeeItem>(
      `/employee-items/${id}`,
      employeeItem
    );
  }

  async deleteItem(id: string): Promise<void> {
    await this.axiosInstance.delete(`/employee-items/${id}`);
  }
}

export default new EmployeeItemService();
