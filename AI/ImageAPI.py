import requests
from flask import Flask, request
import cv2
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image


data = {'Melanocytic nevi' : 'data',
        'Melanoma' : 'data',
        'Benign keratosis' : 'data',
        'Basal cell carcinoma' : 'data',
        'Actinic keratoses' : 'data',
        'Vascular lesions' : 'data',
        'Dermatofibroma' : 'data'}

app = Flask(__name__)


def show_image(image):
    cv2.imshow("Image", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def processAndPredict(path):
    model = load_model("model.h5")
    img = Image.open(path).resize((100, 75))
    img = img.resize((100, 75))
    img_mean = np.mean(img)
    img_std = np.std(img)
    img = (img - img_mean) / img_std

    img = img.reshape((1, 75, 100, 3))
    print(img.shape)

    pred = model.predict(img)

    print(pred)
    data['Melanocytic nevi'] = str(pred[0][0])
    data['Melanoma'] = str(pred[0][1])
    data['Benign keratosis'] = str(pred[0][2])
    data['Basal cell carcinoma'] = str(pred[0][3])
    data['Actinic keratoses'] = str(pred[0][4])
    data['Vascular lesions'] = str(pred[0][5])
    data['Dermatofibroma'] = str(pred[0][6])
    print(pred)

@app.route("/upload", methods=["POST"])
def upload_image():
    if request.files["image"]:
        image = request.files["image"].read()
        image = cv2.imdecode(np.frombuffer(image, np.uint8), -1)

        cv2.imwrite("cv2Image.jpg",image)
        src = cv2.imread("cv2Image.jpg")

        grayScale = cv2.cvtColor(src, cv2.COLOR_RGB2GRAY)
        kernel = cv2.getStructuringElement(1, (17, 17))

        blackhat = cv2.morphologyEx(grayScale, cv2.MORPH_BLACKHAT, kernel)

        ret, thresh2 = cv2.threshold(blackhat, 10, 255, cv2.THRESH_BINARY)

        dst = cv2.inpaint(src, thresh2, 1, cv2.INPAINT_TELEA)

        grayScaleDst = cv2.cvtColor(dst, cv2.COLOR_RGB2GRAY)
        _, thresh3 = cv2.threshold(grayScaleDst, 0, 255, cv2.THRESH_BINARY_INV + +cv2.THRESH_OTSU)
        img_after_seg = cv2.bitwise_and(dst, dst, mask=thresh3)

        cv2.imwrite("image.jpg", img_after_seg)

        processAndPredict("image.jpg")
        response = requests.post('http://localhost:8085/api/data', json=data)

        if response.status_code == 200:

            return 'Görüntü işleme adımları uygulandı.'
        else:
            return 'Bir hata oluştu:', response.content
    else:
        return "Lütfen bir resim dosyası gönderin"

if __name__ == "__main__":
    app.run(debug=True)