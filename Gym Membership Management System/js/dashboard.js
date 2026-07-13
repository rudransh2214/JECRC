// ============================================
// FITZONE GYM - DASHBOARD JAVASCRIPT
// ============================================

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadDashboardData();
    initCharts();
    loadActivities();
    loadClasses();
    loadNotifications();
});

// Check authentication
function checkAuth() {
    const userType = localStorage.getItem('userType');
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userType) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update user info in sidebar
    const userName = userEmail.split('@')[0];
    document.getElementById('userName').textContent = userName.charAt(0).toUpperCase() + userName.slice(1);
    document.getElementById('userType').textContent = userType.charAt(0).toUpperCase() + userType.slice(1);
    document.getElementById('userAvatar').textContent = userName.substring(0, 2).toUpperCase();
    
    // Update dashboard title based on user type
    if (userType === 'admin') {
        document.getElementById('dashboardTitle').textContent = 'Admin Dashboard';
    } else {
        document.getElementById('dashboardTitle').textContent = 'Member Dashboard';
    }
}

// Load dashboard data based on user type
function loadDashboardData() {
    const userType = localStorage.getItem('userType');
    const cardsContainer = document.getElementById('dashboardCards');
    
    let cardsHTML = '';
    
    if (userType === 'admin') {
        // Admin dashboard cards
        cardsHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Total Members</h3>
                    <div class="card-icon"><i class="fas fa-users"></i></div>
                </div>
                <div class="card-value" id="totalMembers">0</div>
                <div class="card-change positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>+12% from last month</span>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Active Plans</h3>
                    <div class="card-icon"><i class="fas fa-crown"></i></div>
                </div>
                <div class="card-value" id="activePlans">0</div>
                <div class="card-change positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>+8% from last month</span>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Revenue</h3>
                    <div class="card-icon"><i class="fas fa-dollar-sign"></i></div>
                </div>
                <div class="card-value" id="revenue">$0</div>
                <div class="card-change positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>+15% from last month</span>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Attendance Today</h3>
                    <div class="card-icon"><i class="fas fa-clipboard-check"></i></div>
                </div>
                <div class="card-value" id="attendance">0</div>
                <div class="card-change positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>+5% from yesterday</span>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Trainers</h3>
                    <div class="card-icon"><i class="fas fa-user-tie"></i></div>
                </div>
                <div class="card-value" id="trainers">0</div>
                <div class="card-change positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>+2 new this month</span>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Classes Today</h3>
                    <div class="card-icon"><i class="fas fa-calendar"></i></div>
                </div>
                <div class="card-value" id="classes">0</div>
                <div class="card-change positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>All classes running</span>
                </div>
            </div>
        `;
    } else {
        // Member dashboard cards
        cardsHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Membership Status</h3>
                    <div class="card-icon"><i class="fas fa-crown"></i></div>
                </div>
                <div class="card-value" id="membershipStatus">Active</div>
                <div class="card-change positive">
                    <i class="fas fa-check-circle"></i>
                    <span>Valid until Dec 2024</span>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Workouts This Week</h3>
                    <div class="card-icon"><i class="fas fa-dumbbell"></i></div>
                </div>
                <div class="card-value" id="workouts">0</div>
                <div class="card-change positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>+2 from last week</span>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Attendance Rate</h3>
                    <div class="card-icon"><i class="fas fa-chart-line"></i></div>
                </div>
                <div class="card-value" id="attendanceRate">0%</div>
                <div class="card-change positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>Excellent progress</span>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Calories Burned</h3>
                    <div class="card-icon"><i class="fas fa-fire"></i></div>
                </div>
                <div class="card-value" id="calories">0</div>
                <div class="card-change positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>This month</span>
                </div>
            </div>
        `;
    }
    
    cardsContainer.innerHTML = cardsHTML;
    
    // Animate counters
    if (userType === 'admin') {
        animateCounter(document.getElementById('totalMembers'), 5247);
        animateCounter(document.getElementById('activePlans'), 4892);
        document.getElementById('revenue').textContent = '$124,500';
        animateCounter(document.getElementById('attendance'), 342);
        animateCounter(document.getElementById('trainers'), 52);
        animateCounter(document.getElementById('classes'), 24);
    } else {
        document.getElementById('membershipStatus').textContent = 'Premium';
        animateCounter(document.getElementById('workouts'), 5);
        document.getElementById('attendanceRate').textContent = '85%';
        document.getElementById('calories').textContent = '12,450';
    }
}

// Counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
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

// Initialize Charts
function initCharts() {
    const canvas = document.getElementById('activityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const userType = localStorage.getItem('userType');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Chart data
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = userType === 'admin' ? [65, 78, 90, 85, 92, 88, 75] : [45, 60, 75, 55, 80, 70, 50];
    
    // Chart dimensions
    const chartWidth = canvas.width - 60;
    const chartHeight = canvas.height - 60;
    const startX = 50;
    const startY = canvas.height - 30;
    const barWidth = 40;
    const gap = (chartWidth - (barWidth * labels.length)) / (labels.length + 1);
    
    // Draw bars
    data.forEach((value, index) => {
        const barHeight = (value / 100) * chartHeight;
        const x = startX + gap + (index * (barWidth + gap));
        const y = startY - barHeight;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(x, y, x, startY);
        gradient.addColorStop(0, '#e63946');
        gradient.addColorStop(1, '#c1121f');
        
        // Draw bar
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 5);
        ctx.fill();
        
        // Draw label
        ctx.fillStyle = '#f8f9fa';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(labels[index], x + barWidth / 2, startY + 20);
        
        // Draw value
        ctx.fillStyle = '#f8f9fa';
        ctx.fillText(value + '%', x + barWidth / 2, y - 10);
    });
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(startX, 30);
    ctx.lineTo(startX, startY);
    ctx.lineTo(canvas.width - 30, startY);
    ctx.stroke();
}

// Load Activities
function loadActivities() {
    const activities = [
        { icon: 'fa-dumbbell', title: 'Workout Completed', desc: 'Upper body strength training', time: '2 hours ago' },
        { icon: 'fa-users', title: 'Class Attended', desc: 'Yoga session with Sarah', time: '5 hours ago' },
        { icon: 'fa-heartbeat', title: 'Goal Achieved', desc: 'Reached weekly workout target', time: '1 day ago' },
        { icon: 'fa-trophy', title: 'Badge Earned', desc: 'Consistency Champion', time: '2 days ago' },
        { icon: 'fa-calendar-check', title: 'Class Booked', desc: 'HIIT Training for tomorrow', time: '3 days ago' }
    ];
    
    const activityList = document.getElementById('activityList');
    let html = '';
    
    activities.forEach(activity => {
        html += `
            <li class="activity-item">
                <div class="activity-icon">
                    <i class="fas ${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.desc}</p>
                </div>
                <span class="activity-time">${activity.time}</span>
            </li>
        `;
    });
    
    activityList.innerHTML = html;
}

// Load Classes
function loadClasses() {
    const classes = [
        { name: 'Morning Yoga', trainer: 'Sarah Williams', time: '6:00 AM', duration: '1 hour', status: 'Available' },
        { name: 'HIIT Training', trainer: 'David Chen', time: '8:00 AM', duration: '45 min', status: 'Full' },
        { name: 'Strength Training', trainer: 'Mike Johnson', time: '10:00 AM', duration: '1 hour', status: 'Available' },
        { name: 'Spin Class', trainer: 'Emily Rodriguez', time: '12:00 PM', duration: '45 min', status: 'Available' },
        { name: 'Evening Yoga', trainer: 'Sarah Williams', time: '6:00 PM', duration: '1 hour', status: 'Available' }
    ];
    
    const tableBody = document.getElementById('classesTableBody');
    let html = '';
    
    classes.forEach(cls => {
        const statusClass = cls.status === 'Available' ? 'active' : 'inactive';
        html += `
            <tr>
                <td>${cls.name}</td>
                <td>${cls.trainer}</td>
                <td>${cls.time}</td>
                <td>${cls.duration}</td>
                <td><span class="status-badge ${statusClass}">${cls.status}</span></td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// Load Notifications
function loadNotifications() {
    const notifications = [
        { icon: 'fa-bell', title: 'Payment Reminder', desc: 'Your membership payment is due in 5 days', time: '1 hour ago' },
        { icon: 'fa-calendar', title: 'Class Reminder', desc: 'HIIT Training starts in 30 minutes', time: '2 hours ago' },
        { icon: 'fa-trophy', title: 'Achievement Unlocked', desc: 'You completed 20 workouts this month!', time: '1 day ago' }
    ];
    
    const notificationList = document.getElementById('notificationList');
    let html = '';
    
    notifications.forEach(notif => {
        html += `
            <li class="activity-item">
                <div class="activity-icon">
                    <i class="fas ${notif.icon}"></i>
                </div>
                <div class="activity-content">
                    <h4>${notif.title}</h4>
                    <p>${notif.desc}</p>
                </div>
                <span class="activity-time">${notif.time}</span>
            </li>
        `;
    });
    
    notificationList.innerHTML = html;
}

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Toggle Notifications
function toggleNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('active');
}

// Toggle Theme
function toggleTheme() {
    const icon = document.getElementById('themeIcon');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    document.body.classList.toggle('light-theme');
    
    // Save preference
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Logout
function logout() {
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Load saved theme
function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('themeIcon').classList.remove('fa-moon');
        document.getElementById('themeIcon').classList.add('fa-sun');
    }
}

loadTheme();

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const panel = document.getElementById('notificationPanel');
    if (e.target === panel) {
        panel.classList.remove('active');
    }
});

// Chart button interactions
document.querySelectorAll('.chart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        // Re-initialize chart with different data (placeholder)
        initCharts();
    });
});
