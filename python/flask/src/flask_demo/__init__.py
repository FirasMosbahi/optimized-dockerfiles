from flask import Flask
from flask_demo.core.config import Config
from flask_demo.api.routes import api_bp


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Register blueprints
    app.register_blueprint(api_bp)

    return app