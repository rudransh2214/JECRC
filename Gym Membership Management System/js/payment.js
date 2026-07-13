// ============================================
// FITZONE GYM - PAYMENT JAVASCRIPT
// ============================================

// Payment methods data
const paymentMethods = [
    { type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { type: 'Mastercard', last4: '5555', expiry: '08/24', isDefault: false }
];

// Payment history data
const paymentHistoryData = [
    { date: '2024-01-15', description: 'Premium Membership', amount: '$79.00', method: 'Visa ****4242', status: 'Paid' },
    { date: '2023-12-15', description: 'Premium Membership', amount: '$79.00', method: 'Visa ****4242', status: 'Paid' },
    { date: '2023-11-15', description: 'Standard Membership', amount: '$49.00', method: 'Mastercard ****5555', status: 'Paid' },
    { date: '2023-10-15', description: 'Standard Membership', amount: '$49.00', method: 'Visa ****4242', status: 'Paid' },
    { date: '2023-09-15', description: 'Basic Membership', amount: '$29.00', method: 'Mastercard ****5555', status: 'Paid' },
    { date: '2023-08-15', description: 'Basic Membership', amount: '$29.00', method: 'Visa ****4242', status: 'Paid' },
    { date: '2023-07-15', description: 'Basic Membership', amount: '$29.00', method: 'Visa ****4242', status: 'Paid' },
    { date: '2023-06-15', description: 'Basic Membership', amount: '$29.00', method: 'Mastercard ****5555', status: 'Paid' }
];

// Load payment methods
function loadPaymentMethods() {
    const container = document.getElementById('paymentMethods');
    let html = '';
    
    paymentMethods.forEach(method => {
        const icon = method.type === 'Visa' ? 'fab fa-cc-visa' : 'fab fa-cc-mastercard';
        const defaultBadge = method.isDefault ? '<span class="status-badge active">Default</span>' : '';
        
        html += `
            <div class="payment-card">
                <div class="payment-card-header">
                    <div class="card-icon-large">
                        <i class="${icon}"></i>
                    </div>
                    ${defaultBadge}
                </div>
                <div class="payment-card-details">
                    <h4>${method.type}</h4>
                    <p>**** **** **** ${method.last4}</p>
                    <p>Expires: ${method.expiry}</p>
                </div>
                <div class="payment-card-actions">
                    <button class="btn btn-outline btn-sm" onclick="setDefaultMethod('${method.last4}')">Set Default</button>
                    <button class="btn btn-outline btn-sm" onclick="removeMethod('${method.last4}')">Remove</button>
                </div>
            </div>
        `;
    });
    
    html += `
        <div class="payment-card add-card" onclick="openAddCardModal()">
            <div class="add-card-content">
                <i class="fas fa-plus-circle"></i>
                <h4>Add New Card</h4>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Load payment history
function loadPaymentHistory() {
    const tbody = document.getElementById('paymentHistory');
    let html = '';
    
    paymentHistoryData.forEach(payment => {
        const statusClass = payment.status === 'Paid' ? 'active' : 'inactive';
        html += `
            <tr>
                <td>${payment.date}</td>
                <td>${payment.description}</td>
                <td>${payment.amount}</td>
                <td>${payment.method}</td>
                <td><span class="status-badge ${statusClass}">${payment.status}</span></td>
                <td><button class="btn btn-outline btn-sm"><i class="fas fa-download"></i></button></td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Filter payments by year
function filterPayments() {
    const year = document.getElementById('yearFilter').value;
    
    if (year) {
        const filtered = paymentHistoryData.filter(p => p.date.startsWith(year));
        loadFilteredPayments(filtered);
    } else {
        loadPaymentHistory();
    }
}

// Load filtered payments
function loadFilteredPayments(data) {
    const tbody = document.getElementById('paymentHistory');
    let html = '';
    
    data.forEach(payment => {
        const statusClass = payment.status === 'Paid' ? 'active' : 'inactive';
        html += `
            <tr>
                <td>${payment.date}</td>
                <td>${payment.description}</td>
                <td>${payment.amount}</td>
                <td>${payment.method}</td>
                <td><span class="status-badge ${statusClass}">${payment.status}</span></td>
                <td><button class="btn btn-outline btn-sm"><i class="fas fa-download"></i></button></td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Open payment modal
function openPaymentModal() {
    document.getElementById('paymentModal').classList.add('active');
}

// Close payment modal
function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

// Process payment
function processPayment(event) {
    event.preventDefault();
    
    // Simulate payment processing
    closePaymentModal();
    
    // Show loading
    showNotification('Processing payment...', 'success');
    
    // Simulate delay
    setTimeout(() => {
        // Add new payment to history
        const newPayment = {
            date: new Date().toISOString().split('T')[0],
            description: 'Premium Membership',
            amount: '$79.00',
            method: 'Visa ****4242',
            status: 'Paid'
        };
        
        paymentHistoryData.unshift(newPayment);
        loadPaymentHistory();
        
        // Show success modal
        document.getElementById('successModal').classList.add('active');
    }, 2000);
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
}

// Set default payment method
function setDefaultMethod(last4) {
    paymentMethods.forEach(method => {
        method.isDefault = method.last4 === last4;
    });
    loadPaymentMethods();
    showNotification('Default payment method updated', 'success');
}

// Remove payment method
function removeMethod(last4) {
    if (confirm('Are you sure you want to remove this payment method?')) {
        const index = paymentMethods.findIndex(m => m.last4 === last4);
        if (index !== -1) {
            paymentMethods.splice(index, 1);
            loadPaymentMethods();
            showNotification('Payment method removed', 'success');
        }
    }
}

// Open add card modal (placeholder)
function openAddCardModal() {
    showNotification('Add card functionality would be implemented here', 'success');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadPaymentMethods();
    loadPaymentHistory();
});

// Add styles for payment cards
const style = document.createElement('style');
style.textContent = `
    .payment-methods {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;
        margin-bottom: 30px;
    }
    
    .payment-card {
        background: var(--glass-bg);
        border: 1px solid var(--border-color);
        border-radius: 15px;
        padding: 25px;
        backdrop-filter: blur(10px);
        transition: var(--transition);
    }
    
    .payment-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow);
    }
    
    .payment-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }
    
    .card-icon-large {
        width: 50px;
        height: 35px;
        background: var(--bg-light);
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: var(--text-dark);
    }
    
    .payment-card-details h4 {
        color: var(--text-light);
        margin-bottom: 10px;
    }
    
    .payment-card-details p {
        color: var(--text-gray);
        font-size: 14px;
        margin-bottom: 5px;
    }
    
    .payment-card-actions {
        display: flex;
        gap: 10px;
        margin-top: 15px;
    }
    
    .payment-card-actions .btn {
        flex: 1;
    }
    
    .add-card {
        cursor: pointer;
        border-style: dashed;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 150px;
    }
    
    .add-card:hover {
        border-color: var(--primary-color);
        background: rgba(230, 57, 70, 0.1);
    }
    
    .add-card-content {
        text-align: center;
    }
    
    .add-card-content i {
        font-size: 32px;
        color: var(--primary-color);
        margin-bottom: 10px;
    }
    
    .add-card-content h4 {
        color: var(--text-light);
    }
`;
document.head.appendChild(style);
