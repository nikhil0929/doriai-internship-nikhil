import torch

def predictImage(filePath):
    # Model
    model = torch.hub.load('ultralytics/yolov5', 'yolov5s')  # or yolov5m, yolov5l, yolov5x, custom

    # Images
    img = filePath  # or file, Path, PIL, OpenCV, numpy, list

    # Inference
    results = model(img)

    results.print()

    # Results
    results.save("./predictedImages")  # or .show(), .save(), .crop(), .pandas(), etc.
