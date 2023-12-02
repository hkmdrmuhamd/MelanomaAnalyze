import cv2
# ISIC_0001119.jpg

src = cv2.imread("dataset/train/melanoma_n/ISIC_0001119.jpg")

grayScale = cv2.cvtColor(src, cv2.COLOR_RGB2GRAY)

kernel = cv2.getStructuringElement(1, (17, 17))

blackhat = cv2.morphologyEx(grayScale, cv2.MORPH_BLACKHAT, kernel)

_, thresh2 = cv2.threshold(blackhat, 10, 255, cv2.THRESH_BINARY)

dst = cv2.inpaint(src, thresh2, 1, cv2.INPAINT_TELEA)
grayScaleDst = cv2.cvtColor(dst, cv2.COLOR_RGB2GRAY)
_, thresh3 = cv2.threshold(grayScaleDst, 0, 255,cv2.THRESH_BINARY_INV+ +cv2.THRESH_OTSU)
img_after_seg=cv2.bitwise_and(dst,dst,mask=thresh3)
cv2.imshow("orijinal gorsel",src)
cv2.imshow("gray gorsel",grayScale)
cv2.imshow("blackhat gorsel",blackhat)
cv2.imshow("after processing 1",dst)
cv2.imshow("maske",thresh3)
cv2.imshow("after processing 2",img_after_seg)
cv2.waitKey(0)


