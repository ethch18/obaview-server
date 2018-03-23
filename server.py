# # from bottle import Bottle, hook, request, response, route, run, template
# from bottle import Bottle, route, run
# # from constants import *
# # import requests as rq
# # from secret import KEY
# app = Bottle()

# KEY='TEST'

# # # hacky fix for port mangling, hopefully this won't be an issue later on
# # @app.hook('after_request')
# # def set_cors():
# #     response.headers['Access-Control-Allow-Origin'] = '*'
# #     response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS' 
# #     response.headers['Access-Control-Allow-Headers'] = 'Authorization, Origin, Accept, Content-Type, X-Requested-With'

# # @route('/', method = 'OPTIONS')
# # @route('/<path>', method = 'OPTIONS')
# # def options_handler(path = None):
# #     return

# @app.route('/')
# def greet(name='Stranger'):
#     return 'Hello there!' 

# # def make_request(url, request_id):
# #     if not request_id:
# #         return 'BUT IT FAILED!'
# #     request_url = '{0}{1}.json?key={2}'.format(url, request_id, KEY)
# #     print(request_url)
# #     response = rq.get(request_url)
# #     return response.json()

# # @app.route('/stops-for-route/<route_id>')
# # def stops_for_route(route_id):
# #     return make_request(STOPS_FOR_ROUTE, route_id)

# # @app.route('/stop/<stop_id>')
# # def stop(stop_id):
# #     return make_request(STOP, stop_id)

# # @app.route('/arrivals-departures/<stop_id>')
# # def arrivals_departures(stop_id):
# #     return make_request(ARR_DEP, stop_id)

# if __name__ == '__main__':
#     app.run()
