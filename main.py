from bottle import Bottle, response, template
from constants import *
import requests as rq
import argparse
from secret import KEY

app = Bottle()

DEBUG = False

# hacky fix for port mangling, hopefully this won't be an issue later on
@app.hook('after_request')
def set_cors():
    if DEBUG:
        print('Running in DEBUG mode, all origins allowed')
        response.headers['Access-Control-Allow-Origin'] = '*'
    else:
        response.headers['Access-Control-Allow-Origin'] =  'https://echau18.gitlab.io'
    response.headers['Access-Control-Allow-Origin'] =  'https://echau18.gitlab.io'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS' 
    response.headers['Access-Control-Allow-Headers'] = 'Authorization, Origin, Accept, Content-Type, X-Requested-With'

@app.route('/', method = 'OPTIONS')
@app.route('/<path>', method = 'OPTIONS')
def options_handler(path = None):
    return

@app.route('/')
def greet():
    return 'This is the root for the OBA Mirror API.  You\'re probably in the wrong place - please visit the official OBA API site.'

def make_request(url, request_id, params={}):
    if not request_id:
        return 'BUT IT FAILED!'
    request_url = '{0}{1}.json?key={2}'.format(url, request_id, KEY)
    request_url += ''.join(['&{0}={1}'.format(key, value) for key, value in params.items()])
    print(request_url)
    response = rq.get(request_url)
    return response.json()

@app.route('/stops-for-route/<route_id>')
def stops_for_route(route_id):
    return make_request(STOPS_FOR_ROUTE, route_id)

@app.route('/stop/<stop_id>')
def stop(stop_id):
    return make_request(STOP, stop_id)

@app.route('/arrivals-departures/<stop_id>')
def arrivals_departures(stop_id):
    return make_request(ARR_DEP, stop_id, ARR_DEP_PARAMS)

@app.route('/routes-for-agency/<agency_id>')
def routes_for_agency(agency_id):
    return make_request(ROUTES_FOR_AGENCY, agency_id)

@app.route('/route/<route_id>')
def route(route_id):
    return make_request(ROUTE, route_id)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('--debug', action='store_true', default=False, help='Run server in debug mode (all origins allowed)')
    args = parser.parse_args()

    DEBUG = args.debug

    app.run(server='tornado')
