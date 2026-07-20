import React, { useState, useEffect } from 'react'
import { Search, Filter, Plus, Edit, Trash2, Star } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import SearchBar from '../../components/SearchBar'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import { dummyData } from '../../services/dummyData'

const Trainers = () => {
  const [trainers, setTrainers] = useState([])
  const [filteredTrainers, setFilteredTrainers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpecialty, setFilterSpecialty] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState(null)
  const [modalMode, setModalMode] = useState('add')

  const itemsPerPage = 8

  useEffect(() => {
    setTrainers(dummyData.trainers)
    setFilteredTrainers(dummyData.trainers)
  }, [])

  useEffect(() => {
    let filtered = trainers

    if (searchTerm) {
      filtered = filtered.filter(
        (trainer) =>
          trainer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trainer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trainer.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterSpecialty !== 'all') {
      filtered = filtered.filter((trainer) => trainer.specialty === filterSpecialty)
    }

    setFilteredTrainers(filtered)
    setCurrentPage(1)
  }, [searchTerm, filterSpecialty, trainers])

  const totalPages = Math.ceil(filteredTrainers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTrainers = filteredTrainers.slice(startIndex, endIndex)

  const handleEdit = (trainer) => {
    setSelectedTrainer(trainer)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleDelete = (trainerId) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      setTrainers(trainers.filter((t) => t.id !== trainerId))
    }
  }

  const handleAdd = () => {
    setSelectedTrainer(null)
    setModalMode('add')
    setIsModalOpen(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setIsModalOpen(false)
  }

  const specialties = [...new Set(trainers.map(t => t.specialty))]

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'}
          />
        ))}
        <span className="text-sm text-[var(--text-gray)] ml-1">({rating})</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-light)]">Trainers</h1>
          <p className="text-[var(--text-gray)]">Manage your gym trainers</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus size={18} /> Add Trainer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-2xl font-bold text-[var(--text-light)]">{trainers.length}</div>
          <div className="text-[var(--text-gray)] text-sm">Total Trainers</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-green-500">
            {trainers.filter(t => t.available).length}
          </div>
          <div className="text-[var(--text-gray)] text-sm">Available</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-yellow-500">
            {(trainers.reduce((sum, t) => sum + parseFloat(t.rating), 0) / trainers.length).toFixed(1)}
          </div>
          <div className="text-[var(--text-gray)] text-sm">Avg Rating</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-blue-500">
            {trainers.reduce((sum, t) => sum + t.assignedMembers, 0)}
          </div>
          <div className="text-[var(--text-gray)] text-sm">Total Assigned</div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search trainers..."
            />
          </div>
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
          >
            <option value="all">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentTrainers.map((trainer) => (
          <Card key={trainer.id} hover>
            <div className="relative">
              <img
                src={trainer.avatar}
                alt={`${trainer.firstName} ${trainer.lastName}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              {!trainer.available && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                  Unavailable
                </div>
              )}
            </div>
            <h3 className="text-lg font-bold text-[var(--text-light)] mb-1">
              {trainer.firstName} {trainer.lastName}
            </h3>
            <p className="text-[var(--primary-color)] text-sm mb-3">{trainer.specialty}</p>
            <div className="mb-3">{renderStars(trainer.rating)}</div>
            <div className="space-y-2 text-sm text-[var(--text-gray)]">
              <div className="flex justify-between">
                <span>Experience:</span>
                <span className="text-[var(--text-light)]">{trainer.experience} years</span>
              </div>
              <div className="flex justify-between">
                <span>Assigned:</span>
                <span className="text-[var(--text-light)]">{trainer.assignedMembers} members</span>
              </div>
              <div className="flex justify-between">
                <span>Rate:</span>
                <span className="text-[var(--text-light)]">${trainer.hourlyRate}/hr</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleEdit(trainer)}
              >
                <Edit size={16} />
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="flex-1"
                onClick={() => handleDelete(trainer.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Add New Trainer' : 'Edit Trainer'}
        size="lg"
      >
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">First Name</label>
              <input
                type="text"
                defaultValue={selectedTrainer?.firstName}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Last Name</label>
              <input
                type="text"
                defaultValue={selectedTrainer?.lastName}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Email</label>
              <input
                type="email"
                defaultValue={selectedTrainer?.email}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Phone</label>
              <input
                type="tel"
                defaultValue={selectedTrainer?.phone}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Specialty</label>
              <select
                defaultValue={selectedTrainer?.specialty || 'Strength Training'}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
              >
                <option value="Strength Training">Strength Training</option>
                <option value="Cardio">Cardio</option>
                <option value="Yoga">Yoga</option>
                <option value="Pilates">Pilates</option>
                <option value="CrossFit">CrossFit</option>
                <option value="HIIT">HIIT</option>
                <option value="Boxing">Boxing</option>
                <option value="MMA">MMA</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Rehabilitation">Rehabilitation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Experience (years)</label>
              <input
                type="number"
                defaultValue={selectedTrainer?.experience || 3}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Hourly Rate ($)</label>
              <input
                type="number"
                defaultValue={selectedTrainer?.hourlyRate || 50}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Availability</label>
              <select
                defaultValue={selectedTrainer?.available !== undefined ? String(selectedTrainer.available) : 'true'}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Trainer</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Trainers
