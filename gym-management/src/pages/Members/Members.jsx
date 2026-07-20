import React, { useState, useEffect } from 'react'
import { Search, Filter, Plus, Edit, Trash2, MoreVertical } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import SearchBar from '../../components/SearchBar'
import Table from '../../components/Table'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import { dummyData } from '../../services/dummyData'

const Members = () => {
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPlan, setFilterPlan] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [modalMode, setModalMode] = useState('add') // 'add' or 'edit'

  const itemsPerPage = 10

  useEffect(() => {
    setMembers(dummyData.members)
    setFilteredMembers(dummyData.members)
  }, [])

  useEffect(() => {
    let filtered = members

    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((member) => member.status === filterStatus)
    }

    if (filterPlan !== 'all') {
      filtered = filtered.filter((member) => member.plan === filterPlan)
    }

    setFilteredMembers(filtered)
    setCurrentPage(1)
  }, [searchTerm, filterStatus, filterPlan, members])

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMembers = filteredMembers.slice(startIndex, endIndex)

  const handleEdit = (member) => {
    setSelectedMember(member)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleDelete = (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter((m) => m.id !== memberId))
    }
  }

  const handleAdd = () => {
    setSelectedMember(null)
    setModalMode('add')
    setIsModalOpen(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    // In a real app, this would make an API call
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'avatar', header: '', render: (row) => (
      <img src={row.avatar} alt={row.firstName} className="w-10 h-10 rounded-full" />
    )},
    { key: 'name', header: 'Name', render: (row) => (
      <div>
        <div className="font-medium text-[var(--text-light)]">{row.firstName} {row.lastName}</div>
        <div className="text-sm text-[var(--text-gray)]">{row.email}</div>
      </div>
    )},
    { key: 'plan', header: 'Plan', render: (row) => (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--primary-color)]/20 text-[var(--primary-color)]">
        {row.plan}
      </span>
    )},
    { key: 'status', header: 'Status', render: (row) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        row.status === 'Active' ? 'bg-green-500/20 text-green-500' :
        row.status === 'Inactive' ? 'bg-red-500/20 text-red-500' :
        row.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
        'bg-gray-500/20 text-gray-500'
      }`}>
        {row.status}
      </span>
    )},
    { key: 'joinDate', header: 'Joined', render: (row) => (
      <div className="text-sm text-[var(--text-gray)]">{row.joinDate}</div>
    )},
    { key: 'actions', header: 'Actions', render: (row) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleEdit(row)}
          className="p-2 rounded-lg bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-colors"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => handleDelete(row.id)}
          className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    )}
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-light)]">Members</h1>
          <p className="text-[var(--text-gray)]">Manage your gym members</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus size={18} /> Add Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-2xl font-bold text-[var(--text-light)]">{members.length}</div>
          <div className="text-[var(--text-gray)] text-sm">Total Members</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-green-500">
            {members.filter(m => m.status === 'Active').length}
          </div>
          <div className="text-[var(--text-gray)] text-sm">Active Members</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-yellow-500">
            {members.filter(m => m.status === 'Pending').length}
          </div>
          <div className="text-[var(--text-gray)] text-sm">Pending</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-red-500">
            {members.filter(m => m.status === 'Expired').length}
          </div>
          <div className="text-[var(--text-gray)] text-sm">Expired</div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search members..."
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
            </select>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
            >
              <option value="all">All Plans</option>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="Elite">Elite</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Members Table */}
      <Card>
        <Table columns={columns} data={currentMembers} />
      </Card>

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
        title={modalMode === 'add' ? 'Add New Member' : 'Edit Member'}
        size="lg"
      >
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">First Name</label>
              <input
                type="text"
                defaultValue={selectedMember?.firstName}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Last Name</label>
              <input
                type="text"
                defaultValue={selectedMember?.lastName}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Email</label>
              <input
                type="email"
                defaultValue={selectedMember?.email}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Phone</label>
              <input
                type="tel"
                defaultValue={selectedMember?.phone}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Plan</label>
              <select
                defaultValue={selectedMember?.plan || 'Standard'}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
              >
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Elite">Elite</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Status</label>
              <select
                defaultValue={selectedMember?.status || 'Active'}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Member</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Members
