import pika
import json
import openpyxl
from openpyxl import Workbook
import os

def send_to_rabbitmq(payment_data):
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='paymentQueue', durable=True)

    channel.basic_publish(
        exchange='',
        routing_key='paymentQueue',
        body=json.dumps(payment_data),
        properties=pika.BasicProperties(delivery_mode=2)
    )
    print(f" [x] Sent to queue: {payment_data}")

    connection.close()

def save_to_excel(payment_data):
    file_name = 'payments.xlsx'

    if not os.path.exists(file_name):
        workbook = Workbook()
        sheet = workbook.active
        sheet.append(['Card Holder Name', 'Card Number', 'Expiry Date', 'CVV', 'Amount'])
        workbook.save(file_name)

    workbook = openpyxl.load_workbook(file_name)
    sheet = workbook.active

    sheet.append([
        payment_data['cardHolderName'],
        payment_data['cardNumber'],
        payment_data['expiryDate'],
        payment_data['cvv'],
        payment_data['amount']
    ])

    workbook.save(file_name)
    print(f" [x] Payment data saved to {file_name}")
