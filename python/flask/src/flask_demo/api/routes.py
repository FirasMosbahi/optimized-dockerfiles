from flask import Blueprint, request, jsonify
from flask_demo.models.user import User

api_bp = Blueprint('api', __name__)


@api_bp.route('/')
def root():
    """Root endpoint."""
    return jsonify({"message": "Hello, world!"})


@api_bp.route('/users', methods=['POST'])
def create_user():
    """Create a new user."""
    data = request.get_json()

    if not data or 'name' not in data or 'email' not in data:
        return jsonify({"error": "Name and email are required"}), 400

    user = User(
        name=data['name'],
        email=data['email'],
        age=data.get('age')
    )

    return jsonify({
        "message": f"User {user.name} created!",
        "user": user.to_dict()
    }), 201


@api_bp.route('/health')
def health_check():
    """Health check endpoint."""
    return jsonify({"status": "healthy"}), 200
