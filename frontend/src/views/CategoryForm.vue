<template>
  <div class="category-form-page">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <div class="title-icon purple">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
          </svg>
        </div>
        <div>
          <h2 class="page-title">{{ isEdit ? 'แก้ไข' : 'เพิ่ม' }}หมวดหมู่</h2>
          <p class="page-subtitle">{{ isEdit ? 'แก้ไขข้อมูลหมวดหมู่ของคุณ' : 'เพิ่มหมวดหมู่ใหม่เข้าสู่ระบบ' }}</p>
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
        <!-- Category Name -->
        <div class="form-group">
          <label for="name" class="form-label">
            ชื่อหมวดหมู่ <span class="required">*</span>
          </label>
          <div class="input-with-icon">
            <div class="input-icon">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
              </svg>
            </div>
            <input
              type="text"
              id="name"
              v-model="form.name"
              @blur="validateField('name')"
              :class="['form-input', 'input-with-left-icon', { 'input-error': errors.name }]"
              placeholder="กรอกชื่อหมวดหมู่"
            />
          </div>
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
            class="form-textarea purple"
            placeholder="กรอกคำอธิบายหมวดหมู่ (ไม่จำเป็น)"
          ></textarea>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="submit" :disabled="loading" class="btn btn-success purple">
            <svg v-if="!loading" class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <div v-else class="spinner-small"></div>
            {{ loading ? 'กำลังบันทึก...' : 'บันทึก' }}
          </button>
          <router-link to="/categories" class="btn btn-cancel">
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
import categoryService from '../services/categoryService';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

interface CategoryForm {
  name: string;
  description: string;
}

interface FormErrors {
  name?: string;
  description?: string;
}

const form = reactive<CategoryForm>({
  name: '',
  description: ''
});

const errors = reactive<FormErrors>({});
const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const isEdit = computed(() => !!route.params.id);

const loadCategory = async (): Promise<void> => {
  loading.value = true;
  try {
    const response = await categoryService.getById(route.params.id as string);
    Object.assign(form, {
      name: response.data.data.name,
      description: response.data.data.description || ''
    });
  } catch (err: any) {
    error.value = 'ไม่สามารถโหลดข้อมูลได้: ' + (err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
};

const validateField = (field: keyof CategoryForm): void => {
  if (field === 'name') {
    if (!form.name || form.name.trim() === '') {
      errors.name = 'กรุณากรอกชื่อหมวดหมู่';
    } else {
      delete errors.name;
    }
  }
};

const validateForm = (): boolean => {
  Object.keys(errors).forEach(key => delete errors[key as keyof FormErrors]);
  validateField('name');
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
      await categoryService.update(route.params.id as string, form);
      await Swal.fire({
        title: 'สำเร็จ!',
        text: 'แก้ไขหมวดหมู่เรียบร้อยแล้ว',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      await categoryService.create(form);
      await Swal.fire({
        title: 'สำเร็จ!',
        text: 'เพิ่มหมวดหมู่เรียบร้อยแล้ว',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      Object.assign(form, { name: '', description: '' });
    }

    setTimeout(() => {
      router.push('/categories');
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
  if (route.params.id) {
    loadCategory();
  }
});
</script>

<style scoped>
.category-form-page {
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

.title-icon.purple {
  background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%);
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
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.form-textarea.purple:focus {
  border-color: #9c27b0;
  box-shadow: 0 0 0 3px rgba(156, 39, 176, 0.1);
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

.input-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  pointer-events: none;
}

.input-icon .icon {
  width: 20px;
  height: 20px;
  color: #6c757d;
}

.input-with-left-icon {
  padding-left: 40px;
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

.btn-success.purple {
  background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%);
}

.btn-success:hover:not(:disabled) {
  background: linear-gradient(135deg, #218838 0%, #1aa179 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-success.purple:hover:not(:disabled) {
  background: linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%);
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
  .form-actions {
    flex-direction: column;
  }
}
</style>
