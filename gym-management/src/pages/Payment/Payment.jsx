import React, { useState } from 'react'
import { CreditCard, CheckCircle, Download } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

const Payment = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)

  const currentBill = {
    plan: 'Premium',
    amount: 79,
    dueDate: 'January 31, 2024'
  }

  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '5555', expiry: '08/24', isDefault: false }
  ]

  const paymentHistory = [
    { id: 1, date: '2024-01-15', amount: 79, method: 'Visa ****4242', status: 'Paid' },
    { id: 2, date: '2023-12-15', amount: 79, method: 'Visa ****4242', status: 'Paid' },
    { id: 3, date: '2023-11-15', amount: 49, method: 'Mastercard ****5555', status: 'Paid' },
    { id: 4, date: '2023-10-15', amount: 49, method: 'Visa ****4242', status: 'Paid' },
    { id: 5, date: '2023-09-15', amount: 29, method: 'Visa ****4242', status: 'Paid' }
  ]

  const handlePayment = (e) => {
    e.preventDefault()
    setIsPaymentModalOpen(false)
    setIsSuccessModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-light)]">Payment & Billing</h1>
        <p className="text-[var(--text-gray)]">Manage your payments and billing</p>
      </div>

      {/* Current Bill */}
      <Card className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] border-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-white/80 text-sm mb-2">Current Bill</div>
            <h2 className="text-4xl font-bold text-white mb-2">${currentBill.amount}.00</h2>
            <p className="text-white/80">{currentBill.plan} Membership • Due: {currentBill.dueDate}</p>
          </div>
          <Button variant="secondary" size="lg" onClick={() => setIsPaymentModalOpen(true)}>
            Pay Now
          </Button>
        </div>
      </Card>

      {/* Payment Methods */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--primary-color)] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="text-[var(--primary-color)]" size={20} />
                  <span className="font-medium text-[var(--text-light)]">{method.type}</span>
                </div>
                {method.isDefault && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--primary-color)] text-white">
                    Default
                  </span>
                )}
              </div>
              <div className="text-sm text-[var(--text-gray)]">
                **** **** **** {method.last4}
              </div>
              <div className="text-sm text-[var(--text-gray)]">
                Expires: {method.expiry}
              </div>
            </div>
          ))}
          <button className="p-4 rounded-lg bg-[var(--glass-bg)] border-2 border-dashed border-[var(--glass-border)] hover:border-[var(--primary-color)] transition-colors flex items-center justify-center gap-2 text-[var(--text-gray)] hover:text-[var(--primary-color)]">
            <CreditCard size={20} />
            <span>Add New Card</span>
          </button>
        </div>
      </Card>

      {/* Payment History */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--glass-border)]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Description</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Method</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-[var(--glass-border)]">
                  <td className="py-3 px-4 text-[var(--text-light)]">{payment.date}</td>
                  <td className="py-3 px-4 text-[var(--text-gray)]">Membership Fee</td>
                  <td className="py-3 px-4 text-[var(--text-light)]">${payment.amount}</td>
                  <td className="py-3 px-4 text-[var(--text-gray)]">{payment.method}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)] hover:border-[var(--primary-color)] transition-colors">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Make Payment"
        size="lg"
      >
        <div className="space-y-6">
          <div className="text-center p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">${currentBill.amount}.00</div>
            <p className="text-[var(--text-gray)]">{currentBill.plan} Membership</p>
          </div>
          
          <form onSubmit={handlePayment}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-light)] mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Pay ${currentBill.amount}</Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title=""
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--text-light)]">Payment Successful!</h3>
          <p className="text-[var(--text-gray)]">
            Your payment of ${currentBill.amount}.00 has been processed successfully.
          </p>
          <Button onClick={() => setIsSuccessModalOpen(false)}>
            Done
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Payment
