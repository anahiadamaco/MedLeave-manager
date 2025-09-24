from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # Configuración
    app.config.from_object('app.config.config.Config')
    
    # Extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Blueprints (Rutas)
    from app.routes.auth_routes import auth_bp
    from app.routes.user_routes import user_bp
    from app.routes.medical_routes import medical_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(medical_bp, url_prefix='/api/medical')
    
    # Health check
    @app.route('/')
    def health_check():
        return {'status': 'OK', 'service': 'Flask API', 'version': '1.0.0'}
    
    @app.route('/api/health')
    def api_health():
        return {'status': 'OK', 'database': 'connected'}
    
    return app