from flask_cors import CORS
from flask import Flask
from server.nastables.views import nastables_blueprint

#Load this config object for development mode

app = Flask(__name__, static_folder='./static/dist', template_folder='./static')
app.register_blueprint(nastables_blueprint)

def main():
    cors = CORS()
    cors = CORS(app)
    app.config.from_object('configurations.DevelopmentConfig')
    app.config['JSON_SORT_KEYS'] = False
    app.run(threaded=True,debug=True)




if __name__ == "__main__":
    main()
