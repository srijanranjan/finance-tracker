from flask import Flask
from flask_cors import CORS
from routes.transactions import transactions_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(transactions_bp)

if __name__ == "__main__":
    app.run(debug=True)