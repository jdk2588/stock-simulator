from application import BaseApp
from handlers import Handlers

class Urls(BaseApp):
    def attach_urls(self):
        self.app.add_url_rule("/", view_func=Handlers.root)
        self.app.add_url_rule("/add-stock", view_func=Handlers.add_stock, methods=['POST'])
        self.app.add_url_rule("/view-stock", view_func=Handlers.view_stock, methods=['GET'])
        self.app.add_url_rule("/return_stock_values", view_func=Handlers.return_stock, methods=['GET'])
