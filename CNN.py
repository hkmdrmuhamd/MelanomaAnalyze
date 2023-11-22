

import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Veri yolu ve sınıfları ayarlayın
train_data_dir = "dataset/train/"
test_data_dir = "dataset/test/"
class_names = ["melanoma_n", "nevus_n","seborrheic_keratosis_n"]  # Sınıf isimleri






# Veri artırma (data augmentation) konfigürasyonu
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

test_datagen = ImageDataGenerator(rescale=1./255)

# Eğitim verilerini yükleyin ve veri artırma uygulayın
train_generator = train_datagen.flow_from_directory(
    train_data_dir,
    target_size=(224, 224),  # Resim boyutları
    batch_size=1,
    class_mode='categorical'
)

# Test verilerini yükleyin
test_generator = test_datagen.flow_from_directory(
    test_data_dir,
    target_size=(224, 224),
    batch_size=1,
    class_mode='categorical'
)

# CNN modelini oluşturun
model = Sequential()
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)))
model.add(MaxPooling2D((2, 2)))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D((2, 2)))
model.add(Conv2D(128, (3, 3), activation='relu'))
model.add(MaxPooling2D((2, 2)))
model.add(Flatten())
model.add(Dense(1024, activation='relu'))

model.add(Dense(512, activation='relu'))

model.add(Dense(256, activation='relu'))

model.add(Dense(len(class_names), activation='softmax'))

# Modeli derleyin
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Modeli eğitin
model.fit(train_generator, epochs=5, validation_data=test_generator)

# Modeli değerlendirin
accuracy = model.evaluate(test_generator)[1]
print(f"Test Accuracy: {accuracy}")


