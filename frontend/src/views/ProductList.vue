<template>
  <div class="product-list-page">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <div>
          <h2 class="page-title">
            <div class="title-icon">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            สินค้า
          </h2>
          <p class="page-subtitle">จัดการข้อมูลสินค้าของคุณ</p>
        </div>
        <router-link to="/products/create" class="btn btn-primary">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          เพิ่มสินค้า
        </router-link>
      </div>

      <!-- Search and Filter Box -->
      <div class="search-container">
        <div class="search-box">
          <div class="search-icon">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="ค้นหาสินค้า..."
            class="search-input"
          />
        </div>

        <div class="filter-box">
          <div class="filter-icon">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
          </div>
          <select
            v-model="selectedCategoryId"
            @change="handleCategoryChange"
            class="filter-select"
          >
            <option value="">ทุกหมวดหมู่</option>
            <option v-for="category in categories" :key="category._id" :value="category._id">
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="alert alert-error">
      <svg class="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p>{{ error }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-content">
        <div class="spinner"></div>
        <p class="loading-text">กำลังโหลด...</p>
      </div>
    </div>

    <!-- Products Table -->
    <div v-else class="table-container">
      <div class="table-wrapper">
        <table class="products-table">
          <thead>
            <tr>
              <th>ชื่อสินค้า</th>
              <th>คำอธิบาย</th>
              <th>ราคา</th>
              <th>จำนวน</th>
              <th>หมวดหมู่</th>
              <th>สร้างเมื่อ</th>
              <th class="text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="products.length === 0" class="empty-row">
              <td colspan="7">
                <div class="empty-state">
                  <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                  </svg>
                  <p>ไม่พบข้อมูลสินค้า</p>
                </div>
              </td>
            </tr>
            <tr v-for="product in products" :key="product._id" class="data-row">
              <td>
                <div class="product-name">{{ product.name }}</div>
              </td>
              <td>
                <div class="product-desc">{{ product.description || '-' }}</div>
              </td>
              <td>
                <div class="product-price">฿{{ formatNumber(product.price) }}</div>
              </td>
              <td>
                <span class="badge" :class="product.stock > 0 ? 'badge-success' : 'badge-danger'">
                  {{ product.stock }}
                </span>
              </td>
              <td>
                <span class="badge badge-info">
                  {{ typeof product.categoryId === 'string' ? '-' : (product.categoryId?.name || '-') }}
                </span>
              </td>
              <td class="date-col">
                {{ formatDate(product.createdAt) }}
              </td>
              <td>
                <div class="action-buttons">
                  <router-link :to="`/products/edit/${product._id}`" class="btn btn-edit">
                    <svg class="btn-icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    แก้ไข
                  </router-link>
                  <button @click="deleteProduct(product._id)" class="btn btn-delete">
                    <svg class="btn-icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    ลบ
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.pages > 1" class="pagination-container">
      <div class="pagination-content">
        <button
          @click="changePage(pagination.page - 1)"
          :disabled="pagination.page === 1"
          class="btn btn-pagination"
        >
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          ก่อนหน้า
        </button>

        <div class="pagination-info">
          <span>หน้า</span>
          <span class="current-page">{{ pagination.page }}</span>
          <span>จาก {{ pagination.pages }}</span>
        </div>

        <button
          @click="changePage(pagination.page + 1)"
          :disabled="pagination.page === pagination.pages"
          class="btn btn-pagination"
        >
          ถัดไป
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import type { Product, Category } from '../types';
import Swal from 'sweetalert2';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const searchQuery = ref<string>('');
const selectedCategoryId = ref<string>('');
const searchTimeout = ref<number | null>(null);
const pagination = reactive<Pagination>({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
});

const loadProducts = async (): Promise<void> => {
  loading.value = true;
  error.value = null;
  try {
    const response = await productService.getAll(
      pagination.page,
      pagination.limit,
      searchQuery.value,
      selectedCategoryId.value
    );
    products.value = response.data.data.products || [];
    Object.assign(pagination, {
      page: response.data.data.page,
      limit: pagination.limit,
      total: response.data.data.total,
      pages: response.data.data.totalPages
    });
  } catch (err: any) {
    error.value = 'ไม่สามารถโหลดข้อมูลได้: ' + (err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
};

const loadCategories = async (): Promise<void> => {
  try {
    const response = await categoryService.getAll(1, 100, '');
    categories.value = response.data.data.categories || [];
  } catch (err: any) {
    console.error('ไม่สามารถโหลดหมวดหมู่ได้:', err);
  }
};

const handleSearch = (): void => {
  if (searchTimeout.value !== null) {
    clearTimeout(searchTimeout.value);
  }
  searchTimeout.value = window.setTimeout(() => {
    pagination.page = 1;
    loadProducts();
  }, 500);
};

const handleCategoryChange = (): void => {
  pagination.page = 1;
  loadProducts();
};

const changePage = (page: number): void => {
  pagination.page = page;
  loadProducts();
};

const deleteProduct = async (id: string): Promise<void> => {
  const result = await Swal.fire({
    title: 'ยืนยันการลบ',
    text: 'คุณต้องการลบสินค้านี้หรือไม่?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'ลบ',
    cancelButtonText: 'ยกเลิก'
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    await productService.delete(id);
    await Swal.fire({
      title: 'สำเร็จ!',
      text: 'ลบสินค้าเรียบร้อยแล้ว',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
    loadProducts();
  } catch (err: any) {
    await Swal.fire({
      title: 'เกิดข้อผิดพลาด!',
      text: 'ไม่สามารถลบได้: ' + (err.response?.data?.message || err.message),
      icon: 'error',
      confirmButtonText: 'ตรวจสอบ'
    });
  }
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

onMounted(() => {
  loadCategories();
  loadProducts();
});
</script>

<style scoped>
.product-list-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Page Header */
.page-header {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  padding: 1.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.page-title {
  font-size: 1.875rem;
  font-weight: bold;
  color: #212529;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
}

.title-icon {
  background: linear-gradient(135deg, #2196f3 0%, #5c6bc0 100%);
  padding: 8px;
  border-radius: 8px;
}

.title-icon .icon {
  width: 24px;
  height: 24px;
  color: white;
}

.page-subtitle {
  color: #6c757d;
  margin-top: 4px;
  margin-bottom: 0;
}

/* Search and Filter */
.search-container {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 250px;
  max-width: 28rem;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  pointer-events: none;
}

.search-icon .icon {
  width: 20px;
  height: 20px;
  color: #6c757d;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.filter-box {
  position: relative;
  min-width: 200px;
}

.filter-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
}

.filter-icon .icon {
  width: 20px;
  height: 20px;
  color: #6c757d;
}

.filter-select {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236c757d'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 20px;
  padding-right: 36px;
}

.filter-select:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.filter-select:hover {
  border-color: #2196f3;
}

/* Alerts */
.alert {
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.alert-error {
  background: #fee;
  border-left: 4px solid #dc3545;
}

.alert-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.alert-error .alert-icon {
  color: #dc3545;
}

.alert p {
  margin: 0;
  color: #c82333;
}

/* Loading */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #e9ecef;
  border-top-color: #2196f3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  color: #495057;
  font-weight: 500;
  margin: 0;
}

/* Table */
.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  overflow: hidden;
}

.table-wrapper {
  overflow-x: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.products-table thead {
  background: linear-gradient(to right, #f8f9fa 0%, #e9ecef 100%);
}

.products-table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #495057;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #dee2e6;
}

.products-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #dee2e6;
  color: #495057;
}

.data-row:hover {
  background: #f8f9fa;
}

.text-center {
  text-align: center;
}

/* Empty State */
.empty-row td {
  padding: 3rem 1.5rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: #dee2e6;
}

.empty-state p {
  color: #6c757d;
  font-weight: 500;
  margin: 0;
}

/* Product Details */
.product-name {
  font-weight: 500;
  color: #212529;
}

.product-desc {
  color: #495057;
  max-width: 20rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price {
  font-size: 1.125rem;
  font-weight: 600;
  color: #28a745;
}

.date-col {
  color: #6c757d;
  font-size: 0.875rem;
  text-wrap: nowrap;
}

/* Badges */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge-success {
  background: #d4edda;
  color: #155724;
}

.badge-danger {
  background: #f8d7da;
  color: #721c24;
}

.badge-info {
  background: #cce5ff;
  color: #004085;
  text-wrap: nowrap;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #2196f3 0%, #5c6bc0 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #1976d2 0%, #4a57a8 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.btn-icon-sm {
  width: 16px;
  height: 16px;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  padding: 8px 12px;
  font-size: 0.875rem;
}

.btn-edit {
  background: #cce5ff;
  color: #004085;
}

.btn-edit:hover {
  background: #b3d7ff;
}

.btn-delete {
  background: #f8d7da;
  color: #721c24;
}

.btn-delete:hover {
  background: #f5c2c7;
}

/* Pagination */
.pagination-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  padding: 1rem;
}

.pagination-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-pagination {
  padding: 8px 16px;
  border: 1px solid #ced4da;
  background: white;
  color: #495057;
}

.btn-pagination:hover:not(:disabled) {
  background: #f8f9fa;
}

.btn-pagination:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #495057;
  font-weight: 500;
}

.current-page {
  padding: 4px 12px;
  background: #cce5ff;
  color: #004085;
  border-radius: 8px;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-primary {
    justify-content: center;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
