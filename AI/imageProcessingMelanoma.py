
import cv2
import os

# Flask örneği
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/goruntu-isleme', methods=['POST'])
def goruntu_isleme_api():
    # Görüntü işleme sonuçlarını al
    # ...

    # Sonuçları JSON formatına dönüştür
    sonuclar_json = {"sonuc": "Görüntü işleme başarılı"}

    # JSON yanıtını gönder
    return jsonify(sonuclar_json)

if __name__ == '__main__':
    app.run(debug=True)

def imageProcessing(inputFolderPath, outputFolderPath):
    for index,im in enumerate(os.listdir(path=inputFolderPath)):
        src =cv2.imread(inputFolderPath + im)

        grayScale = cv2.cvtColor(src, cv2.COLOR_RGB2GRAY )
        kernel = cv2.getStructuringElement(1 ,(17 ,17))

        blackhat = cv2.morphologyEx(grayScale, cv2.MORPH_BLACKHAT, kernel)

        ret ,thresh2 = cv2.threshold(blackhat ,10 ,255 ,cv2.THRESH_BINARY)

        dst = cv2.inpaint(src ,thresh2 ,1 ,cv2.INPAINT_TELEA)

        grayScaleDst = cv2.cvtColor(dst, cv2.COLOR_RGB2GRAY)
        _, thresh3 = cv2.threshold(grayScaleDst, 0, 255, cv2.THRESH_BINARY_INV + +cv2.THRESH_OTSU)
        img_after_seg = cv2.bitwise_and(dst, dst, mask=thresh3)

        cv2.imwrite(outputFolderPath+str(index)+".jpg",img_after_seg)


imageProcessing("dataset/train/melanoma_n/","dataset_image_processing/train/melanoma/")
imageProcessing("dataset/train/nevus_n/","dataset_image_processing/train/nevus/")
imageProcessing("dataset/train/seborrheic_keratosis_n/","dataset_image_processing/train/seborrheic_keratosis/")
imageProcessing("dataset/test/melanoma_n/","dataset_image_processing/test/melanoma/")
imageProcessing("dataset/test/nevus_n/","dataset_image_processing/test/nevus/")
imageProcessing("dataset/test/seborrheic_keratosis_n/","dataset_image_processing/test/seborrheic_keratosis/")
imageProcessing("dataset/valid/melanoma_n/","dataset_image_processing/valid/melanoma/")
imageProcessing("dataset/valid/nevus_n/","dataset_image_processing/valid/nevus/")
imageProcessing("dataset/valid/seborrheic_keratosis_n/","dataset_image_processing/valid/seborrheic_keratosis/")




