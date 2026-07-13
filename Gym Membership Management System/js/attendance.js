// ============================================
// FITZONE GYM - ATTENDANCE JAVASCRIPT
// ============================================

// Generate attendance data
function generateAttendanceData() {
    const workoutTypes = ['Strength Training', 'Cardio', 'Yoga', 'HIIT', 'CrossFit', 'Swimming', 'Spinning', 'Pilates'];
    const attendance = [];
    
    for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        if (Math.random() > 0.3) { // 70% chance of attendance
            const checkInHour = 6 + Math.floor(Math.random() * 12);
            const checkInMinute = Math.floor(Math.random() * 60);
            const duration = 30 + Math.floor(Math.random() * 90);
            
            const checkIn = new Date(date);
            checkIn.setHours(checkInHour, checkInMinute);
            
            const checkOut = new Date(checkIn);
            checkOut.setMinutes(checkOut.getMinutes() + duration);
            
            attendance.push({
                date: date.toISOString().split('T')[0],
                checkIn: checkIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                checkOut: checkOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                duration: `${duration} min`,
                workoutType: workoutTypes[Math.floor(Math.random() * workoutTypes.length)],
                status: 'Completed'
            });
        }
    }
    
    return attendance;
}

// Initialize attendance
let attendanceData = generateAttendanceData();

// Load attendance on page load
document.addEventListener('DOMContentLoaded', function() {
    loadAttendanceTable();
    updateStats();
    initAttendanceChart();
});

// Load attendance table
function loadAttendanceTable() {
    const tbody = document.getElementById('attendanceTable');
    let html = '';
    
    attendanceData.forEach(record => {
        html += `
            <tr>
                <td>${record.date}</td>
                <td>${record.checkIn}</td>
                <td>${record.checkOut}</td>
                <td>${record.duration}</td>
                <td>${record.workoutType}</td>
                <td><span class="status-badge active">${record.status}</span></td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Update statistics
function updateStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayCheckins = attendanceData.filter(a => a.date === today).length;
    const weekCheckins = attendanceData.filter(a => {
        const recordDate = new Date(a.date);
        const now = new Date();
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return recordDate >= weekAgo;
    }).length;
    
    const attendanceRate = Math.round((attendanceData.length / 30) * 100);
    const streak = calculateStreak();
    
    animateCounter(document.getElementById('todayCheckins'), todayCheckins);
    animateCounter(document.getElementById('weekCheckins'), weekCheckins);
    document.getElementById('yourAttendance').textContent = attendanceRate + '%';
    animateCounter(document.getElementById('currentStreak'), streak);
}

// Calculate current streak
function calculateStreak() {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        
        if (attendanceData.some(a => a.date === dateStr)) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

// Check in function
function checkIn() {
    const memberInput = document.querySelector('.card input');
    const memberId = memberInput.value;
    
    if (memberId) {
        const now = new Date();
        const newRecord = {
            date: now.toISOString().split('T')[0],
            checkIn: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            checkOut: '-',
            duration: '-',
            workoutType: 'General',
            status: 'Active'
        };
        
        attendanceData.unshift(newRecord);
        loadAttendanceTable();
        updateStats();
        memberInput.value = '';
        showNotification('Check-in successful!', 'success');
    } else {
        showNotification('Please enter your member ID', 'error');
    }
}

// Filter attendance by month
function filterAttendance() {
    const month = document.getElementById('monthFilter').value;
    
    if (month) {
        const filtered = attendanceData.filter(a => {
            const date = new Date(a.date);
            return date.getMonth() + 1 === parseInt(month);
        });
        loadFilteredAttendance(filtered);
    } else {
        loadAttendanceTable();
    }
}

// Load filtered attendance
function loadFilteredAttendance(data) {
    const tbody = document.getElementById('attendanceTable');
    let html = '';
    
    data.forEach(record => {
        html += `
            <tr>
                <td>${record.date}</td>
                <td>${record.checkIn}</td>
                <td>${record.checkOut}</td>
                <td>${record.duration}</td>
                <td>${record.workoutType}</td>
                <td><span class="status-badge active">${record.status}</span></td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Initialize attendance chart
function initAttendanceChart() {
    const canvas = document.getElementById('attendanceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate weekly attendance
    const weeklyData = [0, 0, 0, 0, 0, 0, 0];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    attendanceData.forEach(record => {
        const date = new Date(record.date);
        weeklyData[date.getDay()]++;
    });
    
    // Chart dimensions
    const chartWidth = canvas.width - 60;
    const chartHeight = canvas.height - 40;
    const startX = 40;
    const startY = canvas.height - 20;
    const barWidth = 30;
    const gap = (chartWidth - (barWidth * 7)) / 8;
    const maxValue = Math.max(...weeklyData, 5);
    
    // Draw bars
    weeklyData.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
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
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(days[index], x + barWidth / 2, startY + 15);
        
        // Draw value
        ctx.fillStyle = '#f8f9fa';
        ctx.fillText(value, x + barWidth / 2, y - 5);
    });
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(startX, 10);
    ctx.lineTo(startX, startY);
    ctx.lineTo(canvas.width - 20, startY);
    ctx.stroke();
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

// Add progress bar styles
const style = document.createElement('style');
style.textContent = `
    .progress-bar {
        height: 10px;
        background: var(--border-color);
        border-radius: 5px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: var(--gradient);
        border-radius: 5px;
        transition: width 0.5s ease;
    }
`;
document.head.appendChild(style);
