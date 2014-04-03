import json
import flask
from flask import request, jsonify
from flask import render_template
from brownian import return_data

class Handlers(object):

    @classmethod
    def root(self):
        return render_template('home.html')

    @classmethod
    def add_stock(self):
        pass

    @classmethod
    def view_stock(self):
        return render_template('show_stock.html')

    @classmethod
    def return_stock(self):
        data = return_data()
        response = flask.make_response(json.dumps(data))
        response.content_type = 'application/json'
        return response
