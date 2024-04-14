from flask import Flask,redirect, render_template, send_from_directory, url_for, json, request, jsonify, send_file
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_uploads import UploadSet, IMAGES, configure_uploads
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import SubmitField

from src.algorithms.runner import AlgorithmRunner

app = Flask(__name__)
app.config['SECRET_KEY'] = "abc"
app.config['UPLOADED_PHOTOS_DEST'] = 'uploads'
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# photos = UploadSet('photos',IMAGES)
# configure_uploads(app,photos)

# class UploadForm(FlaskForm):
# 	photo = FileField(
# 		validators=[
# 			FileAllowed(photos, 'Only images are allowed'),
# 			FileRequired("File field should not be empty")
# 		]
# 	)

# 	submit = SubmitField('Upload')

@app.route('/upload',methods=['POST','GET'])
# def get_uploads(filename):
# 	return send_from_directory(app.config['UPLOADED_PHOTOS_DEST'],	filename)
def upload_file():
    # check if the post request has the file part
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
            filename = os.path.join(app.config['UPLOAD_FOLDER'],secure_filename(file.filename))
            file.save(filename)
            file_new_path = filename.replace("\\","&")
 
            # newFile = Image(title=filename)
            # db.session.add(newFile)
            # db.session.commit()
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
	# form = UploadForm()
	# if form.validate_on_submit():
	# 	filename = photos.save(form.photo.data)
	# 	file_url = url_for('get_uploads',filename=filename)
	# 	fileNewUrl = "send/"+file_url.replace('/','&')
	# else:
	# 	file_url=None
	# 	fileNewUrl = "/"
	# #end here
	# return render_template('index.html',form = form, file_url = file_url,fileNewUrl = fileNewUrl)
	return render_template('index.html')
	

@app.route('/send/<filepath>')
def send(filepath):
    file_new_path = filepath.replace("&","/")
    ar = AlgorithmRunner()
    fileName = ar.run(file_new_path)
    # res = jsonify({
    #     "message": "Successfully created",
    #     "status": "success",
    #     "file": send_file(fileName[0]+'/'+fileName[1], mimetype='image/jpg')
    # })
    return send_file(fileName[0]+'/'+fileName[1], mimetype='image/jpg')
# def send(filepath):
# 	# file_new_path = filepath.replace("&","/")
# 	# print(file_new_path)
# 	ar = AlgorithmRunner()
# 	fileName = ar.run(filepath)
# 	# print(f"/{filename}")
# 	return render_template("index.html",fileName=fileName)
# 	# return fileName
# 	# return render_template("index.html")
	




# def main():)
# 	ar = AlgorithmRunner()
# 	ar.run()

if __name__ == "__main__":
	app.run(debug=True)