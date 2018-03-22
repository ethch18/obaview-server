from bottle import Bottle, route, run, template
from constants import *
import requests as rq
from secret import KEY
app = Bottle()

@app.route('/hello')
@app.route('/hello/<name>')
def greet(name='Stranger'):
    return template('Hello {{name}}, how are you?', name=name)

def make_request(url, request_id):
    if not request_id:
        return 'BUT IT FAILED!'
    request_url = '{0}{1}.json?key={2}'.format(url, request_id, KEY)
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
    return make_request(ARR_DEP, stop_id)

app.run(host='localhost', port=8080, debug=True)