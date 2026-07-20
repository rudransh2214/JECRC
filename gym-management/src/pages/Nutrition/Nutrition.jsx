import React, { useState } from 'react'
import { Apple, Droplets, Flame, Plus } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import { dummyData } from '../../services/dummyData'

const Nutrition = () => {
  const [waterIntake, setWaterIntake] = useState(6)
  const [selectedPlan, setSelectedPlan] = useState(dummyData.nutritionPlans[0])
  const waterGoal = 8

  const handleWaterIntake = () => {
    if (waterIntake < waterGoal) {
      setWaterIntake(waterIntake + 1)
    }
  }

  const currentPlan = dummyData.nutritionPlans[0]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-light)]">Nutrition Plans</h1>
        <p className="text-[var(--text-gray)]">Your personalized nutrition plans</p>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <Flame className="text-orange-500" size={24} />
            <div className="text-2xl font-bold text-[var(--text-light)]">{currentPlan.calories}</div>
          </div>
          <div className="text-[var(--text-gray)] text-sm">Calories</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 bg-red-500 rounded-full" />
            <div className="text-2xl font-bold text-[var(--text-light)]">{currentPlan.macros.protein}g</div>
          </div>
          <div className="text-[var(--text-gray)] text-sm">Protein</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 bg-yellow-500 rounded-full" />
            <div className="text-2xl font-bold text-[var(--text-light)]">{currentPlan.macros.carbs}g</div>
          </div>
          <div className="text-[var(--text-gray)] text-sm">Carbs</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
            <div className="text-2xl font-bold text-[var(--text-light)]">{currentPlan.macros.fat}g</div>
          </div>
          <div className="text-[var(--text-gray)] text-sm">Fat</div>
        </Card>
      </div>

      {/* Water Intake */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[var(--text-light)]">Water Intake</h3>
          <div className="flex items-center gap-2 text-[var(--text-gray)]">
            <Droplets size={18} />
            <span>{waterIntake}/{waterGoal} glasses</span>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-4 bg-[var(--glass-bg)] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${(waterIntake / waterGoal) * 100}%` }}
            />
          </div>
          <Button
            size="sm"
            onClick={handleWaterIntake}
            disabled={waterIntake >= waterGoal}
          >
            <Plus size={16} />
          </Button>
        </div>
      </Card>

      {/* Today's Meal Plan */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Today's Meal Plan</h3>
        <div className="space-y-4">
          {currentPlan.meals.map((meal, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
              <div className="w-12 h-12 bg-[var(--primary-color)]/20 rounded-xl flex items-center justify-center">
                <Apple className="text-[var(--primary-color)]" size={24} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-[var(--text-light)]">{meal.type}</div>
                <div className="text-[var(--text-gray)]">{meal.name}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[var(--primary-color)]">{meal.calories} cal</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Macro Progress */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Macro Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[var(--text-gray)]">Protein</span>
              <span className="text-[var(--text-light)]">120g / 150g</span>
            </div>
            <div className="w-full h-3 bg-[var(--glass-bg)] rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[var(--text-gray)]">Carbs</span>
              <span className="text-[var(--text-light)]">100g / 150g</span>
            </div>
            <div className="w-full h-3 bg-[var(--glass-bg)] rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '67%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[var(--text-gray)]">Fat</span>
              <span className="text-[var(--text-light)]">45g / 60g</span>
            </div>
            <div className="w-full h-3 bg-[var(--glass-bg)] rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Available Plans */}
      <div>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dummyData.nutritionPlans.map((plan) => (
            <Card
              key={plan.id}
              hover
              className={selectedPlan.id === plan.id ? 'border-[var(--primary-color)]' : ''}
            >
              <h3 className="text-xl font-bold text-[var(--text-light)] mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-[var(--primary-color)] mb-4">
                {plan.calories}
                <span className="text-lg text-[var(--text-gray)]"> cal/day</span>
              </div>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-gray)]">Protein:</span>
                  <span className="text-[var(--text-light)]">{plan.macros.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-gray)]">Carbs:</span>
                  <span className="text-[var(--text-light)]">{plan.macros.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-gray)]">Fat:</span>
                  <span className="text-[var(--text-light)]">{plan.macros.fat}g</span>
                </div>
              </div>
              <Button
                block
                variant={selectedPlan.id === plan.id ? 'primary' : 'outline'}
                onClick={() => setSelectedPlan(plan)}
              >
                {selectedPlan.id === plan.id ? 'Active' : 'Select Plan'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Nutrition
