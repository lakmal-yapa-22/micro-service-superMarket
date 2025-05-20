from flask import Flask, jsonify
import py_eureka_client.eureka_client as eureka_client

app = Flask(__name__)

CONTEXT_PATH = "/customer-service"
SERVICE_PORT = 5000
EUREKA_SERVICE = "http://localhost:8761/eureka/"

eureka_client.init(
    eureka_server=EUREKA_SERVICE,
    app_name="CUSTOMER-SERVICE",
    instance_port=SERVICE_PORT
)

@app.route(f'{CONTEXT_PATH}/customers', methods=["GET"])
def get_customer():
    customers = [
        {"id":1,"name":"John Doe"},
        {"id":2,"name":"John Doe"}
    ]
    return jsonify(customers)

app.run(port = SERVICE_PORT)