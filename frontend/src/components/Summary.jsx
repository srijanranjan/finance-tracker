function Summary({ transactions }) {
    const income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    return (
        <div className="grid grid-cols-3 gap-4 p-6">
            <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-500 text-sm">Total Income</p>
                <p className="text-green-500 text-2xl font-bold">₹{income.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-500 text-sm">Total Expense</p>
                <p className="text-red-500 text-2xl font-bold">₹{expense.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-500 text-sm">Net Balance</p>
                <p className={`text-2xl font-bold ${balance >= 0 ? "text-green-500" : "text-red-500"}`}>
                    ₹{balance.toFixed(2)}
                </p>
            </div>
        </div>
    )
}

export default Summary