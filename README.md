# AI Class Recommendation System

A web application that predicts suitable courses and college recommendations for students using machine learning models. The project consists of a **frontend** (React/Node) and a **backend** (Flask + TensorFlow).

Project is live on https://ai-classrec.onrender.com/.

## 🖥 Project Structure
```
ai_classrec/
├─ backend/ # Flask API + ML models
│ ├─ server.py
│ ├─ requirements.txt
│ ├─ model/ # Pre-trained TensorFlow models
│ └─ Dockerfile
├─ frontend/ # React frontend
│ ├─ src/
│ ├─ public/
│ ├─ package.json
│ └─ Dockerfile
├─ docker-compose.yml
└─ README.md
```
## ⚡ Features

- Predict student performance and course recommendations.
- Suggest suitable colleges based on student profile.
- Fully containerized using Docker for easy deployment.
- Deployable on [Render](https://render.com/) for free hosting.


## 🚀 Local Development

### Backend
```bash
cd backend
# build Docker image
docker build -t ai-classrec-backend .

# run backend
docker run -p 5000:5000 ai-classrec-backend
