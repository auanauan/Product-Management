<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <!-- Logo -->
          <div class="logo-section">
            <div class="logo-icon">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h1 class="logo-text">ระบบจัดการสินค้า</h1>
          </div>

          <!-- Navigation Links -->
          <ul class="nav-links">
            <li>
              <router-link to="/products" active-class="active" class="nav-link">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                <span>สินค้า</span>
              </router-link>
            </li>
            <li>
              <router-link to="/categories" active-class="active" class="nav-link">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
                <span>หมวดหมู่</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
}

/* Navigation Styles */
.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e9ecef;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

/* Logo Section */
.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  background: linear-gradient(135deg, #2196f3 0%, #5c6bc0 100%);
  padding: 8px;
  border-radius: 8px;
}

.logo-icon .icon {
  width: 24px;
  height: 24px;
  color: white;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: bold;
  background: linear-gradient(135deg, #1976d2 0%, #5c6bc0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  color: #495057;
  text-decoration: none;
  border: 2px solid transparent;
  transition: all 0.2s;
  font-weight: 500;
}

.nav-link:hover {
  background: #f8f9fa;
}

.nav-link.active {
  background: #e3f2fd;
  color: #1976d2;
  border-color: #2196f3;
}

.nav-icon {
  width: 20px;
  height: 20px;
}

/* Main Content */
.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* Responsive */
@media (max-width: 640px) {
  .nav-content {
    flex-direction: column;
    height: auto;
    padding: 1rem 0;
    gap: 1rem;
  }

  .logo-section {
    width: 100%;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
  }
}
</style>
