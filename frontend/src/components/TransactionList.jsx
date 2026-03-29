function TransactionList({ transactions, onEdit, onDelete }) {
    if (transactions.length === 0) {
        return (
            <div className="text-center text-gray-400 py-10">
                No transactions yet. Add one!
            </div>
        )
    }

    return (
        <div className="px-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-3 text-left">Date</th>
                        <th className="px-6 py-3 text-left">Description</th>
                        <th className="px-6 py-3 text-left">Category</th>
                        <th className="px-6 py-3 text-left">Type</th>
                        <th className="px-6 py-3 text-left">Amount</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {transactions.map(t => (
                        <tr key={t.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">{t.date}</td>
                            <td className="px-6 py-4">{t.description}</td>
                            <td className="px-6 py-4">{t.category}</td>
                            <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      t.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                  }`}>
                    {t.type}
                  </span>
                            </td>
                            <td className={`px-6 py-4 font-semibold ${
                                t.type === "income" ? "text-green-500" : "text-red-500"
                            }`}>
                                ₹{t.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 space-x-2">
                                <button
                                    onClick={() => onEdit(t)}
                                    className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(t.id)}
                                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TransactionList