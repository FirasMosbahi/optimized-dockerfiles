"""WSGI entry point for production deployment."""
from flask_demo import create_app

app = create_app()

if __name__ == "__main__":
    app.run()
