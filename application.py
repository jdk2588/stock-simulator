import settings
from flask import Flask

class BaseApp(object):
    def __init__(self, *args, **kwargs):
        self.app = Flask(__name__)

    def run(self, *args, **kwargs):
        self.app.run(*args, **kwargs)
