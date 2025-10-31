<template>
  <div class="category-list-page">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <div>
          <h2 class="page-title">
            <div class="title-icon purple">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </div>
            หมวดหมู่สินค้า
          </h2>
          <p class="page-subtitle">จัดการหมวดหมู่สินค้าของคุณ</p>
        </div>
        <router-link to="/categories/create" class="btn btn-primary purple">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          เพิ่มหมวดหมู่
        </router-link>
      </div>

      <!-- Search Box -->
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
            placeholder="ค้นหาหมวดหมู่..."
            class="search-input purple"
          />
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
        <div class="spinner purple"></div>
        <p class="loading-text">กำลังโหลด...</p>
      </div>
    </div>

    <!-- Categories Table -->
    <div v-else class="table-container">
      <div class="table-wrapper">
        <table class="categories-table">
          <thead>
            <tr>
              <th>ชื่อหมวดหมู่</th>
              <th>คำอธิบาย</th>
              <th>สร้างเมื่อ</th>
              <th class="text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="categories.length === 0" class="empty-row">
              <td colspan="4">
                <div class="empty-state">
                  <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                  <p>ไม่พบข้อมูลหมวดหมู่</p>
                </div>
              </td>
            </tr>
            <tr v-for="category in categories" :key="category._id" class="data-row">
              <td>
                <div class="category-name">
                  <div class="category-icon">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                    </svg>
                  </div>
                  <span>{{ category.name }}</span>
                </div>
              </td>
              <td>
                <div class="category-desc">{{ category.description || '-' }}</div>
              </td>
              <td class="date-col">
                {{ formatDate(category.createdAt) }}
              </td>
              <td>
                <div class="action-buttons">
                  <router-link :to="`/categories/edit/${category._id}`" class="btn btn-edit">
                    <svg class="btn-icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    แก้ไข
                  </router-link>
                  <button @click="deleteCategory(category._id)" class="btn btn-delete">
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
          <span class="current-page purple">{{ pagination.page }}</span>
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
import categoryService from '../services/categoryService';
import type { Category } from '../types';
import Swal from 'sweetalert2';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const categories = ref<Category[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const searchQuery = ref<string>('');
const searchTimeout = ref<number | null>(null);
const pagination = reactive<Pagination>({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
});

const loadCategories = async (): Promise<void> => {
  loading.value = true;
  error.value = null;
  try {
    const response = await categoryService.getAll(
      pagination.page,
      pagination.limit,
      searchQuery.value
    );
    // รองรับ response structure: { success: true, data: { categories: [...], total, page, totalPages } }
    categories.value = response.data.data.categories || [];
    pagination.page = response.data.data.page;
    pagination.limit = pagination.limit;
    pagination.total = response.data.data.total;
    pagination.pages = response.data.data.totalPages;
  } catch (err: any) {
    error.value = 'ไม่สามารถโหลดข้อมูลได้: ' + (err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
};

const handleSearch = (): void => {
  if (searchTimeout.value !== null) {
    clearTimeout(searchTimeout.value);
  }
  searchTimeout.value = window.setTimeout(() => {
    pagination.page = 1;
    loadCategories();
  }, 500);
};

const changePage = (page: number): void => {
  pagination.page = page;
  loadCategories();
};

const deleteCategory = async (id: string): Promise<void> => {
  const result = await Swal.fire({
    title: 'ยืนยันการลบ',
    text: 'คุณต้องการลบหมวดหมู่นี้หรือไม่?',
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
    await categoryService.delete(id);
    await Swal.fire({
      title: 'สำเร็จ!',
      text: 'ลบหมวดหมู่เรียบร้อยแล้ว',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
    loadCategories();
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
  if (!date) return '-';
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '-';
  return dateObj.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(() => {
  loadCategories();
});
</script>

<style scoped>
.category-list-page {
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

.title-icon.purple {
  background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%);
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

/* Search */
.search-container {
  margin-top: 1.5rem;
}

.search-box {
  position: relative;
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

.search-input.purple:focus {
  border-color: #9c27b0;
  box-shadow: 0 0 0 3px rgba(156, 39, 176, 0.1);
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

.spinner.purple {
  border-top-color: #9c27b0;
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

.categories-table {
  width: 100%;
  border-collapse: collapse;
}

.categories-table thead {
  background: linear-gradient(to right, #f8f9fa 0%, #e9ecef 100%);
}

.categories-table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #495057;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #dee2e6;
}

.categories-table td {
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

/* Category Details */
.category-name {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-icon {
  background: linear-gradient(135deg, #f3e5f5 0%, #fce4ec 100%);
  padding: 8px;
  border-radius: 8px;
}

.category-icon .icon {
  width: 20px;
  height: 20px;
  color: #9c27b0;
}

.category-name span {
  font-weight: 500;
  color: #212529;
}

.category-desc {
  color: #495057;
  max-width: 28rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.date-col {
  color: #6c757d;
  font-size: 0.875rem;
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

.btn-primary.purple {
  background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #1976d2 0%, #4a57a8 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-primary.purple:hover {
  background: linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%);
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

.current-page.purple {
  background: #f3e5f5;
  color: #7b1fa2;
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
