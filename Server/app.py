from flask import Flask,redirect, render_template, send_from_directory, url_for, json, request, jsonify, send_file
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

from src.algorithms.runner import AlgorithmRunner

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = "abc"
app.config['UPLOADED_PHOTOS_DEST'] = 'uploads'
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload',methods=['POST','GET'])
def upload_file():
    if 'files[]' not in request.files:
        resp = jsonify({
            "message": 'No file part in the request',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp
  
    files = request.files.getlist('files[]')
      
    errors = {}
    success = False
      
    for file in files:      
        if file and allowed_file(file.filename):
            # filename = os.path.join(app.config['UPLOAD_FOLDER'],secure_filename(file.filename))
            filename = os.path.join(app.config['UPLOAD_FOLDER'],secure_filename("uploaded."+file.filename.rsplit('.', 1)[1].lower()))
            file.save(filename)
            file_new_path = filename.replace("\\","&")
            success = True
        else:
            resp = jsonify({
                "message": 'File type is not allowed',
                "status": 'failed'
            })
            return resp
         
    if success and errors:
        errors['message'] = 'File(s) successfully uploaded'
        errors['status'] = 'failed'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    if success:
        resp = jsonify({
            "message": 'Files successfully uploaded',
            "status": 'success',
            "fileUrl": file_new_path
        })
        resp.status_code = 201
        print(file_new_path)
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp

@app.route('/', methods=["GET","POST"])
def index():
	return render_template('index.html')
	

@app.route('/send/hef/<filepath>/<d0>')
def sendHef(filepath,d0):
    file_new_path = filepath.replace("&","/")
    ar = AlgorithmRunner()
    fileName = ar.run(file_new_path,'hef',0,int(d0),0)
    
    return send_file(fileName[0]+'/'+fileName[1], mimetype='image/jpg')


@app.route('/send/um/<filter>/<filepath>/<d0>/<d1>')
def sendUm(filter,filepath,d0,d1):
    file_new_path = filepath.replace("&","/")
    ar = AlgorithmRunner()
    fileName = ar.run(file_new_path,'um', int(filter), int(d0), int(d1))
    
    return send_file(fileName[0]+'/'+fileName[1], mimetype='image/jpg')

@app.route('/send/clahe/<filepath>')
def sendClache(filepath):
    file_new_path = filepath.replace("&","/")
    ar = AlgorithmRunner()   
    fileName = ar.run(file_new_path,'clahe',0,0,0)
    
    return send_file(fileName[0]+'/'+fileName[1], mimetype='image/jpg')

@app.route('/send/clahe/graph')
def sendGraph():
    return send_file('static/histograms.jpg',mimetype='image/jpg')

if __name__ == "__main__":
	app.run(debug=True)