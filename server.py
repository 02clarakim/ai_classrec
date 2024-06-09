from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import tensorflow as tf
import mimetypes
from studentDB import get_student_info  # Import the get_student_info function
from college import Colleges

mimetypes.add_type('application/javascript', '.jsx')

app = Flask(__name__, static_folder='static', static_url_path='')
cors = CORS(app, origins="*")

model_so = tf.keras.models.load_model('model/So.keras')
model_jr = tf.keras.models.load_model('model/J.keras')
model_sr = tf.keras.models.load_model('model/S.keras')

# data processing functions
def get_college_tier(college):
    index = Colleges.index(college)
    if index <= 25:
        return 1
    elif index <= 60:
        return 2
    elif index <= 100:
        return 3
    else:
        return 4

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

@app.route('/receiveData', methods=['POST'])
def receive_form_data():
    data = request.json  # Retrieve JSON data from the request body
    student_id = int(data.get('studentID'))
    
    student_info = get_student_info(student_id)
    
    college_tier = get_college_tier(data.get('desiredCollege'))

    form_data = {
        "tier": college_tier,
        "field": data.get('desiredField'),
        "first_gen": data.get('firstGenStatus'),
        "gender": data.get('gender'),
        "income": int(data.get('parentsIncome')),
        "race": data.get('race')
    }
    
    response = {
        "student_info": student_info,
        "form_data": form_data,
    }

    # predict(response.form_data, response.student_info)
    
    return jsonify(response)

# Define a function to handle the prediction
@tf.function
def predict(form_data, student_info):
    if (student_info.level == 'Freshman'):
        model = model_so
    elif (student_info.level == 'Sophomore'):
        model = model_jr
    else:
        model = model_sr
    
    return model(data)

     
# Running app
if __name__ == '__main__':
    app.run(debug=True)