from flask import Flask, jsonify, send_from_directory, request, json
import numpy
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

race_index = {'Asian/Pacific Islander':0, 'Black':1, 'Hispanic/Latinx':2, 'Native American':3, 'White':4}
gender_index = {'Male':0, 'Female':1, 'Other':2}
field_index = {'Arts':0, 'Business/Econ':1, 'Humanities':2, 'Pre-Med':3, 'STEM':4, 'Social Sciences':5}

courses_index = {
    "English I": 0, "English II": 1, "English III": 2,"English IV": 3, "Creative Writing": 4,
    "American Literature": 5, "Journalism": 6, "Debate": 7, "AP Language & Composition": 8, "AP Literature & Composition": 9,
    "Algebra I": 10, "Algebra II": 11, "Trigonometry": 12, "Geometry": 13, "AP Calculus AB": 14, "AP Calculus BC": 15,
    "Statistics": 16, "Probability": 17, "AP Statistics": 18, "Biology": 19, "Biology Honors": 20, "AP Biology": 21,
    "Chemistry": 22, "Chemistry Honors": 23, "AP Chemistry": 24, "Physics": 25, "Physics Honors": 26,
    "AP Physics 1": 27, "AP Physics 2": 28, "AP Physics C: Mechanics": 29, "AP Physics C: Electricity/Magnetism": 30,
    "AP World History": 31, "AP US History": 32, "AP European History": 33, "AP Psychology": 34, "AP Macroeconomics": 35, "AP Microeconomics": 36,
    "AP Human Geography": 37, "Economics": 38, "Civics": 39, "AP Computer Science A": 40, "AP Computer Science Principles": 41,
    "AP Art History": 42, "AP Studio Art 2D": 43, "AP Studio Art 3D": 44, "Theater": 45, "Music": 46,
    "AP US Government and Politics": 47, "AP Japanese": 48, "AP Chinese": 49, "AP German": 50,
    "French I": 51, "French II": 52, "French III": 53, "French IV": 54, "AP French": 55,
    "Spanish I": 56, "Spanish II": 57, "Spanish III": 58, "Spanish IV": 59, "AP Spanish": 60
}

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

def get_character(form_data):
    race = [0,0,0,0,0]
    race[race_index[form_data["race"]]] = 1

    gender = [0,0,0]
    gender[gender_index[form_data["gender"]]] = 1

    if form_data["first_gen"] == 'Yes':
        first_gen = [1]
    else:
        first_gen = [0]
    
    parental_earning = [form_data["income"]]

    character = first_gen + parental_earning + race + gender
    return character

def get_college(form_data):
    tier = [form_data["tier"]]

    field = [0,0,0,0,0,0]
    field[field_index[form_data["field"]]] = 1

    college_want = tier + field
    return college_want

def get_courses_grades(student_info):
    class_year = ['Freshman', 'Sophomore', 'Junior']

    if (student_info["level"] == 'Freshman'):
        loop = 1
    elif (student_info["level"] == 'Sophomore'):
        loop = 2
    else:
        loop = 3

    classes_grades = [0] * 61

    for i in range(loop):
        courses = student_info['prevClasses'][class_year[i]]
        grades = []

        for course, grade in courses:
            classes_grades[courses_index[course]] = 1
            grades.append(grade)

        classes_grades.extend(grades)
    
    return classes_grades

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

    recommendation = predict(response["student_info"], response["form_data"])
    
    recommendation = recommendation.numpy().tolist()
    print(recommendation)

    return json.dumps(recommendation, default=str)

# Define a function to handle the prediction
@tf.function
def predict(student_info, form_data):

    character = get_character(form_data)
    college_want = get_college(form_data)
    courses_grades = get_courses_grades(student_info)
    
    if (student_info["level"] == 'Freshman'):
        model = model_so
    elif (student_info["level"] == 'Sophomore'):
        model = model_jr
    else:
        model = model_sr
    
    # return model(courses_grades, character, college_want)
    return model([tf.constant([courses_grades]), tf.constant([character]), tf.constant([college_want])])

     
# Running app
if __name__ == '__main__':
    app.run(debug=True)