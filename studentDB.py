# Define the StudentDB array
StudentDB = [
    {
        "sid": 20239999,
        "name": "Clara Kim",
        "level": "Freshman",
        "prevClasses": {
            "Freshman": [
                ["English I", 4.0], ["Algebra I", 4.0], ["Biology Honors", 4.0], 
                ["Spanish I", 3.7], ["AP European History", 3.7], ["Physics Honors", 3.7]
            ]
        }
    },
    {
        "sid": 20241111,
        "name": "John Doe",
        "level": "Sophomore",
        "prevClasses": {
            "Freshman": [
                ["English I", 3.7], ["Geometry", 3.3], ["Biology", 4.0], 
                ["Theater", 3.0], ["AP Psychology", 3.7], ["Music", 3.7]
            ],
            "Sophomore": [
                ["English II", 3.7], ["Journalism", 4.0], ["Chemistry", 3.0],
                ["AP Studio Art 2D", 4.0], ["Trigonometry", 3.7], ["AP Human Geography", 3.7]
            ]
        }
    },
    {
        "sid": 20242020,
        "name": "Alexander Grey",
        "level": "Junior",
        "prevClasses": {
            "Freshman": [
                ["English I", 3.3], ["Algebra I", 3.7], ["Biology Honors", 3.3], 
                ["French I", 4.0], ["AP World History", 3.7], ["Music", 3.7]
            ],
            "Sophomore": [
                ["English II", 3.7], ["AP Statistics", 3.7], ["Chemistry Honors", 3.7],
                ["French II", 3.7], ["AP European History", 3.7], ["Economics", 4.0]
            ],
            "Junior": [
                ["AP Language & Composition", 3.7], ["AP Calculus AB", 4.0], ["AP Computer Science Principles", 3.3],
                ["French III", 3.7], ["AP US History", 3.7], ["AP Macroeconomics", 4.0]
            ]
        }
    }
    # Add more student data as needed
]

# Define the getStudentInfo function
def get_student_info(studentID):
    student = next((student for student in StudentDB if student["sid"] == studentID), None)
    return student if student else None
