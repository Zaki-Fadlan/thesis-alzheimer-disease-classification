from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from keras.preprocessing import image
from keras.models import load_model
from PIL import Image

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the trained model
model = load_model("model.h5")
# model.compile(loss='binary_crossentropy',
#               optimizer='rmsprop',
#               metrics=['accuracy'])


@app.route("/")
def hello_world():
    response = jsonify({'message': 'Hello World'})
    return response


@app.route("/classify", methods=["POST"], strict_slashes=False)
def classify():
    if request.method == "POST":
        if 'img' in request.files:
            img_file = request.files['img']
            # Menggunakan PIL untuk membuka gambar dari objek FileStorage
            img = Image.open(img_file)
            img = img.convert('L')  # Convert to grayscale
            print("Dimensi gambar sebelum preprocessing:", img.size)
            # Preprocessing gambar
            img = img.resize((128, 128))
            print("Dimensi gambar setelah preprocessing:", img.size)
            x = image.img_to_array(img)
            print("Dimensi array gambar:", x.shape)
            x = np.expand_dims(x, axis=0)
            print("Dimensi array gambar setelah di-expand:", x.shape)
            images = np.vstack([x])
            print("Dimensi array gambar setelah di-stack:", images.shape)
            # Prediksi probabilitas untuk setiap kelas
            predictions = model.predict(images, batch_size=10)
            # Mengambil kelas dengan probabilitas tertinggi
            predicted_class = np.argmax(predictions, axis=1)
            print(predicted_class)
            return jsonify({'data': predicted_class}, 200)
        else:
            return jsonify({'message': 'Key \'img\' tidak ditemukan di dalam request.files'}, 400)
    return jsonify({'message': 'Metode yang diizinkan adalah POST'}, 405)


if __name__ == "__main__":
    app.run()
