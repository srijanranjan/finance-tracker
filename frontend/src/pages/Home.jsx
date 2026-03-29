import { useState, useEffect } from "react"
import Summary from "../components/Summary"
import Charts from "../components/Charts"
import TransactionList from "../components/TransactionList"
import TransactionForm from "../components/TransactionForm"
import {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getCategories
} from "../services/api"

function Home() {
    const [transactions, setTransactions] = useState([])
    const [categories, setCategories] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editData, setEditData] = useState(null)
    const [filterCategory, setFilterCategory] = useState("")
    const [filterType, setFilterType] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAll()
    }, [])

    const fetchAll = async () => {
        setLoading(true)
        try {
            await Promise.all([fetchTransactions(), fetchCategories()])
        } finally {
            setLoading(false)
        }
    }

    const fetchTransactions = async () => {
        const res = await getTransactions()
        setTransactions(res.data)
    }

    const fetchCategories = async () => {
        const res = await getCategories()
        setCategories(res.data)
    }

    const handleSubmit = async (form) => {
        if (editData) {
            await updateTransaction(editData.id, form)
        } else {
            await createTransaction(form)
        }
        setShowForm(false)
        setEditData(null)
        fetchTransactions()
    }

    const handleEdit = (transaction) => {
        setEditData(transaction)
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        await deleteTransaction(id)
        fetchTransactions()
    }

    const filtered = transactions
        .filter(t => filterCategory ? t.category === filterCategory : true)
        .filter(t => filterType ? t.type === filterType : true)

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 text-sm">Loading your finances...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Summary transactions={filtered} />

            {/* Filters */}
            <div className="px-6 pb-4 flex gap-4">
                <select
                    value={filterCategory}
                    onChange={e => setFilterCategory(e.target.value)}
                    className="border rounded-lg px-3 py-2 bg-white text-sm focus:outline-none"
                >
                    <option value="">All Categories</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                </select>
                <select
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                    className="border rounded-lg px-3 py-2 bg-white text-sm focus:outline-none"
                >
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <button
                    onClick={() => { setShowForm(true); setEditData(null) }}
                    className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                    + Add Transaction
                </button>
            </div>

            <TransactionList
                transactions={filtered}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {showForm && (
                <TransactionForm
                    onSubmit={handleSubmit}
                    onClose={() => { setShowForm(false); setEditData(null) }}
                    editData={editData}
                    categories={categories}
                />
            )}
                <Charts transactions={filtered}/>
        </div>
    )
}

export default Home