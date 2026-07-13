// ============================================
// FITZONE GYM - TRAINERS JAVASCRIPT
// ============================================

// Generate 20 realistic dummy trainers
function generateTrainers() {
    const trainerData = [
        { name: 'Mike Johnson', specialty: 'Strength Training', experience: 12, rating: 4.9, members: 45 },
        { name: 'Sarah Williams', specialty: 'Yoga & Pilates', experience: 8, rating: 4.8, members: 38 },
        { name: 'David Chen', specialty: 'CrossFit & HIIT', experience: 10, rating: 5.0, members: 52 },
        { name: 'Emily Rodriguez', specialty: 'Nutrition', experience: 6, rating: 4.7, members: 30 },
        { name: 'James Wilson', specialty: 'Strength Training', experience: 15, rating: 4.9, members: 48 },
        { name: 'Lisa Anderson', specialty: 'Cardio', experience: 7, rating: 4.6, members: 35 },
        { name: 'Robert Taylor', specialty: 'CrossFit & HIIT', experience: 9, rating: 4.8, members: 42 },
        { name: 'Jennifer Martinez', specialty: 'Yoga & Pilates', experience: 11, rating: 4.9, members: 40 },
        { name: 'Michael Brown', specialty: 'Strength Training', experience: 14, rating: 4.7, members: 46 },
        { name: 'Amanda Davis', specialty: 'Nutrition', experience: 5, rating: 4.8, members: 28 },
        { name: 'Christopher Lee', specialty: 'Cardio', experience: 8, rating: 4.5, members: 33 },
        { name: 'Jessica White', specialty: 'Yoga & Pilates', experience: 9, rating: 4.9, members: 39 },
        { name: 'Daniel Harris', specialty: 'CrossFit & HIIT', experience: 11, rating: 4.8, members: 50 },
        { name: 'Stephanie Clark', specialty: 'Strength Training', experience: 13, rating: 4.9, members: 44 },
        { name: 'Matthew Lewis', specialty: 'Cardio', experience: 6, rating: 4.6, members: 31 },
        { name: 'Michelle Robinson', specialty: 'Nutrition', experience: 7, rating: 4.7, members: 29 },
        { name: 'Andrew Walker', specialty: 'CrossFit & HIIT', experience: 10, rating: 4.9, members: 47 },
        { name: 'Ashley Young', specialty: 'Yoga & Pilates', experience: 8, rating: 4.8, members: 36 },
        { name: 'Joshua Allen', specialty: 'Strength Training', experience: 16, rating: 5.0, members: 55 },
        { name: 'Nicole King', specialty: 'Cardio', experience: 9, rating: 4.7, members: 37 }
    ];
    
    return trainerData.map((trainer, index) => ({
        id: index + 1,
        name: trainer.name,
        email: `${trainer.name.toLowerCase().replace(' ', '.')}@fitzone.com`,
        phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        specialty: trainer.specialty,
        experience: trainer.experience,
        rating: trainer.rating,
        members: trainer.members,
        available: Math.random() > 0.3
    }));
}

// Initialize trainers
let trainers = generateTrainers();
let editingTrainerId = null;

// Load trainers on page load
document.addEventListener('DOMContentLoaded', function() {
    loadTrainers();
    updateStats();
});

// Load trainers grid
function loadTrainers() {
    const grid = document.getElementById('trainersGrid');
    
    let html = '';
    
    trainers.forEach(trainer => {
        const stars = generateStars(trainer.rating);
        const statusClass = trainer.available ? 'active' : 'inactive';
        
        html += `
            <div class="trainer-card">
                <div class="trainer-image" style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400') center/cover;">
                    <div class="trainer-overlay">
                        <div class="social-links">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
                <div class="trainer-info">
                    <h3>${trainer.name}</h3>
                    <p class="trainer-specialty">${trainer.specialty}</p>
                    <div class="trainer-rating">
                        ${stars}
                        <span>(${trainer.rating})</span>
                    </div>
                    <div class="trainer-details">
                        <p><i class="fas fa-clock"></i> ${trainer.experience} years experience</p>
                        <p><i class="fas fa-users"></i> ${trainer.members} members assigned</p>
                        <p><i class="fas fa-circle"></i> <span class="status-badge ${statusClass}">${trainer.available ? 'Available' : 'Busy'}</span></p>
                    </div>
                    <div class="trainer-actions">
                        <button class="btn btn-primary btn-sm" onclick="editTrainer(${trainer.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="deleteTrainer(${trainer.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// Generate star rating HTML
function generateStars(rating) {
    let html = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        html += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="far fa-star"></i>';
    }
    
    return html;
}

// Update statistics
function updateStats() {
    const total = trainers.length;
    const available = trainers.filter(t => t.available).length;
    const avgRating = (trainers.reduce((sum, t) => sum + t.rating, 0) / total).toFixed(1);
    const totalSessions = trainers.reduce((sum, t) => sum + t.members, 0);
    
    animateCounter(document.getElementById('totalTrainers'), total);
    animateCounter(document.getElementById('availableTrainers'), available);
    document.getElementById('avgRating').textContent = avgRating;
    animateCounter(document.getElementById('totalSessions'), totalSessions);
}

// Search trainers
function searchTrainers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = trainers.filter(trainer => 
        trainer.name.toLowerCase().includes(searchTerm) ||
        trainer.specialty.toLowerCase().includes(searchTerm) ||
        trainer.email.toLowerCase().includes(searchTerm)
    );
    
    trainers = filtered;
    loadTrainers();
}

// Filter trainers by specialty
function filterTrainers() {
    const specialty = document.getElementById('filterSpecialty').value;
    const allTrainers = generateTrainers();
    
    if (specialty) {
        trainers = allTrainers.filter(t => t.specialty.includes(specialty));
    } else {
        trainers = allTrainers;
    }
    
    loadTrainers();
}

// Open add trainer modal
function openAddTrainerModal() {
    editingTrainerId = null;
    document.getElementById('modalTitle').textContent = 'Add New Trainer';
    document.getElementById('trainerForm').reset();
    document.getElementById('trainerModal').classList.add('active');
}

// Edit trainer
function editTrainer(id) {
    const trainer = trainers.find(t => t.id === id);
    if (trainer) {
        editingTrainerId = id;
        document.getElementById('modalTitle').textContent = 'Edit Trainer';
        document.getElementById('trainerName').value = trainer.name;
        document.getElementById('trainerEmail').value = trainer.email;
        document.getElementById('trainerPhone').value = trainer.phone;
        document.getElementById('trainerSpecialty').value = trainer.specialty;
        document.getElementById('trainerExperience').value = trainer.experience;
        document.getElementById('trainerMembers').value = trainer.members;
        document.getElementById('trainerModal').classList.add('active');
    }
}

// Close trainer modal
function closeTrainerModal() {
    document.getElementById('trainerModal').classList.remove('active');
    editingTrainerId = null;
}

// Save trainer
function saveTrainer(event) {
    event.preventDefault();
    
    const name = document.getElementById('trainerName').value;
    const email = document.getElementById('trainerEmail').value;
    const phone = document.getElementById('trainerPhone').value;
    const specialty = document.getElementById('trainerSpecialty').value;
    const experience = parseInt(document.getElementById('trainerExperience').value);
    const members = parseInt(document.getElementById('trainerMembers').value);
    
    if (editingTrainerId) {
        // Update existing trainer
        const index = trainers.findIndex(t => t.id === editingTrainerId);
        if (index !== -1) {
            trainers[index] = {
                ...trainers[index],
                name,
                email,
                phone,
                specialty,
                experience,
                members
            };
            showNotification('Trainer updated successfully!', 'success');
        }
    } else {
        // Add new trainer
        const newTrainer = {
            id: trainers.length + 1,
            name,
            email,
            phone,
            specialty,
            experience,
            rating: 4.5,
            members,
            available: true
        };
        trainers.push(newTrainer);
        showNotification('Trainer added successfully!', 'success');
    }
    
    closeTrainerModal();
    loadTrainers();
    updateStats();
}

// Delete trainer
function deleteTrainer(id) {
    if (confirm('Are you sure you want to delete this trainer?')) {
        trainers = trainers.filter(t => t.id !== id);
        loadTrainers();
        updateStats();
        showNotification('Trainer deleted successfully!', 'success');
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
        trainers = generateTrainers();
        loadTrainers();
    }
});

// Add styles for trainer cards
const style = document.createElement('style');
style.textContent = `
    .trainers-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 25px;
    }
    
    .trainer-card {
        background: var(--glass-bg);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        overflow: hidden;
        transition: var(--transition);
        backdrop-filter: blur(10px);
    }
    
    .trainer-card:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow);
    }
    
    .trainer-image {
        height: 250px;
        position: relative;
    }
    
    .trainer-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(230, 57, 70, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: var(--transition);
    }
    
    .trainer-card:hover .trainer-overlay {
        opacity: 1;
    }
    
    .trainer-info {
        padding: 25px;
    }
    
    .trainer-info h3 {
        font-size: 22px;
        color: var(--text-light);
        margin-bottom: 5px;
    }
    
    .trainer-specialty {
        color: var(--primary-color);
        font-weight: 500;
        margin-bottom: 10px;
 font-size: 14px;
    }
    
    .trainer-rating {
        color: #ffc107;
        margin-bottom: 15px;
        font-size: 14px;
    }
    
    .trainer-rating span {
        color: var(--text-gray);
        margin-left: 5px;
    }
    
    .trainer-details {
        margin-bottom: 20px;
    }
    
    .trainer-details p {
        color: var(--text-gray);
        font-size: 14px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .trainer-details i {
        color: var(--primary-color);
        width: 16px;
    }
    
    .trainer-actions {
        display: flex;
        gap: 10px;
    }
    
    .trainer-actions .btn {
        flex: 1;
        padding: 10px;
        font-size: 14px;
    }
    
    .btn-sm {
        padding: 8px 15px;
        font-size: 14px;
    }
`;
document.head.appendChild(style);
