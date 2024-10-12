import pika
import json
from .utils import save_to_excel

def callback(ch, method, properties, body):
    payment_data = json.loads(body)
    print(f" [x] Received payment data: {payment_data}")

    save_to_excel(payment_data)

    ch.basic_ack(delivery_tag=method.delivery_tag)

def start_consumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='paymentQueue', durable=True)
    channel.basic_consume(queue='paymentQueue', on_message_callback=callback)

    print(' [*] Waiting for messages.')
    channel.start_consuming()

if __name__ == '__main__':
    start_consumer()
