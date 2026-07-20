import React, { useState } from 'react'
import { Crown, Check, ArrowRight } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { dummyData } from '../../services/dummyData'

const Membership = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [currentPlan, setCurrentPlan] = useState('Standard')

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan)
    setIsUpgradeModalOpen(true)
  }

  const confirmUpgrade = () => {
    setCurrentPlan(selectedPlan.name)
    setIsUpgradeModalOpen(false)
    setSelectedPlan(null)
  }

  const paymentHistory = [
    { id: 1, date: '2024-01-15', amount: 49, method: 'Credit Card', status: 'Paid' },
    { id: 2, date: '2023-12-15', amount: 49, method: 'Credit Card', status: 'Paid' },
    { id: 3, date: '2023-11-15', amount: 29, method: 'Debit Card', status: 'Paid' },
    { id: 4, date: '2023-10-15', amount: 29, method: 'Credit Card', status: 'Paid' },
    { id: 5, date: '2023-09-15', amount: 29, method: 'PayPal', status: 'Paid' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-light)]">Membership</h1>
        <p className="text-[var(--text-gray)]">Manage your membership plan</p>
      </div>

      {/* Current Plan */}
      <Card className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] border-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-white/80 text-sm mb-2">Current Plan</div>
            <h2 className="text-3xl font-bold text-white mb-2">{currentPlan}</h2>
            <p className="text-white/80">Renews on February 15, 2024</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-white mb-2">
              ${dummyData.membershipPlans.find(p => p.name === currentPlan)?.price || 49}
              <span className="text-lg text-white/80">/month</span>
            </div>
            <Button variant="secondary" onClick={() => setIsUpgradeModalOpen(true)}>
              Upgrade Plan
            </Button>
          </div>
        </div>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-light)] mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyData.membershipPlans.map((plan) => (
            <Card
              key={plan.id}
              hover
              className={`${plan.popular ? 'border-[var(--primary-color)] relative' : ''} ${
                plan.name === currentPlan ? 'opacity-60' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--primary-color)] rounded-full text-white text-sm font-semibold">
                  Most Popular
                </div>
              )}
              {plan.name === currentPlan && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 rounded-full text-white text-sm font-semibold">
                  Current
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[var(--text-light)] mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">
                  ${plan.price}
                  <span className="text-lg text-[var(--text-gray)]">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-[var(--text-gray)]">
                    <Check size={16} className="text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.name !== currentPlan && (
                <Button
                  block
                  variant={plan.popular ? 'primary' : 'outline'}
                  onClick={() => handleUpgrade(plan)}
                >
                  {plan.price > (dummyData.membershipPlans.find(p => p.name === currentPlan)?.price || 49)
                    ? 'Upgrade'
                    : 'Downgrade'}
                  <ArrowRight size={16} />
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--glass-border)]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Method</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-[var(--glass-border)]">
                  <td className="py-3 px-4 text-[var(--text-light)]">{payment.date}</td>
                  <td className="py-3 px-4 text-[var(--text-light)]">${payment.amount}</td>
                  <td className="py-3 px-4 text-[var(--text-gray)]">{payment.method}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upgrade Modal */}
      <Modal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        title="Confirm Plan Change"
      >
        {selectedPlan && (
          <div className="space-y-4">
            <p className="text-[var(--text-gray)]">
              You are about to {selectedPlan.price > (dummyData.membershipPlans.find(p => p.name === currentPlan)?.price || 49) ? 'upgrade' : 'downgrade'} your membership from <strong>{currentPlan}</strong> to <strong>{selectedPlan.name}</strong>.
            </p>
            <div className="p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
              <div className="flex justify-between mb-2">
                <span className="text-[var(--text-gray)]">Current Plan:</span>
                <span className="text-[var(--text-light)]">${dummyData.membershipPlans.find(p => p.name === currentPlan)?.price || 49}/month</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[var(--text-gray)]">New Plan:</span>
                <span className="text-[var(--text-light)]">${selectedPlan.price}/month</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--glass-border)]">
                <span className="text-[var(--text-gray)] font-medium">Difference:</span>
                <span className="text-[var(--primary-color)] font-bold">
                  ${selectedPlan.price - (dummyData.membershipPlans.find(p => p.name === currentPlan)?.price || 49)}/month
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsUpgradeModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmUpgrade}>
                Confirm Change
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Membership
