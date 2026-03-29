from flask import Blueprint, request, jsonify
from db import get_connection

transactions_bp = Blueprint("transactions", __name__)

# GET all transactions
@transactions_bp.route("/transactions", methods=["GET"])
def get_transactions():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT t.id, t.amount, t.type, c.name as category, t.date, t.description
        FROM transactions t
        LEFT JOIN categories c ON t.category_id = c.id
        ORDER BY t.date DESC
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()
    transactions = []
    for row in rows:
        transactions.append({
            "id": row[0],
            "amount": float(row[1]),
            "type": row[2],
            "category": row[3],
            "date": str(row[4]),
            "description": row[5]
        })
    return jsonify(transactions)

# POST create transaction
@transactions_bp.route("/transactions", methods=["POST"])
def create_transaction():
    data = request.get_json()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO transactions (amount, type, category_id, date, description)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id
    """, (data["amount"], data["type"], data["category_id"], data["date"], data["description"]))
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Transaction created", "id": new_id}), 201

# PUT update transaction
@transactions_bp.route("/transactions/<int:id>", methods=["PUT"])
def update_transaction(id):
    data = request.get_json()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        UPDATE transactions
        SET amount=%s, type=%s, category_id=%s, date=%s, description=%s
        WHERE id=%s
    """, (data["amount"], data["type"], data["category_id"], data["date"], data["description"], id))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Transaction updated"})

# DELETE transaction
@transactions_bp.route("/transactions/<int:id>", methods=["DELETE"])
def delete_transaction(id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM transactions WHERE id=%s", (id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Transaction deleted"})

# GET all categories
@transactions_bp.route("/categories", methods=["GET"])
def get_categories():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, name, type FROM categories ORDER BY id")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    categories = []
    for row in rows:
        categories.append({
            "id": row[0],
            "name": row[1],
            "type": row[2]
        })
    return jsonify(categories)