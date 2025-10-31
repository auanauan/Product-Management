import api from './api';
import type {
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
  ApiResponse,
  PaginatedResponse
} from '../types';
import { AxiosResponse } from 'axios';

export default {
  getAll(
    page: number = 1,
    limit: number = 10,
    search: string = ''
  ): Promise<AxiosResponse<PaginatedResponse<Category>>> {
    return api.get('/categories', {
      params: { page, limit, search }
    });
  },

  getById(id: string): Promise<AxiosResponse<ApiResponse<Category>>> {
    return api.get(`/category/${id}`);
  },

  create(data: CategoryCreateInput): Promise<AxiosResponse<ApiResponse<Category>>> {
    return api.post('/category', data);
  },

  update(
    id: string,
    data: CategoryUpdateInput
  ): Promise<AxiosResponse<ApiResponse<Category>>> {
    return api.put(`/category/${id}`, data);
  },

  delete(
    id: string,
    hardDelete: boolean = false
  ): Promise<AxiosResponse<ApiResponse<void>>> {
    return api.delete(`/category/${id}`, {
      params: { hardDelete }
    });
  }
};
