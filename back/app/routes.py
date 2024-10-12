from flask import Blueprint, request, jsonify
import time
from .utils import send_to_rabbitmq

main_routes = Blueprint('main_routes', __name__)

@main_routes.route('/api/pay', methods=['POST'])
def process_payment():
    payment_data = request.json
    send_to_rabbitmq(payment_data)
    
    time.sleep(5)
    
    return jsonify({"message": "Payment sent to queue!"}), 200
