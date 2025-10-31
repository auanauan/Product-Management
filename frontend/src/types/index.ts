// Product Types
export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string | {
    _id: string;
    name: string;
    description?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
}

export interface ProductUpdateInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
}

// Category Types
export interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryCreateInput {
  name: string;
  description?: string;
}

export interface CategoryUpdateInput {
  name?: string;
  description?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    categories?: T[];
    products?: T[];
    total: number;
    page: number;
    totalPages: number;
  };
  message?: string;
}

// Query Parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
}
