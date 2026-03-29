import { useState } from "react"
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts"

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6"]

function Charts({ transactions }) {
    const [activeTab, setActiveTab] = useState("pie")

    const categoryData = transactions
        .filter(t => t.type === "expense")
        .reduce((acc, t) => {
            const existing = acc.find(item => item.name === t.category)
            if (existing) {
                existing.value += t.amount
            } else {
                acc.push({ name: t.category, value: t.amount })
            }
            return acc
        }, [])

    const monthlyData = transactions.reduce((acc, t) => {
        const month = t.date?.slice(0, 7)
        if (!month) return acc
        const existing = acc.find(item => item.month === month)
        if (existing) {
            if (t.type === "income") existing.income += t.amount
            else existing.expense += t.amount
        } else {
            acc.push({
                month,
                income: t.type === "income" ? t.amount : 0,
                expense: t.type === "expense" ? t.amount : 0
            })
        }
        return acc
    }, []).sort((a, b) => a.month.localeCompare(b.month))

    if (transactions.length === 0) return null

    return (
        <div className="px-6 pb-10">
            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Analytics</span>
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Chart Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab("pie")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === "pie"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                    >
                        Expense Breakdown
                    </button>
                    <button
                        onClick={() => setActiveTab("bar")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === "bar"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                    >
                        Monthly Overview
                    </button>
                </div>

                {/* Pie Chart */}
                {activeTab === "pie" && (
                    <>
                        {categoryData.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-10">No expenses yet</p>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {categoryData.map((_, index) => (
                                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </>
                )}

                {/* Bar Chart */}
                {activeTab === "bar" && (
                    <>
                        {monthlyData.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-10">No data yet</p>
                        ) : (
                            <div className="flex justify-center">
                                <ResponsiveContainer width="40%" height={250}>
                                    <BarChart data={monthlyData}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="month" tick={{fontSize: 11}}/>
                                        <YAxis tick={{fontSize: 11}}/>
                                        <Tooltip formatter={(value) => `₹${value.toFixed(2)}`}/>
                                        <Legend/>
                                        <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={100}/>
                                        <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={100}/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                                )}
                            </>
                        )}
                    </div>
                    </div>
                    )
}

export default Charts