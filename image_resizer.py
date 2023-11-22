from PIL import Image
import os
import shutil


def resize_and_copy_images(input_folder, output_folder, target_size):
    # Eğer hedef klasör yoksa oluştur
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Giriş klasöründeki dosya listesini al
    files = os.listdir(input_folder)

    for file_name in files:
        input_path = os.path.join(input_folder, file_name)

        # Dosyanın bir resim dosyası olup olmadığını kontrol et
        if os.path.isfile(input_path) and file_name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            output_path = os.path.join(output_folder, file_name)

            # Resmi aç
            with Image.open(input_path) as img:
                # Resmi yeniden boyutlandır
                resized_img = img.resize(target_size)

                # Yeni resmi kaydet
                resized_img.save(output_path)

    print("İşlem tamamlandı.")


# Kullanım örneği
input_folder = r"dataset\valid\seborrheic_keratosis"
output_folder = r"dataset\valid\seborrheic_keratosis_n"
target_size = (224, 224)  # Hedef boyut (genişlik, yükseklik)

resize_and_copy_images(input_folder, output_folder, target_size)
