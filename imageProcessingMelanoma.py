

import cv2
import os



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


imageProcessing(r"C:\Users\selam\githubCodes\BenAnalizi\input\skin-cancer-mnist-ham10000\HAM10000_images_part_1/",
                r"C:\Users\selam\githubCodes\BenAnalizi\input\skin-cancer-mnist-ham10000\HAM10000_images_part_1/")
imageProcessing(r"C:\Users\selam\githubCodes\BenAnalizi\input\skin-cancer-mnist-ham10000\HAM10000_images_part_2/",
                r"C:\Users\selam\githubCodes\BenAnalizi\input\skin-cancer-mnist-ham10000\HAM10000_images_part_2/")





