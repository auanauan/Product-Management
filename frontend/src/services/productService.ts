import api from './api';
import type {
  Product,
  ProductCreateInput,
  ProductUpdateInput,
  ApiResponse,
  PaginatedResponse
} from '../types';
import { AxiosResponse } from 'axios';

export default {
  getAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    categoryId: string = ''
  ): Promise<AxiosResponse<PaginatedResponse<Product>>> {
    return api.get('/products', {
      params: { page, limit, search, categoryId }
    });
  },

  getById(id: string): Promise<AxiosResponse<ApiResponse<Product>>> {
    return api.get(`/product/${id}`);
  },

  create(data: ProductCreateInput): Promise<AxiosResponse<ApiResponse<Product>>> {
    return api.post('/product', data);
  },

  update(
    id: string,
    data: ProductUpdateInput
  ): Promise<AxiosResponse<ApiResponse<Product>>> {
    return api.put(`/product/${id}`, data);
  },

  delete(
    id: string,
    hardDelete: boolean = false
  ): Promise<AxiosResponse<ApiResponse<void>>> {
    return api.delete(`/product/${id}`, {
      params: { hardDelete }
    });
  }
};
