// Global variables
let accounts = JSON.parse(localStorage.getItem('expense-tracker-accounts') || '[]');
let transactions = JSON.parse(localStorage.getItem('expense-tracker-transactions') || '[]');
let currentFilters = {
    dateFilter: 'all',
    accountIds: [],
    categories: [],
    transactionTypes: ['income', 'expense', 'transfer']
};
let editingAccountId = null;

// Categories data
const categories = {
    income: [
        { name: 'Salary', icon: '💼', color: '#10B981' },
        { name: 'Freelance', icon: '💻', color: '#059669' },
        { name: 'Investment', icon: '📈', color: '#047857' },
        { name: 'Other Income', icon: '💰', color: '#065F46' }
    ],
    expense: [
        { name: 'Household Needs', icon: '🏠', color: '#EF4444' },
        { name: 'Food & Groceries', icon: '🛒', color: '#DC2626' },
        { name: 'Recharge & Bills', icon: '🚌', color: '#B91C1C' },
        { name: 'Pathao/inDrive', icon: '🚗', color: '#991B1B' },
        { name: 'Entertainment', icon: '🎉', color: '#7C2D12' },
        { name: 'Tea & Friends', icon: '☕', color: '#A16207' },
        { name: 'Rent', icon: '🏠', color: '#B45309' },
        { name: 'Utilities', icon: '⚡', color: '#D97706' },
        { name: 'Education', icon: '📚', color: '#F59E0B' },
        { name: 'Healthcare', icon: '🏥', color: '#EC4899' },
        { name: 'Shopping', icon: '🛍️', color: '#8B5CF6' },
        { name: 'Other Expenses', icon: '📝', color: '#6B7280' }
    ]
};

// Utility functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatCurrency(amount) {
    return `NRs ${amount.toLocaleString()}`;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function saveData() {
    localStorage.setItem('expense-tracker-accounts', JSON.stringify(accounts));
    localStorage.setItem('expense-tracker-transactions', JSON.stringify(transactions));
}

// Initialize app
$(document).ready(function() {
    initializeApp();
    setupEventListeners();
    updateDashboard();
    updateAccountsDisplay();
    updateTransactionsDisplay();
    updateAnalytics();
    updateSettings();
});

function initializeApp() {
    // Set default date to today
    $('#transaction-date').val(new Date().toISOString().split('T')[0]);
    
    // Parse stored dates
    transactions = transactions.map(t => ({
        ...t,
        date: new Date(t.date),
        createdAt: new Date(t.createdAt)
    }));
    
    accounts = accounts.map(a => ({
        ...a,
        createdAt: new Date(a.createdAt)
    }));
}

function setupEventListeners() {
    // Tab switching
    $('.menu-item').click(function(e) {
        e.preventDefault();
        const tab = $(this).data('tab');
        switchTab(tab);
    });
    
    // Account management
    $('#add-account-btn').click(() => showAccountForm());
    $('#close-account-form-btn, #cancel-account-form-btn').click(() => hideAccountForm());
    $('#account-form-element').submit(handleAccountSubmit);
    
    // Color picker
    $('.color-option').click(function() {
        $('.color-option').removeClass('active');
        $(this).addClass('active');
    });
    
    // Transaction management
    $('#add-transaction-btn').click(() => showTransactionForm());
    $('#close-form-btn, #cancel-form-btn').click(() => hideTransactionForm());
    $('#transaction-form-element').submit(handleTransactionSubmit);
    $('#transaction-type').change(handleTransactionTypeChange);
    
    // Filters
    $('#toggle-filters').click(() => $('#filter-content').toggle());
    $('#clear-filters').click(clearFilters);
    $('.filter-btn').click(handleDateFilter);
    $('.type-filter').click(handleTypeFilter);
    $('#custom-start-date, #custom-end-date').change(applyFilters);
    
    // Settings
    $('#export-data-btn').click(exportData);
    $('#clear-data-btn').click(() => $('#confirmation-modal').show());
    $('#confirm-clear-btn').click(clearAllData);
    $('#cancel-clear-btn').click(() => $('#confirmation-modal').hide());
}

function switchTab(tabName) {
    $('.menu-item').removeClass('active');
    $(`.menu-item[data-tab="${tabName}"]`).addClass('active');
    
    $('.tab-content').removeClass('active');
    $(`#${tabName}`).addClass('active');
    
    // Update displays when switching tabs
    if (tabName === 'dashboard') updateDashboard();
    if (tabName === 'accounts') updateAccountsDisplay();
    if (tabName === 'transactions') updateTransactionsDisplay();
    if (tabName === 'analytics') updateAnalytics();
    if (tabName === 'settings') updateSettings();
}

// Account Management
function showAccountForm(account = null) {
    editingAccountId = account ? account.id : null;
    
    if (account) {
        $('#account-form-title').text('Edit Account');
        $('#account-submit-btn').text('Update Account');
        $('#account-name').val(account.name);
        $('#account-type').val(account.type);
        $('#account-balance').val(account.balance);
        
        $('.color-option').removeClass('active');
        $(`.color-option[data-color="${account.color}"]`).addClass('active');
    } else {
        $('#account-form-title').text('Add New Account');
        $('#account-submit-btn').text('Add Account');
        $('#account-form-element')[0].reset();
        $('.color-option').removeClass('active');
        $('.color-option').first().addClass('active');
    }
    
    $('#account-form').show();
}

function hideAccountForm() {
    $('#account-form').hide();
    editingAccountId = null;
}

function handleAccountSubmit(e) {
    e.preventDefault();
    
    const accountData = {
        bank: $('#bank-name').val(),
        name: $('#account-name').val(),
        acc_number: $("#account-number").val(),
        type: $('#account-type').val(),
        balance: parseFloat($('#account-balance').val()) || 0,
        color: $('.color-option.active').data('color')
    };
    
    if (editingAccountId) {
        // Update existing account
        const accountIndex = accounts.findIndex(a => a.id === editingAccountId);
        accounts[accountIndex] = { ...accounts[accountIndex], ...accountData };
    } else {
        // Add new account
        const newAccount = {
            ...accountData,
            id: generateId(),
            createdAt: new Date()
        };
        accounts.push(newAccount);
    }
    
    saveData();
    updateAccountsDisplay();
    updateTransactionsDisplay();
    updateDashboard();
    hideAccountForm();
}

function deleteAccount(accountId) {
    if (confirm('Are you sure you want to delete this account? All associated transactions will also be deleted.')) {
        accounts = accounts.filter(a => a.id !== accountId);
        transactions = transactions.filter(t => t.accountId !== accountId && t.toAccountId !== accountId);
        saveData();
        updateAccountsDisplay();
        updateTransactionsDisplay();
        updateDashboard();
    }
}

function updateAccountsDisplay() {
    const grid = $('#accounts-grid');
    
    if (accounts.length === 0) {
        grid.html(`
            <div class="empty-state">
                <div class="empty-icon">💳</div>
                <h3>No Accounts Added</h3>
                <p>Add your first account to start tracking transactions</p>
                <button class="btn btn-primary" onclick="showAccountForm()">Add Your First Account</button>
            </div>
        `);
        return;
    }
    
    const accountsHtml = accounts.map(account => `
        <div class="account-card" style="border-left-color: ${account.color}">
            <div class="account-header">
                <div class="account-info">
                    <div class="account-icon" style="background-color: ${account.color}20">
                        <i class="fas fa-credit-card" style="color: ${account.color}"></i>
                    </div>
                    <div class="account-details">
                        <h4>${account.name}</h4>
                        <p>${account.bank}</p>
                        <p>${account.type}</p>
                    </div>
                </div>
                <div class="account-actions">
                    <button onclick="showAccountForm(${JSON.stringify(account).replace(/"/g, '&quot;')})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteAccount('${account.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="account-balance" style="color: ${account.color}">
                ${formatCurrency(account.balance)}
            </div>
        </div>
    `).join('');
    
    grid.html(accountsHtml);
}

// Transaction Management
function showTransactionForm() {
    if (accounts.length === 0) {
        alert('Please add at least one account before creating transactions.');
        switchTab('accounts');
        return;
    }
    
    updateAccountSelects();
    updateCategorySelect();
    $('#transaction-form').show();
}

function hideTransactionForm() {
    $('#transaction-form').hide();
    $('#transaction-form-element')[0].reset();
    $('#transaction-date').val(new Date().toISOString().split('T')[0]);
}

function updateAccountSelects() {
    const accountOptions = accounts.map(account => 
        `<option value="${account.id}">${account.bank} (${formatCurrency(account.balance)})</option>`
    ).join('');
    
    $('#from-account').html('<option value="">Select account</option>' + accountOptions);
    $('#to-account').html('<option value="">Select destination account</option>' + accountOptions);
}

function updateCategorySelect() {
    const type = $('#transaction-type').val();
    const categorySelect = $('#transaction-category');
    
    if (type === 'transfer') {
        $('#category-group').hide();
        categorySelect.removeAttr('required');
    } else {
        $('#category-group').show();
        categorySelect.attr('required', true);
        
        const categoryOptions = categories[type].map(cat => 
            `<option value="${cat.name}">${cat.icon} ${cat.name}</option>`
        ).join('');
        
        categorySelect.html('<option value="">Select a category</option>' + categoryOptions);
    }
}

function handleTransactionTypeChange() {
    const type = $('#transaction-type').val();
    
    updateCategorySelect();
    
    if (type === 'transfer') {
        $('#from-account-label').text('From Account');
        $('#to-account-group').show();
        $('#to-account').attr('required', true);
    } else {
        $('#from-account-label').text('Account');
        $('#to-account-group').hide();
        $('#to-account').removeAttr('required');
    }
    
    // Update to-account options when from-account changes
    $('#from-account').off('change').on('change', function() {
        if (type === 'transfer') {
            const fromAccountId = $(this).val();
            const toAccountOptions = accounts
                .filter(account => account.id !== fromAccountId)
                .map(account => `<option value="${account.id}">${account.bank} (${formatCurrency(account.balance)})</option>`)
                .join('');
            $('#to-account').html('<option value="">Select destination account</option>' + toAccountOptions);
        }
    });
}

function handleTransactionSubmit(e) {
    e.preventDefault();
    
    const transactionData = {
        type: $('#transaction-type').val(),
        category: $('#transaction-category').val() || 'Transfer',
        amount: parseFloat($('#transaction-amount').val()),
        description: $('#transaction-description').val(),
        remarks: $('#transaction-remarks').val(),
        date: new Date($('#transaction-date').val()),
        accountId: $('#from-account').val(),
        toAccountId: $('#to-account').val() || null
    };
    
    const newTransaction = {
        ...transactionData,
        id: generateId(),
        createdAt: new Date()
    };
    
    // Update account balances
    updateAccountBalances(newTransaction);
    
    transactions.push(newTransaction);
    saveData();
    updateTransactionsDisplay();
    updateDashboard();
    updateAnalytics();
    hideTransactionForm();
}

function updateAccountBalances(transaction) {
    const fromAccount = accounts.find(a => a.id === transaction.accountId);
    
    if (transaction.type === 'income') {
        fromAccount.balance += transaction.amount;
    } else if (transaction.type === 'expense') {
        fromAccount.balance -= transaction.amount;
    } else if (transaction.type === 'transfer') {
        const toAccount = accounts.find(a => a.id === transaction.toAccountId);
        fromAccount.balance -= transaction.amount;
        toAccount.balance += transaction.amount;
    }
}

function deleteTransaction(transactionId) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        const transaction = transactions.find(t => t.id === transactionId);
        
        // Reverse account balance changes
        const fromAccount = accounts.find(a => a.id === transaction.accountId);
        
        if (transaction.type === 'income') {
            fromAccount.balance -= transaction.amount;
        } else if (transaction.type === 'expense') {
            fromAccount.balance += transaction.amount;
        } else if (transaction.type === 'transfer') {
            const toAccount = accounts.find(a => a.id === transaction.toAccountId);
            fromAccount.balance += transaction.amount;
            toAccount.balance -= transaction.amount;
        }
        
        transactions = transactions.filter(t => t.id !== transactionId);
        saveData();
        updateTransactionsDisplay();
        updateDashboard();
        updateAnalytics();
    }
}

function updateTransactionsDisplay() {
    if (accounts.length === 0) {
        $('#no-accounts-message').show();
        $('#transaction-section').hide();
        return;
    }
    
    $('#no-accounts-message').hide();
    $('#transaction-section').show();
    
    const filteredTransactions = applyFilters();
    const transactionList = $('#transaction-list');
    
    $('#transaction-count').text(`Transaction History (${filteredTransactions.length})`);
    
    if (filteredTransactions.length === 0) {
        transactionList.html(`
            <div class="empty-state">
                <div class="empty-icon">📊</div>
                <h3>No Transactions Found</h3>
                <p>Transactions matching your filters will appear here</p>
            </div>
        `);
        return;
    }
    
    const accountMap = accounts.reduce((acc, account) => {
        acc[account.id] = account;
        return acc;
    }, {});
    
    const transactionsHtml = filteredTransactions.map(transaction => {
        const account = accountMap[transaction.accountId];
        const toAccount = transaction.toAccountId ? accountMap[transaction.toAccountId] : null;
        const category = categories[transaction.type]?.find(c => c.name === transaction.category);
        
        let icon, iconColor, amountColor, amountPrefix;
        
        if (transaction.type === 'income') {
            icon = 'fa-arrow-up';
            iconColor = '#059669';
            amountColor = 'text-green';
            amountPrefix = '+';
        } else if (transaction.type === 'expense') {
            icon = 'fa-arrow-down';
            iconColor = '#dc2626';
            amountColor = 'text-red';
            amountPrefix = '-';
        } else {
            icon = 'fa-exchange-alt';
            iconColor = '#2563eb';
            amountColor = 'text-blue';
            amountPrefix = '';
        }
        
        return `
            <div class="transaction-item">
                <div class="transaction-left">
                    <div class="transaction-icon" style="background-color: ${iconColor}20; color: ${iconColor}">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="transaction-details">
                        <h4>${transaction.description} ${category ? category.icon : ''}</h4>
                        <div class="transaction-meta">
                            ${formatDate(transaction.date)} • 
                            ${transaction.type === 'transfer' 
                                ? `${account?.bank} → ${toAccount?.bank}`
                                : `${transaction.category} • ${account?.bank} • ${transaction.remarks}`
                            }
                        </div>
                    </div>
                </div>
                <div class="transaction-right">
                    <div class="transaction-amount ${amountColor}">
                        ${amountPrefix}${formatCurrency(transaction.amount)}
                    </div>
                    <div class="transaction-actions">
                        <button onclick="deleteTransaction('${transaction.id}')" title="Delete transaction">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    transactionList.html(transactionsHtml);
}

// Filtering
function handleDateFilter() {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    
    const filter = $(this).data('filter');
    currentFilters.dateFilter = filter;
    
    if (filter === 'custom') {
        $('#custom-date-range').show();
    } else {
        $('#custom-date-range').hide();
    }
    
    updateTransactionsDisplay();
    updateFilterStatus();
}

function handleTypeFilter() {
    $(this).toggleClass('active');
    
    const activeTypes = $('.type-filter.active').map(function() {
        return $(this).data('type');
    }).get();
    
    currentFilters.transactionTypes = activeTypes;
    updateTransactionsDisplay();
    updateFilterStatus();
}

function clearFilters() {
    currentFilters = {
        dateFilter: 'all',
        accountIds: [],
        categories: [],
        transactionTypes: ['income', 'expense', 'transfer']
    };
    
    $('.filter-btn').removeClass('active');
    $('.filter-btn[data-filter="all"]').addClass('active');
    $('.type-filter').addClass('active');
    $('#custom-date-range').hide();
    $('#custom-start-date, #custom-end-date').val('');
    
    updateTransactionsDisplay();
    updateFilterStatus();
}

function updateFilterStatus() {
    const hasActiveFilters = currentFilters.dateFilter !== 'all' || 
        currentFilters.transactionTypes.length < 3;
    
    if (hasActiveFilters) {
        $('#clear-filters').show();
    } else {
        $('#clear-filters').hide();
    }
}

function applyFilters() {
    let filtered = [...transactions];
    
    // Date filter
    if (currentFilters.dateFilter !== 'all') {
        const now = new Date();
        let startDate;
        
        switch (currentFilters.dateFilter) {
            case '1week':
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case '1month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case '1year':
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            case 'custom':
                const customStart = $('#custom-start-date').val();
                const customEnd = $('#custom-end-date').val();
                if (customStart) startDate = new Date(customStart);
                if (customEnd) {
                    const endDate = new Date(customEnd);
                    filtered = filtered.filter(t => new Date(t.date) <= endDate);
                }
                break;
        }
        
        if (startDate) {
            filtered = filtered.filter(t => new Date(t.date) >= startDate);
        }
    }
    
    // Transaction type filter
    if (currentFilters.transactionTypes.length < 3) {
        filtered = filtered.filter(t => currentFilters.transactionTypes.includes(t.type));
    }
    
    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Dashboard
function updateDashboard() {
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
    $('#total-balance').text(formatCurrency(totalBalance));
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const monthlyTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });
    
    const monthlyIncome = monthlyTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const monthlyExpenses = monthlyTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const monthlyTransfers = monthlyTransactions
        .filter(t => t.type === 'transfer')
        .reduce((sum, t) => sum + t.amount, 0);
    
    $('#monthly-income').text(formatCurrency(monthlyIncome));
    $('#monthly-expenses').text(formatCurrency(monthlyExpenses));
    $('#monthly-transfers').text(formatCurrency(monthlyTransfers));
    
    // Recent transactions
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    const recentHtml = recentTransactions.length > 0 
        ? recentTransactions.map(transaction => {
            const account = accounts.find(a => a.id === transaction.accountId);
            const amountColor = transaction.type === 'income' ? 'text-green' : 
                               transaction.type === 'expense' ? 'text-red' : 'text-blue';
            const amountPrefix = transaction.type === 'expense' ? '-' : '+';
            
            return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background-color: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                    <div>
                        <p style="font-weight: 500; font-size: 14px; color: #1f2937; margin-bottom: 4px;">${transaction.description}</p>
                        <p style="font-size: 12px; color: #6b7280;">${formatDate(transaction.date)} • ${account?.name}</p>
                    </div>
                    <div class="${amountColor}" style="font-weight: 600;">
                        ${amountPrefix}${formatCurrency(transaction.amount)}
                    </div>
                </div>
            `;
        }).join('')
        : '<p class="empty-state">No recent transactions</p>';
    
    $('#recent-transactions').html(recentHtml);
    
    // Account balances
    const accountsHtml = accounts.length > 0
        ? accounts.map(account => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background-color: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 16px; height: 16px; border-radius: 50%; background-color: ${account.color};"></div>
                    <div>
                        <p style="font-weight: 500; font-size: 14px; color: #1f2937; margin-bottom: 4px;">${account.name}</p>
                        <p style="font-size: 12px; color: #6b7280; text-transform: capitalize;">${account.type}</p>
                    </div>
                </div>
                <div style="font-weight: 600; color: #1f2937;">
                    ${formatCurrency(account.balance)}
                </div>
            </div>
        `).join('')
        : '<p class="empty-state">No accounts added yet</p>';
    
    $('#account-balances').html(accountsHtml);
}

// Analytics
function updateAnalytics() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const netIncome = totalIncome - totalExpenses;
    
    $('#total-income').text(formatCurrency(totalIncome));
    $('#total-expenses').text(formatCurrency(totalExpenses));
    $('#net-income').text(formatCurrency(netIncome)).removeClass('text-green text-red')
        .addClass(netIncome >= 0 ? 'text-green' : 'text-red');
    
    if (transactions.length === 0) {
        $('#no-analytics-data').show();
        $('.charts-grid').hide();
        return;
    }
    
    $('#no-analytics-data').hide();
    $('.charts-grid').show();
    
    // Create charts
    createMonthlyChart();
    createExpensePieChart();
}

function createMonthlyChart() {
    const ctx = document.getElementById('monthly-chart').getContext('2d');
    
    // Get last 6 months data
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(date);
    }
    
    const monthlyData = months.map(month => {
        const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
        const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
        
        const monthTransactions = transactions.filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate >= monthStart && transactionDate <= monthEnd;
        });
        
        const income = monthTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const expenses = monthTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        
        return {
            month: month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            income,
            expenses
        };
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: monthlyData.map(d => d.month),
            datasets: [
                {
                    label: 'Income',
                    data: monthlyData.map(d => d.income),
                    backgroundColor: 'rgba(5, 150, 105, 0.8)',
                    borderColor: 'rgba(5, 150, 105, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Expenses',
                    data: monthlyData.map(d => d.expenses),
                    backgroundColor: 'rgba(220, 38, 38, 0.8)',
                    borderColor: 'rgba(220, 38, 38, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

function createExpensePieChart() {
    const ctx = document.getElementById('expense-pie-chart').getContext('2d');
    
    const expenseCategories = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, transaction) => {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
            return acc;
        }, {});
    
    const labels = Object.keys(expenseCategories);
    const data = Object.values(expenseCategories);
    
    if (labels.length === 0) {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#6b7280';
        ctx.textAlign = 'center';
        ctx.fillText('No expense data available', ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7C2D12',
                    '#A16207', '#B45309', '#D97706', '#F59E0B', '#EC4899',
                    '#8B5CF6', '#6B7280', '#374151', '#1F2937', '#111827'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// Settings
function updateSettings() {
    $('#total-transactions-count').text(transactions.length);
    $('#total-accounts-count').text(accounts.length);
    $('#income-transactions-count').text(transactions.filter(t => t.type === 'income').length);
    $('#expense-transactions-count').text(transactions.filter(t => t.type === 'expense').length);
    $('#transfer-transactions-count').text(transactions.filter(t => t.type === 'transfer').length);
    
    // Disable export button if no transactions
    $('#export-data-btn').prop('disabled', transactions.length === 0);
}

function exportData() {
    if (transactions.length === 0) {
        alert('No transactions to export.');
        return;
    }
    
    const accountMap = accounts.reduce((acc, account) => {
        acc[account.id] = account.name;
        return acc;
    }, {});
    
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount', 'Account', 'To Account'];
    
    const csvContent = [
        headers.join(','),
        ...transactions.map(transaction => [
            formatDate(transaction.date),
            transaction.type,
            transaction.category,
            `"${transaction.description}"`,
            transaction.amount.toString(),
            accountMap[transaction.accountId] || 'Unknown',
            transaction.toAccountId ? accountMap[transaction.toAccountId] : ''
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearAllData() {
    accounts = [];
    transactions = [];
    saveData();
    
    updateDashboard();
    updateAccountsDisplay();
    updateTransactionsDisplay();
    updateAnalytics();
    updateSettings();
    
    $('#confirmation-modal').hide();
    alert('All data has been cleared successfully.');
}