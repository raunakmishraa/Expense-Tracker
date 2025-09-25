/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f8fafc;
    color: #1f2937;
    line-height: 1.6;
}

/* Layout */
.app-container {
    display: flex;
    min-height: 100vh;
}

/* Sidebar */
.sidebar {
    width: 256px;
    background: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 30;
}

.sidebar-header {
    padding: 24px;
    border-bottom: 1px solid #e5e7eb;
}

.sidebar-header h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 4px;
}

.sidebar-header p {
    font-size: 14px;
    color: #6b7280;
}

.sidebar-menu {
    list-style: none;
    margin-top: 24px;
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 12px 24px;
    color: #6b7280;
    text-decoration: none;
    transition: all 0.2s;
    border-right: 2px solid transparent;
}

.menu-item:hover {
    background-color: #f9fafb;
    color: #374151;
}

.menu-item.active {
    background-color: #eff6ff;
    color: #2563eb;
    border-right-color: #2563eb;
}

.menu-item i {
    margin-right: 12px;
    width: 20px;
}

/* Main Content */
.main-content {
    flex: 1;
    margin-left: 256px;
    padding: 24px;
    max-width: calc(100vw - 256px);
}

/* Page Header */
.page-header {
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.page-header h2 {
    font-size: 32px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 4px;
}

.page-header p {
    color: #6b7280;
}

/* Tab Content */
.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

/* Cards */
.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 24px;
    margin-bottom: 24px;
}

.card-header {
    padding-bottom: 16px;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 16px;
}

.card h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
}

/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
}

.stat-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 24px;
}

.stat-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stat-label {
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
    margin-bottom: 4px;
}

.stat-value {
    font-size: 24px;
    font-weight: 700;
}

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.2;
}

.stat-icon i {
    font-size: 24px;
}

/* Colors */
.text-blue { color: #2563eb; }
.text-green { color: #059669; }
.text-red { color: #dc2626; }
.text-purple { color: #7c3aed; }
.text-yellow { color: #d97706; }

.bg-blue { background-color: #2563eb; }
.bg-green { background-color: #059669; }
.bg-red { background-color: #dc2626; }
.bg-purple { background-color: #7c3aed; }
.bg-yellow { background-color: #d97706; }

/* Dashboard Grid */
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s;
    gap: 8px;
}

.btn-primary {
    background-color: #2563eb;
    color: white;
}

.btn-primary:hover {
    background-color: #1d4ed8;
}

.btn-secondary {
    background-color: #6b7280;
    color: white;
}

.btn-secondary:hover {
    background-color: #4b5563;
}

.btn-danger {
    background-color: #dc2626;
    color: white;
}

.btn-danger:hover {
    background-color: #b91c1c;
}

.btn-link {
    background: none;
    color: #6b7280;
    padding: 4px 8px;
}

.btn-link:hover {
    color: #dc2626;
}

.mb-4 {
    margin-bottom: 16px;
}

/* Forms */
.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    color: #6b7280;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-btn:hover {
    color: #374151;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-actions {
    display: flex;
    gap: 12px;
    padding-top: 16px;
}

/* Color Picker */
.color-picker {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.color-option {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #e5e7eb;
    cursor: pointer;
    transition: border-color 0.2s;
}

.color-option.active {
    border-color: #374151;
}

/* Accounts Grid */
.accounts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
}

.account-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 24px;
    border-left: 4px solid;
}

.account-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
}

.account-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.account-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.2;
}

.account-details h4 {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 4px;
}

.account-details p {
    font-size: 14px;
    color: #6b7280;
    text-transform: capitalize;
}

.account-actions {
    display: flex;
    gap: 4px;
}

.account-actions button {
    background: none;
    border: none;
    padding: 4px;
    color: #6b7280;
    cursor: pointer;
    border-radius: 4px;
    transition: color 0.2s;
}

.account-actions button:hover {
    color: #374151;
}

.account-balance {
    font-size: 24px;
    font-weight: 700;
}

/* Filters */
.filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.filter-section {
    margin-bottom: 16px;
}

.filter-section label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
}

.filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.filter-btn {
    padding: 6px 12px;
    border: 1px solid #d1d5db;
    background: white;
    color: #374151;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
}

.filter-btn:hover {
    background-color: #f9fafb;
}

.filter-btn.active {
    background-color: #2563eb;
    color: white;
    border-color: #2563eb;
}

/* Transaction List */
.transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
    transition: background-color 0.2s;
}

.transaction-item:hover {
    background-color: #f9fafb;
}

.transaction-item:last-child {
    border-bottom: none;
}

.transaction-left {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
}

.transaction-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.transaction-details h4 {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 4px;
}

.transaction-meta {
    font-size: 14px;
    color: #6b7280;
}

.transaction-right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.transaction-amount {
    font-size: 18px;
    font-weight: 600;
}

.transaction-actions button {
    background: none;
    border: none;
    padding: 4px;
    color: #6b7280;
    cursor: pointer;
    border-radius: 4px;
    transition: color 0.2s;
}

.transaction-actions button:hover {
    color: #dc2626;
}

/* Charts Grid */
.charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
}

.chart-container {
    position: relative;
    height: 300px;
    width: 100%;
}

.chart-container canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
}
/* Settings */
.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
}

.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-bottom: 16px;
}

.setting-item.danger {
    border-color: #fecaca;
    background-color: #fef2f2;
}

.setting-info h4 {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 4px;
}

.setting-info p {
    font-size: 14px;
    color: #6b7280;
}

.setting-item.danger .setting-info h4 {
    color: #991b1b;
}

.setting-item.danger .setting-info p {
    color: #b91c1c;
}

.stats-list {
    margin-bottom: 12px;
}

.stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
}

.stat-row:last-child {
    border-bottom: none;
}

.about-content {
    color: #6b7280;
    line-height: 1.6;
}

.about-content p {
    margin-bottom: 8px;
}

/* Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
}

.modal-content {
    background: white;
    border-radius: 8px;
    padding: 24px;
    max-width: 400px;
    width: 90%;
    margin: 16px;
}

.modal-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.modal-header h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
}

.modal-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
}

/* Empty States */
.empty-state {
    text-align: center;
    padding: 48px 24px;
    color: #6b7280;
}

.empty-icon {
    font-size: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
}

.empty-state h3 {
    font-size: 18px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
}

.empty-state p {
    margin-bottom: 24px;
}

/* Utility Classes */
.text-center {
    text-align: center;
}

.mb-2 {
    margin-bottom: 8px;
}

.mb-4 {
    margin-bottom: 16px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s;
    }
    
    .main-content {
        margin-left: 0;
        max-width: 100vw;
        padding: 16px;
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
    }
    
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
    
    .accounts-grid {
        grid-template-columns: 1fr;
    }
    
    .charts-grid {
        grid-template-columns: 1fr;
    }
    
    .settings-grid {
        grid-template-columns: 1fr;
    }
    
    .form-grid {
        grid-template-columns: 1fr;
    }
    
    .setting-item {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }
    
    .modal-actions {
        flex-direction: column;
    }
}
