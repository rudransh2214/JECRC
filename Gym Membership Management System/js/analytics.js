// ============================================
// FITZONE GYM - ANALYTICS JAVASCRIPT
// ============================================

// Class popularity data
const classPopularityData = [
    { name: 'HIIT Training', sessions: 245, avgAttendance: 14, capacityUsage: 93, trend: 'up' },
    { name: 'Yoga', sessions: 320, avgAttendance: 18, capacityUsage: 90, trend: 'up' },
    { name: 'Strength Training', sessions: 280, avgAttendance: 10, capacityUsage: 83, trend: 'stable' },
    { name: 'Spin Class', sessions: 195, avgAttendance: 22, capacityUsage: 88, trend: 'up' },
    { name: 'CrossFit', sessions: 165, avgAttendance: 13, capacityUsage: 87, trend: 'stable' },
    { name: 'Pilates', sessions: 140, avgAttendance: 15, capacityUsage: 83, trend: 'down' },
    { name: 'Zumba', sessions: 120, avgAttendance: 25, capacityUsage: 83, trend: 'up' },
    { name: 'Boxing', sessions: 110, avgAttendance: 10, capacityUsage: 83, trend: 'stable' }
];

// Load class popularity
function loadClassPopularity() {
    const tbody = document.getElementById('classPopularity');
    let html = '';
    
    classPopularityData.forEach(cls => {
        const trendIcon = cls.trend === 'up' ? 'fa-arrow-up' : cls.trend === 'down' ? 'fa-arrow-down' : 'fa-minus';
        const trendColor = cls.trend === 'up' ? '#2ecc71' : cls.trend === 'down' ? '#e74c3c' : '#f39c12';
        
        html += `
            <tr>
                <td>${cls.name}</td>
                <td>${cls.sessions}</td>
                <td>${cls.avgAttendance}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div class="progress-bar" style="width: 100px; height: 8px;">
                            <div class="progress-fill" style="width: ${cls.capacityUsage}%;"></div>
                        </div>
                        <span>${cls.capacityUsage}%</span>
                    </div>
                </td>
                <td><i class="fas ${trendIcon}" style="color: ${trendColor};"></i></td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Update analytics stats
function updateAnalyticsStats() {
    animateCounter(document.getElementById('totalRevenue'), 124500);
    animateCounter(document.getElementById('newMembers'), 156);
    document.getElementById('retentionRate').textContent = '87%';
    document.getElementById('avgRevenue').textContent = '$68';
}

// Initialize revenue chart
function initRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2D');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const revenueData = [95000, 102000, 98000, 115000, 108000, 124500];
    const labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const chartWidth = canvas.width - 80;
    const chartHeight = canvas.height - 60;
    const startX = 60;
    const startY = canvas.height - 30;
    const maxValue = Math.max(...revenueData) + 10000;
    const minValue = Math.min(...revenueData) - 10000;
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = startY - (i * chartHeight / 5);
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(startX + chartWidth, y);
        ctx.stroke();
    }
    
    // Draw line
    ctx.strokeStyle = '#e63946';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    revenueData.forEach((revenue, index) => {
        const x = startX + (index * chartWidth / (revenueData.length - 1));
        const y = startY - ((revenue - minValue) / (maxValue - minValue) * chartHeight);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw area under line
    ctx.lineTo(startX + chartWidth, startY);
    ctx.lineTo(startX, startY);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(230, 57, 70, 0.3)');
    gradient.addColorStop(1, 'rgba(230, 57, 70, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw points
    revenueData.forEach((revenue, index) => {
        const x = startX + (index * chartWidth / (revenueData.length - 1));
        const y = startY - ((revenue - minValue) / (maxValue - minValue) * chartHeight);
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#e63946';
        ctx.fill();
        
        // Draw label
        ctx.fillStyle = '#f8f9fa';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('$' + (revenue / 1000) + 'k', x, y - 10);
        ctx.fillText(labels[index], x, startY + 15);
    });
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, 20);
    ctx.lineTo(startX, startY);
    ctx.lineTo(startX + chartWidth, startY);
    ctx.stroke();
}

// Initialize membership chart
function initMembershipChart() {
    const canvas = document.getElementById('membershipChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2D');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const membershipData = [
        { label: 'Basic', value: 25, color: '#3498db' },
        { label: 'Standard', value: 35, color: '#2ecc71' },
        { label: 'Premium', value: 28, color: '#e63946' },
        { label: 'Elite', value: 12, color: '#f39c12' }
    ];
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    let startAngle = -Math.PI / 2;
    
    membershipData.forEach((item, index) => {
        const sliceAngle = (item.value / 100) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        
        // Draw legend
        const legendY = 30 + index * 25;
        ctx.fillStyle = item.color;
        ctx.fillRect(20, legendY, 15, 15);
        ctx.fillStyle = '#f8f9fa';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`${item.label}: ${item.value}%`, 45, legendY + 12);
        
        startAngle = endAngle;
    });
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(15, 15, 15, 0.9)';
    ctx.fill();
    
    ctx.fillStyle = '#f8f9fa';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Plans', centerX, centerY + 5);
}

// Initialize attendance chart
function initAttendanceChart() {
    const canvas = document.getElementById('attendanceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2D');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const attendanceData = [65, 72, 58, 80, 75, 85, 70];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    const chartWidth = canvas.width - 60;
    const chartHeight = canvas.height - 40;
    const startX = 40;
    const startY = canvas.height - 20;
    const barWidth = 30;
    const gap = (chartWidth - (barWidth * 7)) / 8;
    const maxValue = Math.max(...attendanceData);
    
    attendanceData.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = startX + gap + (index * (barWidth + gap));
        const y = startY - barHeight;
        
        const gradient = ctx.createLinearGradient(x, y, x, startY);
        gradient.addColorStop(0, '#e63946');
        gradient.addColorStop(1, '#c1121f');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 5);
        ctx.fill();
        
        ctx.fillStyle = '#f8f9fa';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(days[index], x + barWidth / 2, startY + 15);
        ctx.fillText(value + '%', x + barWidth / 2, y - 5);
    });
}

// Select time period
function selectPeriod(period) {
    // Update button styles
    document.querySelectorAll('.card .btn').forEach(btn => {
        if (btn.textContent.toLowerCase().includes(period)) {
            btn.classList.remove('btn-outline');
            btn.classList.add('btn-primary');
        } else if (btn.textContent.toLowerCase().includes('week') || 
                   btn.textContent.toLowerCase().includes('month') ||
                   btn.textContent.toLowerCase().includes('quarter') ||
                   btn.textContent.toLowerCase().includes('year')) {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
        }
    });
    
    // Update charts with new data (simulated)
    showNotification(`Showing data for ${period}`, 'success');
    initRevenueChart();
    initAttendanceChart();
}

// Counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = '$' + target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = '$' + Math.floor(current).toLocaleString();
        }
    }, 30);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadClassPopularity();
    updateAnalyticsStats();
    initRevenueChart();
    initMembershipChart();
    initAttendanceChart();
});
