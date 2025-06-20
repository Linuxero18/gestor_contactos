from flask import Flask
from flask_cors import CORS
from routes.contactosRoutes import contactos

app = Flask(__name__)
CORS(app)

# Registrar el blueprint de contactos
app.register_blueprint(contactos, url_prefix='/api')

@app.route('/')

def index():
    return "API de Gestión de Contactos - Bienvenido"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5555, threaded=True)