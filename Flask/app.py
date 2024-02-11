# from flask import Flask, render_template, request, redirect, url_for
# from barcode_scanner import scan_barcode

# app = Flask(__name__)

# @app.route('/')
# def home():
#     return render_template('index.html')

# @app.route('/scan')
# def scan():
#     scan_barcode()
#     return redirect(url_for('home'))

# if __name__ == '__main__':
#     app.run(debug=True)
# app.py

from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from models import db, Component
import cv2
from pyzbar.pyzbar import decode
from PIL import Image

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data1.db'
app.secret_key = 'your_secret_key'  # Add a secret key for session

# Initialize SQLAlchemy with the Flask app
db.init_app(app)


# Main route for displaying components and adding new ones
@app.route('/', methods=['GET', 'POST'])
def index():

    # Check if 'products' key exists in session, if not, initialize it as an empty list
    if 'products' not in session:
        session['products'] = []

    components = Component.query.all()
    cap = cv2.VideoCapture(0)

    while True:
        ret, img = cap.read()
        cv2.imshow("camera", img)

        # Convert the NumPy array to a PIL Image
        image_barcode = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

        decoded = decode(image_barcode)

        if decoded:
            session['barcode'] = decoded[0].data.decode("utf-8")
            break

        if cv2.waitKey(10) == 27:
            break

    cap.release()
    cv2.destroyAllWindows()
    return render_template('index.html', components=components)


# Route to handle barcode checking
@app.route('/check_barcode', methods=['POST'])
def check_barcode():

    # Check if 'products' key exists in session, if not, initialize it as an empty list
    if 'products' not in session:
        session['products'] = []
    # if 'barcode' not in session:
    #     session['barcode'] = []
    # Decode the barcode
        barcodes = session.get('barcode')

    barcode = session.get('barcode')

    if barcode:
        # Extract barcode data
        barcode_data = barcode
        # Check if the barcode exists in the database
        component = Component.query.filter_by(barcode=barcode_data).first()
        if component:
            # Add the found component to the session's products list
            session['products'].append(component)
            return render_template('product_details.html', component=component)
        else:
            return "Product not found!"
    else:
        return "No barcode detected in the image."


if __name__ == '__main__':
    app.run(debug=True)
