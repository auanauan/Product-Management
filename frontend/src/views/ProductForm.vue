<template>
  <div class="product-form-page">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <div class="title-icon">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </div>
        <div>
          <h2 class="page-title">{{ isEdit ? 'แก้ไข' : 'เพิ่ม' }}สินค้า</h2>
          <p class="page-subtitle">{{ isEdit ? 'แก้ไขข้อมูลสินค้าของคุณ' : 'เพิ่มสินค้าใหม่เข้าสู่ระบบ' }}</p>
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

    <!-- Success Message -->
    <div v-if="success" class="alert alert-success">
      <svg class="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p>{{ success }}</p>
    </div>

    <!-- Form Container -->
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="form">
        <!-- Product Name -->
        <div class="form-group">
          <label for="name" class="form-label">
            ชื่อสินค้า <span class="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            @blur="validateField('name')"
            :class="['form-input', { 'input-error': errors.name }]"
            placeholder="กรอกชื่อสินค้า"
          />
          <p v-if="errors.name" class="error-message">
            <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ errors.name }}
          </p>
        </div>

        <!-- Description -->
        <div class="form-group">
          <label for="description" class="form-label">
            คำอธิบาย
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="form-textarea"
            placeholder="กรอกคำอธิบายสินค้า (ไม่จำเป็น)"
          ></textarea>
        </div>

        <!-- Price and Quantity Row -->
        <div class="form-row">
          <!-- Price -->
          <div class="form-group">
            <label for="price" class="form-label">
              ราคา (บาท) <span class="required">*</span>
            </label>
            <div class="input-with-icon">
              <div class="input-prefix">฿</div>
              <input
                type="number"
                id="price"
                v-model.number="form.price"
                step="0.01"
                min="0"
                @blur="validateField('price')"
                :class="['form-input', 'input-with-prefix', { 'input-error': errors.price }]"
                placeholder="0.00"
              />
            </div>
            <p v-if="errors.price" class="error-message">
              <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ errors.price }}
            </p>
          </div>

          <!-- Stock -->
          <div class="form-group">
            <label for="stock" class="form-label">
              จำนวน <span class="required">*</span>
            </label>
            <input
              type="number"
              id="stock"
              v-model.number="form.stock"
              min="0"
              @blur="validateField('stock')"
              :class="['form-input', { 'input-error': errors.stock }]"
              placeholder="0"
            />
            <p v-if="errors.stock" class="error-message">
              <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ errors.stock }}
            </p>
          </div>
        </div>

        <!-- Category -->
        <div class="form-group">
          <label for="categoryId" class="form-label">
            หมวดหมู่ <span class="required">*</span>
          </label>
          <select
            id="categoryId"
            v-model="form.categoryId"
            @blur="validateField('categoryId')"
            :class="['form-select', { 'input-error': errors.categoryId }]"
          >
            <option value="">-- เลือกหมวดหมู่ --</option>
            <option v-for="category in categories" :key="category._id" :value="category._id">
              {{ category.name }}
            </option>
          </select>
          <p v-if="errors.categoryId" class="error-message">
            <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ errors.categoryId }}
          </p>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="submit" :disabled="loading" class="btn btn-success">
            <svg v-if="!loading" class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <div v-else class="spinner-small"></div>
            {{ loading ? 'กำลังบันทึก...' : 'บันทึก' }}
          </button>
          <router-link to="/products" class="btn btn-cancel">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            ยกเลิก
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import type { Category } from '../types';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

interface ProductForm {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
}

interface FormErrors {
  name?: string;
  price?: string;
  stock?: string;
  categoryId?: string;
  description?: string;
}

const form = reactive<ProductForm>({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  categoryId: ''
});

const categories = ref<Category[]>([]);
const errors = reactive<FormErrors>({});
const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const isEdit = computed(() => !!route.params.id);

const loadCategories = async (): Promise<void> => {
  try {
    const response = await categoryService.getAll(1, 100);
    categories.value = response.data.data.categories || [];
  } catch (err: any) {
    error.value = 'ไม่สามารถโหลดหมวดหมู่ได้: ' + (err.response?.data?.message || err.message);
  }
};

const loadProduct = async (): Promise<void> => {
  loading.value = true;
  try {
    const response = await productService.getById(route.params.id as string);
    const product = response.data.data;
    Object.assign(form, {
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      categoryId: typeof product.categoryId === 'string' ? product.categoryId : product.categoryId?._id || ''
    });
  } catch (err: any) {
    error.value = 'ไม่สามารถโหลดข้อมูลได้: ' + (err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
};

const validateField = (field: keyof ProductForm): void => {
  switch (field) {
    case 'name':
      if (!form.name || form.name.trim() === '') {
        errors.name = 'กรุณากรอกชื่อสินค้า';
      } else {
        delete errors.name;
      }
      break;
    case 'price':
      if (form.price === null || form.price === undefined || form.price < 0) {
        errors.price = 'กรุณากรอกราคาที่ถูกต้อง';
      } else {
        delete errors.price;
      }
      break;
    case 'stock':
      if (form.stock === null || form.stock === undefined || form.stock < 0) {
        errors.stock = 'กรุณากรอกจำนวนที่ถูกต้อง';
      } else {
        delete errors.stock;
      }
      break;
    case 'categoryId':
      if (!form.categoryId) {
        errors.categoryId = 'กรุณาเลือกหมวดหมู่';
      } else {
        delete errors.categoryId;
      }
      break;
  }
};

const validateForm = (): boolean => {
  Object.keys(errors).forEach(key => delete errors[key as keyof FormErrors]);
  validateField('name');
  validateField('price');
  validateField('stock');
  validateField('categoryId');
  return Object.keys(errors).length === 0;
};

const handleSubmit = async (): Promise<void> => {
  if (!validateForm()) {
    await Swal.fire({
      title: 'ข้อมูลไม่ครบถ้วน',
      text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      icon: 'warning',
      confirmButtonText: 'ตกลง'
    });
    return;
  }

  loading.value = true;
  error.value = null;
  success.value = null;

  try {
    if (isEdit.value) {
      await productService.update(route.params.id as string, form);
      await Swal.fire({
        title: 'สำเร็จ!',
        text: 'แก้ไขสินค้าเรียบร้อยแล้ว',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      await productService.create(form);
      await Swal.fire({
        title: 'สำเร็จ!',
        text: 'เพิ่มสินค้าเรียบร้อยแล้ว',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      Object.assign(form, {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        categoryId: ''
      });
    }

    setTimeout(() => {
      router.push('/products');
    }, 1500);
  } catch (err: any) {
    await Swal.fire({
      title: 'เกิดข้อผิดพลาด!',
      text: err.response?.data?.message || err.message,
      icon: 'error',
      confirmButtonText: 'ตรวจสอบ'
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadCategories();
  if (route.params.id) {
    loadProduct();
  }
});
</script>

<style scoped>
.product-form-page {
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
  align-items: center;
  gap: 12px;
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

.page-title {
  font-size: 1.875rem;
  font-weight: bold;
  color: #212529;
  margin: 0;
}

.page-subtitle {
  color: #6c757d;
  margin-top: 4px;
  margin-bottom: 0;
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

.alert-success {
  background: #d4edda;
  border-left: 4px solid #28a745;
}

.alert-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.alert-error .alert-icon {
  color: #dc3545;
}

.alert-success .alert-icon {
  color: #28a745;
}

.alert-error p {
  margin: 0;
  color: #c82333;
}

.alert-success p {
  margin: 0;
  color: #155724;
}

/* Form Container */
.form-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  padding: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Form Group */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
}

.required {
  color: #dc3545;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.input-error {
  border-color: #dc3545;
}

.input-error:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.form-textarea {
  resize: none;
}

/* Input with Icon */
.input-with-icon {
  position: relative;
}

.input-prefix {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #6c757d;
  font-weight: 500;
  pointer-events: none;
}

.input-with-prefix {
  padding-left: 32px;
}

/* Error Message */
.error-message {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 0.875rem;
  color: #dc3545;
}

.error-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Form Row */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

.btn-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-success:hover:not(:disabled) {
  background: linear-gradient(135deg, #218838 0%, #1aa179 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-success:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-cancel {
  background: #e9ecef;
  color: #495057;
}

.btn-cancel:hover {
  background: #dee2e6;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.spinner-small {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
