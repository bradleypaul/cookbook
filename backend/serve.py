from waitress import serve
from api import app

serve(app, listen="*:8083")
