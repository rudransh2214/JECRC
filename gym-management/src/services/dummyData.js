// ============================================
// FITZONE GYM - DUMMY DATA SERVICE
// ============================================

// Generate realistic member data
export const generateMembers = (count = 100) => {
  const firstNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Emma', 'Olivia', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn', 'Abigail']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris']
  const plans = ['Basic', 'Standard', 'Premium', 'Elite']
  const statuses = ['Active', 'Inactive', 'Pending', 'Expired']
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const plan = plans[Math.floor(Math.random() * plans.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    
    // Generate random date within last year
    const joinDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    
    return {
      id: i + 1,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@email.com`,
      phone: `+1-555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      plan,
      status,
      joinDate: joinDate.toISOString().split('T')[0],
      expiryDate: new Date(joinDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      weight: Math.floor(Math.random() * 100) + 120,
      height: Math.floor(Math.random() * 30) + 60,
      bmi: (Math.random() * 15 + 18).toFixed(1),
      attendance: Math.floor(Math.random() * 100),
      payments: Math.floor(Math.random() * 5000) + 500
    }
  })
}

// Generate realistic trainer data
export const generateTrainers = (count = 20) => {
  const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Jamie', 'Quinn', 'Avery', 'Parker', 'Sam', 'Drew', 'Reese', 'Skyler', 'Charlie', 'Finley', 'Rowan', 'Sage', 'Phoenix', 'River']
  const lastNames = ['Anderson', 'Brown', 'Clark', 'Davis', 'Evans', 'Fisher', 'Green', 'Harris', 'Irwin', 'Jones', 'King', 'Lee', 'Miller', 'Nelson', 'Owen', 'Parker', 'Quinn', 'Reed', 'Smith', 'Taylor']
  const specialties = ['Strength Training', 'Cardio', 'Yoga', 'Pilates', 'CrossFit', 'HIIT', 'Boxing', 'MMA', 'Nutrition', 'Rehabilitation']
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const specialty = specialties[Math.floor(Math.random() * specialties.length)]
    
    return {
      id: i + 1,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@fitzone.com`,
      phone: `+1-555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      specialty,
      experience: Math.floor(Math.random() * 15) + 3,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 200) + 20,
      assignedMembers: Math.floor(Math.random() * 30) + 5,
      hourlyRate: Math.floor(Math.random() * 50) + 50,
      certifications: ['NASM-CPT', 'ACE', 'ISSA', 'NSCA-CSCS'].slice(0, Math.floor(Math.random() * 3) + 1),
      bio: `${firstName} is a certified personal trainer with expertise in ${specialty}. They have helped hundreds of clients achieve their fitness goals.`,
      avatar: `https://i.pravatar.cc/150?img=${i + 21}`,
      available: Math.random() > 0.2
    }
  })
}

// Membership plans data
export const membershipPlans = [
  {
    id: 1,
    name: 'Basic',
    price: 29,
    features: [
      'Gym Access (6AM - 10PM)',
      'Basic Equipment',
      'Locker Room Access',
      '1 Free Personal Training Session',
      'Mobile App Access'
    ],
    popular: false
  },
  {
    id: 2,
    name: 'Standard',
    price: 49,
    features: [
      '24/7 Gym Access',
      'All Equipment',
      'Locker Room & Showers',
      '5 Group Classes per Month',
      'Mobile App Access',
      'Nutrition Guide'
    ],
    popular: true
  },
  {
    id: 3,
    name: 'Premium',
    price: 79,
    features: [
      '24/7 Gym Access',
      'All Equipment + VIP Areas',
      'Unlimited Group Classes',
      '10 Personal Training Sessions',
      'Sauna & Spa Access',
      'Nutrition Coaching',
      'Priority Booking'
    ],
    popular: false
  },
  {
    id: 4,
    name: 'Elite',
    price: 149,
    features: [
      '24/7 Gym Access',
      'All Equipment + VIP Areas',
      'Unlimited Group Classes',
      'Unlimited Personal Training',
      'Full Spa & Wellness Center',
      'Personal Nutritionist',
      'Priority Booking',
      'Guest Pass (5/month)',
      'Private Locker'
    ],
    popular: false
  }
]

// Class schedule data
export const classSchedule = [
  { id: 1, name: 'HIIT Training', instructor: 'Alex Anderson', time: '06:00 AM', duration: 45, capacity: 20, enrolled: 15, day: 'Monday', difficulty: 'Advanced' },
  { id: 2, name: 'Yoga Flow', instructor: 'Taylor Brown', time: '07:00 AM', duration: 60, capacity: 25, enrolled: 20, day: 'Monday', difficulty: 'Beginner' },
  { id: 3, name: 'Strength Training', instructor: 'Jordan Clark', time: '08:00 AM', duration: 60, capacity: 15, enrolled: 12, day: 'Monday', difficulty: 'Intermediate' },
  { id: 4, name: 'Spin Class', instructor: 'Morgan Davis', time: '09:00 AM', duration: 45, capacity: 30, enrolled: 28, day: 'Monday', difficulty: 'Intermediate' },
  { id: 5, name: 'CrossFit', instructor: 'Casey Evans', time: '05:00 PM', duration: 60, capacity: 20, enrolled: 18, day: 'Monday', difficulty: 'Advanced' },
  { id: 6, name: 'Pilates', instructor: 'Riley Fisher', time: '06:00 PM', duration: 50, capacity: 20, enrolled: 15, day: 'Monday', difficulty: 'Beginner' },
  { id: 7, name: 'Boxing', instructor: 'Jamie Green', time: '07:00 PM', duration: 60, capacity: 15, enrolled: 10, day: 'Monday', difficulty: 'Advanced' },
  { id: 8, name: 'Zumba', instructor: 'Quinn Harris', time: '08:00 PM', duration: 45, capacity: 30, enrolled: 25, day: 'Monday', difficulty: 'Beginner' },
  { id: 9, name: 'HIIT Training', instructor: 'Alex Anderson', time: '06:00 AM', duration: 45, capacity: 20, enrolled: 16, day: 'Tuesday', difficulty: 'Advanced' },
  { id: 10, name: 'Yoga Flow', instructor: 'Taylor Brown', time: '07:00 AM', duration: 60, capacity: 25, enrolled: 22, day: 'Tuesday', difficulty: 'Beginner' },
  { id: 11, name: 'Strength Training', instructor: 'Jordan Clark', time: '08:00 AM', duration: 60, capacity: 15, enrolled: 14, day: 'Tuesday', difficulty: 'Intermediate' },
  { id: 12, name: 'Spin Class', instructor: 'Morgan Davis', time: '09:00 AM', duration: 45, capacity: 30, enrolled: 25, day: 'Tuesday', difficulty: 'Intermediate' },
  { id: 13, name: 'CrossFit', instructor: 'Casey Evans', time: '05:00 PM', duration: 60, capacity: 20, enrolled: 15, day: 'Tuesday', difficulty: 'Advanced' },
  { id: 14, name: 'Pilates', instructor: 'Riley Fisher', time: '06:00 PM', duration: 50, capacity: 20, enrolled: 18, day: 'Tuesday', difficulty: 'Beginner' },
  { id: 15, name: 'Boxing', instructor: 'Jamie Green', time: '07:00 PM', duration: 60, capacity: 15, enrolled: 12, day: 'Tuesday', difficulty: 'Advanced' },
  { id: 16, name: 'Zumba', instructor: 'Quinn Harris', time: '08:00 PM', duration: 45, capacity: 30, enrolled: 28, day: 'Tuesday', difficulty: 'Beginner' }
]

// Workout plans data
export const workoutPlans = [
  {
    id: 1,
    name: 'Beginner Full Body',
    category: 'Strength',
    duration: 4,
    difficulty: 'Beginner',
    exercises: [
      { name: 'Squats', sets: 3, reps: 12, rest: 60 },
      { name: 'Push-ups', sets: 3, reps: 10, rest: 60 },
      { name: 'Lunges', sets: 3, reps: 10, rest: 60 },
      { name: 'Plank', sets: 3, reps: 30, rest: 60 },
      { name: 'Dumbbell Rows', sets: 3, reps: 12, rest: 60 }
    ],
    description: 'Perfect for beginners starting their fitness journey'
  },
  {
    id: 2,
    name: 'Advanced HIIT',
    category: 'Cardio',
    duration: 6,
    difficulty: 'Advanced',
    exercises: [
      { name: 'Burpees', sets: 4, reps: 15, rest: 30 },
      { name: 'Jump Squats', sets: 4, reps: 20, rest: 30 },
      { name: 'Mountain Climbers', sets: 4, reps: 30, rest: 30 },
      { name: 'Box Jumps', sets: 4, reps: 12, rest: 30 },
      { name: 'Kettlebell Swings', sets: 4, reps: 15, rest: 30 }
    ],
    description: 'High-intensity interval training for maximum calorie burn'
  },
  {
    id: 3,
    name: 'Muscle Building',
    category: 'Strength',
    duration: 8,
    difficulty: 'Intermediate',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 8, rest: 90 },
      { name: 'Deadlift', sets: 4, reps: 6, rest: 120 },
      { name: 'Overhead Press', sets: 4, reps: 8, rest: 90 },
      { name: 'Pull-ups', sets: 4, reps: 8, rest: 90 },
      { name: 'Barbell Rows', sets: 4, reps: 10, rest: 90 }
    ],
    description: 'Build lean muscle mass with compound movements'
  },
  {
    id: 4,
    name: 'Fat Loss',
    category: 'Cardio',
    duration: 6,
    difficulty: 'Intermediate',
    exercises: [
      { name: 'Running', sets: 1, reps: 30, rest: 0 },
      { name: 'Jump Rope', sets: 3, reps: 100, rest: 60 },
      { name: 'Cycling', sets: 1, reps: 20, rest: 0 },
      { name: 'Rowing', sets: 3, reps: 500, rest: 60 },
      { name: 'Swimming', sets: 1, reps: 30, rest: 0 }
    ],
    description: 'Cardio-focused workout for effective fat loss'
  }
]

// Nutrition plans data
export const nutritionPlans = [
  {
    id: 1,
    name: 'Weight Loss',
    calories: 1800,
    macros: { protein: 150, carbs: 150, fat: 60 },
    meals: [
      { type: 'Breakfast', name: 'Oatmeal with Berries', calories: 350 },
      { type: 'Snack', name: 'Greek Yogurt', calories: 150 },
      { type: 'Lunch', name: 'Grilled Chicken Salad', calories: 450 },
      { type: 'Snack', name: 'Almonds', calories: 200 },
      { type: 'Dinner', name: 'Baked Salmon with Vegetables', calories: 500 },
      { type: 'Snack', name: 'Apple', calories: 150 }
    ]
  },
  {
    id: 2,
    name: 'Muscle Gain',
    calories: 2800,
    macros: { protein: 200, carbs: 300, fat: 80 },
    meals: [
      { type: 'Breakfast', name: 'Eggs and Toast', calories: 500 },
      { type: 'Snack', name: 'Protein Shake', calories: 300 },
      { type: 'Lunch', name: 'Chicken Breast with Rice', calories: 700 },
      { type: 'Snack', name: 'Peanut Butter', calories: 300 },
      { type: 'Dinner', name: 'Steak with Potatoes', calories: 800 },
      { type: 'Snack', name: 'Cottage Cheese', calories: 200 }
    ]
  },
  {
    id: 3,
    name: 'Maintenance',
    calories: 2200,
    macros: { protein: 150, carbs: 250, fat: 70 },
    meals: [
      { type: 'Breakfast', name: 'Smoothie Bowl', calories: 400 },
      { type: 'Snack', name: 'Mixed Nuts', calories: 200 },
      { type: 'Lunch', name: 'Turkey Wrap', calories: 600 },
      { type: 'Snack', name: 'Hummus and Veggies', calories: 200 },
      { type: 'Dinner', name: 'Grilled Fish with Quinoa', calories: 600 },
      { type: 'Snack', name: 'Banana', calories: 200 }
    ]
  }
]

// Attendance data
export const generateAttendance = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return days.map(day => ({
    day,
    checkIn: Math.floor(Math.random() * 100) + 50,
    checkOut: Math.floor(Math.random() * 100) + 50,
    duration: Math.floor(Math.random() * 120) + 30
  }))
}

// Payment history data
export const generatePayments = () => {
  const payments = []
  const today = new Date()
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(today)
    date.setMonth(date.getMonth() - i)
    
    payments.push({
      id: i + 1,
      date: date.toISOString().split('T')[0],
      amount: [29, 49, 79, 149][Math.floor(Math.random() * 4)],
      method: ['Credit Card', 'Debit Card', 'PayPal'][Math.floor(Math.random() * 3)],
      status: 'Paid',
      description: 'Membership Fee'
    })
  }
  
  return payments
}

// Notifications data
export const notifications = [
  { id: 1, type: 'success', message: 'Your membership has been renewed successfully!' },
  { id: 2, type: 'info', message: 'New class schedule has been released for next week.' },
  { id: 3, type: 'warning', message: 'Your membership expires in 5 days.' },
  { id: 4, type: 'success', message: 'You have completed your weekly workout goal!' },
  { id: 5, type: 'info', message: 'Personal training session reminder: Tomorrow at 10 AM' }
]

// Analytics data
export const analyticsData = {
  revenue: [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 48000 },
    { month: 'Apr', amount: 61000 },
    { month: 'May', amount: 55000 },
    { month: 'Jun', amount: 67000 }
  ],
  memberGrowth: [
    { month: 'Jan', count: 850 },
    { month: 'Feb', count: 920 },
    { month: 'Mar', count: 980 },
    { month: 'Apr', count: 1050 },
    { month: 'May', count: 1120 },
    { month: 'Jun', count: 1200 }
  ],
  attendance: [
    { day: 'Mon', percentage: 65 },
    { day: 'Tue', percentage: 72 },
    { day: 'Wed', percentage: 58 },
    { day: 'Thu', percentage: 80 },
    { day: 'Fri', percentage: 75 },
    { day: 'Sat', percentage: 85 },
    { day: 'Sun', percentage: 70 }
  ],
  classPopularity: [
    { name: 'HIIT Training', sessions: 245 },
    { name: 'Yoga', sessions: 320 },
    { name: 'Strength Training', sessions: 280 },
    { name: 'Spin Class', sessions: 195 },
    { name: 'CrossFit', sessions: 165 }
  ]
}

// Export all data
export const dummyData = {
  members: generateMembers(100),
  trainers: generateTrainers(20),
  membershipPlans,
  classSchedule,
  workoutPlans,
  nutritionPlans,
  attendance: generateAttendance(),
  payments: generatePayments(),
  notifications,
  analytics: analyticsData
}
