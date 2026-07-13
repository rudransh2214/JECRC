// ============================================
// FITZONE GYM - MEMBERS JAVASCRIPT
// ============================================

// Generate 100 realistic dummy members
function generateMembers() {
    const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Dorothy', 'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna', 'Kenneth', 'Michelle', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy', 'Nicholas', 'Shirley', 'Eric', 'Angela', 'Jonathan', 'Helen', 'Stephen', 'Anna', 'Larry', 'Brenda', 'Justin', 'Pamela', 'Scott', 'Nicole', 'Brandon', 'Emma', 'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Gregory', 'Christine', 'Frank', 'Debra', 'Alexander', 'Rachel', 'Raymond', 'Carolyn', 'Patrick', 'Janet', 'Jack', 'Catherine', 'Dennis', 'Maria', 'Jerry', 'Heather'];
    
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];
    
    const plans = ['Basic', 'Standard', 'Premium', 'Elite'];
    const statuses = ['active', 'active', 'active', 'active', 'active', 'inactive', 'pending'];
    
    const members = [];
    
    for (let i = 1; i <= 100; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const plan = plans[Math.floor(Math.random() * plans.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Generate random join date within last 2 years
        const joinDate = new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        
        members.push({
            id: i,
            firstName: firstName,
            lastName: lastName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@gmail.com`,
            phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
            plan: plan,
            joinDate: joinDate.toISOString().split('T')[0],
            status: status
        });
    }
    
    return members;
}

// Initialize members
let members = generateMembers();
let currentPage = 1;
const itemsPerPage = 10;
let editingMemberId = null;

// Load members on page load
document.addEventListener('DOMContentLoaded', function() {
    loadMembers();
    updateStats();
});

// Load members table
function loadMembers() {
    const tableBody = document.getElementById('membersTableBody');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedMembers = members.slice(start, end);
    
    let html = '';
    
    paginatedMembers.forEach(member => {
        const statusClass = member.status;
        html += `
            <tr>
                <td>#${member.id}</td>
                <td>${member.firstName} ${member.lastName}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>${member.plan}</td>
                <td>${member.joinDate}</td>
                <td><span class="status-badge ${statusClass}">${member.status.charAt(0).toUpperCase() + member.status.slice(1)}</span></td>
                <td>
                    <button class="action-btn edit" onclick="editMember(${member.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteMember(${member.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
    renderPagination();
}

// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(members.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    
    let html = '<div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">';
    
    html += `<button class="btn btn-outline" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<button class="btn ${i === currentPage ? 'btn-primary' : 'btn-outline'}" onclick="changePage(${i})">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span>...</span>';
        }
    }
    
    html += `<button class="btn btn-outline" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
    html += '</div>';
    
    pagination.innerHTML = html;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(members.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        loadMembers();
    }
}

// Update statistics
function updateStats() {
    const total = members.length;
    const active = members.filter(m => m.status === 'active').length;
    const newThisMonth = members.filter(m => {
        const joinDate = new Date(m.joinDate);
        const now = new Date();
        return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
    }).length;
    
    // Animate counters
    animateCounter(document.getElementById('totalMembers'), total);
    animateCounter(document.getElementById('activeMembers'), active);
    animateCounter(document.getElementById('newMembers'), newThisMonth);
    document.getElementById('expiringMembers').textContent = Math.floor(Math.random() * 20) + 5;
}

// Search members
function searchMembers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = members.filter(member => 
        member.firstName.toLowerCase().includes(searchTerm) ||
        member.lastName.toLowerCase().includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm) ||
        member.phone.includes(searchTerm)
    );
    
    members = filtered;
    currentPage = 1;
    loadMembers();
}

// Filter members by status
function filterMembers() {
    const status = document.getElementById('filterStatus').value;
    const allMembers = generateMembers();
    
    if (status) {
        members = allMembers.filter(m => m.status === status);
    } else {
        members = allMembers;
    }
    
    currentPage = 1;
    loadMembers();
}

// Open add member modal
function openAddMemberModal() {
    editingMemberId = null;
    document.getElementById('modalTitle').textContent = 'Add New Member';
    document.getElementById('memberForm').reset();
    document.getElementById('memberModal').classList.add('active');
}

// Edit member
function editMember(id) {
    const member = members.find(m => m.id === id);
    if (member) {
        editingMemberId = id;
        document.getElementById('modalTitle').textContent = 'Edit Member';
        document.getElementById('memberFirstName').value = member.firstName;
        document.getElementById('memberLastName').value = member.lastName;
        document.getElementById('memberEmail').value = member.email;
        document.getElementById('memberPhone').value = member.phone;
        document.getElementById('memberPlan').value = member.plan;
        document.getElementById('memberStatus').value = member.status;
        document.getElementById('memberModal').classList.add('active');
    }
}

// Close member modal
function closeMemberModal() {
    document.getElementById('memberModal').classList.remove('active');
    editingMemberId = null;
}

// Save member
function saveMember(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('memberFirstName').value;
    const lastName = document.getElementById('memberLastName').value;
    const email = document.getElementById('memberEmail').value;
    const phone = document.getElementById('memberPhone').value;
    const plan = document.getElementById('memberPlan').value;
    const status = document.getElementById('memberStatus').value;
    
    if (editingMemberId) {
        // Update existing member
        const index = members.findIndex(m => m.id === editingMemberId);
        if (index !== -1) {
            members[index] = {
                ...members[index],
                firstName,
                lastName,
                email,
                phone,
                plan,
                status
            };
            showNotification('Member updated successfully!', 'success');
        }
    } else {
        // Add new member
        const newMember = {
            id: members.length + 1,
            firstName,
            lastName,
            email,
            phone,
            plan,
            joinDate: new Date().toISOString().split('T')[0],
            status
        };
        members.unshift(newMember);
        showNotification('Member added successfully!', 'success');
    }
    
    closeMemberModal();
    loadMembers();
    updateStats();
}

// Delete member
function deleteMember(id) {
    if (confirm('Are you sure you want to delete this member?')) {
        members = members.filter(m => m.id !== id);
        loadMembers();
        updateStats();
        showNotification('Member deleted successfully!', 'success');
    }
}

// Counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 30);
}

// Reset search when input is cleared
document.getElementById('searchInput').addEventListener('input', function() {
    if (this.value === '') {
        members = generateMembers();
        currentPage = 1;
        loadMembers();
    }
});
