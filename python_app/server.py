'''
Flask Python server which implements HTTP Requests/Responses - GET, POST, PUT, DELETE

Author: Nikhil Aggarwal, June 2021

Notes:
Before starting Flask Server with 'flask run' enter the following commands in terminal:
    - export FLASK_APP=server.py
    - **DEBUG MODE**: export FLASK_ENV=development

    IMPORTANT: IN ORDER FOR THIS API TO WORK:
        - You must have 2 folders in this directory named: 'predictedImages' and 'userFiles'
                - these are where the local files are stored on your machine when the front end sends you a file
        If you do not have these folders, you can create empty folders with these names in this dir
'''
import datetime
import json
from os import path
from os.path import join

import boto3
import flask
import os
from botocore.exceptions import ClientError
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from predict import *

app = Flask(__name__)
UPLOAD_FOLDER = './userFiles/'
ALLOWED_EXTENSIONS = {'png', 'jpeg', 'jpg', 'pdf'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/sendFile": {"origins": "http://localhost:port"}})

'''Amazon S3 variables'''
bucket = 'nikhil-dori-internship'


''' ----> Hello_World API <----'''
@app.route('/')
@app.route('/helloWorld')
@cross_origin()
def home():
    return 'Hello World!'


''' ----> GetJSON API <----'''
@app.route('/getJSON', methods=['GET', 'POST'])
def getJSON():
    if request.method == 'POST':
        data = request.get_json()  # parses the request data as JSON
        data["status"] = "SUCCESS"
        return jsonify(data)


''' ----> Send_File API <----'''
def allowed_file(filename): #helper function
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

'''
This function is called by the user to 
send a file to the server which is stored
locally in UPLOAD_FOLDER
'''
@app.route('/sendFile', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def sendFile():
    jsonStruct = saveLocalFile(request)
    return jsonify(jsonStruct)

def saveLocalFile(req):
    # default jsonStruct
    jsonStruct = '{"status":"FAILURE", "path": null}'
    jsonStruct = json.loads(jsonStruct)
    # check if the post request has the file part
    if 'file' not in req.files:
        print("failed here")
        jsonStruct["statusMessage"] = "Could not write file."
        return jsonStruct
    file = req.files['file']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        jsonStruct["statusMessage"] = "Could not write file."
        return jsonStruct
    if file and allowed_file(file.filename):
        file.filename = getDateFileName()
        filename = secure_filename(file.filename)
        filePath = join(app.config['UPLOAD_FOLDER'], filename)
        try:
            file.save(filePath)
        except:
            jsonStruct["statusMessage"] = "Could not write file."
            return jsonStruct
        jsonStruct["status"] = "SUCCESS"
        jsonStruct["path"] = filePath
        jsonStruct["file_name"] = filename
        return jsonStruct
    else:
        print("file format not allowed!")


def getDateFileName():
    currentDT = datetime.datetime.today()
    return currentDT.strftime("%Y%m%d%H%M%S" + ".jpg")


''' ----> list_files API <----'''
@app.route("/listFiles", methods=['GET'])
@cross_origin()
def listFiles():
    # default jsonStruct
    jsonStruct = '{"status":"SUCCESS", "files": []}'
    jsonStruct = json.loads(jsonStruct)
    files = os.listdir(UPLOAD_FOLDER)
    jsonStruct["files"] = files
    return jsonify(jsonStruct)


''' ----> get_file API <----'''
@app.route("/getFile", methods=['POST'])
@cross_origin()
def getFile():
    requestedfile = request.get_json()
    filename = requestedfile["fileName"]
    filePath = join(app.config['UPLOAD_FOLDER'], filename)
    response = flask.make_response(flask.send_file(filePath))
    response.headers["status"] = "SUCCESS"
    if not path.exists(filePath):
        response.headers["status"] = "FAILURE"
    return response


@app.route("/sendS3File", methods=['POST'])
@cross_origin()
def send_s3_file():
    # default jsonStruct
    jsonStruct = '{"status":"FAILURE", "path": null}'
    jsonStruct = json.loads(jsonStruct)
    # check if the post request has the file part
    if 'file' not in request.files:
        jsonStruct["statusMessage"] = "Could not write file."
        return jsonify(jsonStruct)
    file = request.files['file']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        jsonStruct["statusMessage"] = "Could not write file."
        return jsonify(jsonStruct)
    if file and allowed_file(file.filename):
        file.filename = getDateFileName()
        s3 = boto3.client('s3')
        try:
            s3.upload_fileobj(file, bucket, 'doriMedia/{}'.format(file.filename))
        except ClientError as e:
            jsonStruct["statusMessage"] = "Could not write file."
            return jsonify(jsonStruct)
        jsonStruct["status"] = "SUCCESS"
        jsonStruct["path"] = "/" + file.filename
        return jsonify(jsonStruct)
    else:
        print("file format not allowed!")


@app.route("/getS3File", methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def get_s3_file():
    requestedfile = request.get_json()
    return getFileS3(requestedfile["fileName"], 'dori/')


def getFileS3(filename, dir):
    s3 = boto3.client('s3')

    filePath = join(app.config['UPLOAD_FOLDER'], filename)

    # saving file to local disk
    s3.download_file(bucket, dir + '{}'.format(filename), filePath)

    # get file from local disk and send it in response body back to client
    response = flask.make_response(flask.send_file(filePath))
    response.headers["status"] = "SUCCESS"
    if not path.exists(filePath):
        response.headers["status"] = "FAILURE"
        return response
    os.remove(filePath)  # delete file from local computer (we dont want clutter on local disk)
    return response

@app.route("/listS3Files", methods=['GET'])
@cross_origin()
def list_s3_files():
    return getS3FileList('doriMedia_Predicted/')


def getS3FileList(dirName):
    jsonStruct = '{"status":"SUCCESS", "files": []}'
    jsonStruct = json.loads(jsonStruct)
    s3 = boto3.client('s3')
    response = s3.list_objects_v2(Bucket=bucket, Prefix=dirName)
    fileList = []
    for obj in response["Contents"]:
        objName = obj["Key"]
        if objName == dirName:
            continue
        else:
            objName = objName.replace(dirName, '')
        fileList.append(objName)
    jsonStruct["files"] = fileList
    return  (jsonStruct)

@app.route("/predictImage", methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def predict_image():
    responseJSON = saveLocalFile(request)
    fp = responseJSON["path"]
    predictImage(fp)

    filePath = "predictedImages/" + responseJSON["file_name"]
    response = flask.make_response(flask.send_file(filePath))
    response.headers["status"] = "SUCCESS"
    if not path.exists(filePath):
        response.headers["status"] = "FAILURE"
        return response

    return response

@app.route("/predictImageS3", methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def predict_image_s3():
    # Get image from Dori_Media folder in S3 after user selects it from dropdown select
    #   - Take selected image from useState and put in in request body
    # Call '/predictImageS3':
    #   - Take image in request body and call 'predictImage()' function (saves it in local folder '/predictedImages')
    #   - Take that local file and call 'exportS3()' helper function into 'Dori_media_Predicted' S3 bucket folder

    responseJSON = saveLocalFile(request)
    fp = responseJSON["path"]
    predictImage(fp)

    # default jsonStruct
    jsonStruct = '{"status":"FAILURE", "path": null}'
    jsonStruct = json.loads(jsonStruct)
    fileName = responseJSON["file_name"]
    filePath = "./predictedImages/" + fileName
    # Upload the file
    s3 = boto3.client('s3')
    try:
        s3.upload_file(filePath, bucket, 'doriMedia_Predicted/{}'.format(fileName))
    except ClientError as e:
        jsonStruct["statusMessage"] = "Could not write file."
        return jsonify(jsonStruct)

    response = flask.make_response(flask.send_file(filePath))
    response.headers["status"] = "SUCCESS"
    response.headers["path"] = "/" + fileName
    if not path.exists(filePath):
        response.headers["status"] = "FAILURE"
    return response


@app.route("/getUnpredictedList", methods=['GET'])
@cross_origin()
def listPredictableImages():
    return getS3FileList('doriMedia/')

@app.route("/getUnpredictedImage", methods=['POST'])
@cross_origin()
def get_predicted_image():
    requestedFile = request.get_json()
    return getFileS3(requestedFile["fileName"], 'doriMedia/')

if __name__ == '__main__':
    app.run(debug=True)