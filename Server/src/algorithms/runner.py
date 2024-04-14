import os
import imageio

from datetime import datetime

import src.arguments as ah

from src.algorithms.unsharping_mask import UM
from src.algorithms.clahe import CLAHE
from src.algorithms.hef import HEF

class AlgorithmRunner:
	def __init__(self):
		self.arg_handler	= ah.ArgumentHandler()
		self.algorithm		= 'hef'
		self.image				= "images/020.jpg"
		self.images_path	= "uploads"
		output_path = self.arg_handler.get_output_path()
		if output_path:
			self.results_path = output_path
		else:
			self.results_path	= os.path.join("static")

		os.makedirs(self.results_path, exist_ok=True)

	def __del__(self):
		self.algorithm		= ''
		self.image				= ''
		self.images_path	= ''
		self.results_path	= ''

	def run(self,filepath,algo,filter,d0,d1):
		'''Runs the algorithm in the images.'''
		self.algorithm = algo
		self.image=filepath
		if self.images_path:
			images = os.listdir(self.images_path)
			path = self.images_path

		else:
			# We put in a list to be able to utilize the for loop
			images = [self.image]
			path = ""

		split_image = images[0].split('/')
		if len(split_image) != 1:
			self.image = split_image[-1]
		else:
			self.image = images[0]
		

			processed_image = self.__run_algorithm(images[0], path, d0,d1,filter)
			t = datetime.now()
			name = self.image.split(".")[0]
			filename = f"{t.hour}_{t.minute}_{t.second}_{name}.jpg"
			imageio.imwrite(os.path.join(self.results_path, filename), processed_image)
			return [self.results_path, filename]

	def __run_algorithm(self, image, path, d0,d1 = 0,filter=1):
		'''Runs the algorithm in the image.

		Parameters:
			image: image filename.
			path: image directory.

		Returns the processed image.
		'''

		img = os.path.join(path, image)
		alg = None

		# UM (Unsharping Mask)
		if self.algorithm == 'um':
			alg = UM(img,d0,d1,filter)
		# CLAHE
		if self.algorithm == 'clahe':
			alg = CLAHE(img, self.results_path)
		# HEF
		if self.algorithm == 'hef':
			alg = HEF(img, self.results_path,d0)

		try:
			image = alg.run()
		except Exception as e:
			print(e)
		else:
			# return {"fileName": self.results_path,"image":image}
			return image