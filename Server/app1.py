from flask import Flask,redirect, render_template, send_from_directory, url_for
from flask_uploads import UploadSet, IMAGES, configure_uploads
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import SubmitField

from src.algorithms.runner import AlgorithmRunner

app = Flask(__name__)
app.config['SECRET_KEY'] = "abc"
app.config['UPLOADED_PHOTOS_DEST'] = 'uploads'

photos = UploadSet('photos',IMAGES)
configure_uploads(app,photos)

class UploadForm(FlaskForm):
	photo = FileField(
		validators=[
			FileAllowed(photos, 'Only images are allowed'),
			FileRequired("File field should not be empty")
		]
	)

	submit = SubmitField('Upload')

@app.route('/uploads/<filename>')
def get_uploads(filename):
	return send_from_directory(app.config['UPLOADED_PHOTOS_DEST'],	filename)

@app.route('/', methods=["GET","POST"])
def index():
	form = UploadForm()
	if form.validate_on_submit():
		filename = photos.save(form.photo.data)
		file_url = url_for('get_uploads',filename=filename)
		fileNewUrl = "send/"+file_url.replace('/','&')
	else:
		file_url=None
		fileNewUrl = "/"
	#end here
	return render_template('index.html',form = form, file_url = file_url,fileNewUrl = fileNewUrl)
	

@app.route('/send/<filepath>')
def send(filepath):
	file_new_path = filepath.replace("&","/")
	print(file_new_path)
	ar = AlgorithmRunner()
	fileName = ar.run(file_new_path)
	# print(f"/{filename}")
	return render_template("index.html",fileName=fileName)
	# return fileName
	# return render_template("index.html")
	




# def main():)
# 	ar = AlgorithmRunner()
# 	ar.run()

if __name__ == "__main__":
	app.run(debug=True)