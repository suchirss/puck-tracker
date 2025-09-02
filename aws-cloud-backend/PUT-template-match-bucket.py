import boto3
from botocore.exceptions import NoCredentialsError, ClientError
import boto3.session
from datetime import datetime
from pathlib import Path

# Load AWS Credentials puck-tracker-dev IAMs profile
session = boto3.session.Session(profile_name='puck-tracker-dev')

s3 = session.client('s3')

bucket_name = "template-match-bucket"

timestamp = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")

testPUTPath = "C:\\Users\suchi\\OneDrive\\Documents\\Suchir\\Programming-Projects\\hockey-puck-tracker\\chrome-extension\\opencv_isolated_tracker\\assets\\template-match-result-1-green-rect.jpeg"

# TODO: Implement the function below
"""
Creates an object to be put into the template match s3 bucket:

:param resultSrc: contains path to result image
:param needleSrc: contains path to needle image
:param haystack: contains path to haystack source 
:return: object to be sent to s3 bucket
:rtype: s3 object
"""

def CreateTemplateMatchBucketObject(resultSrc, needleSrc, haystackSrc):
    print("check")

# TODO: integrate below function into template match function as a flag
# TODO: create function to remove objects put in the s3 bucket
def PutObjectIntoTemplateMatchBucket(objectSrc, bucketName, objectName):
    try: 
        s3.upload_file(objectSrc, bucketName, objectName)
        print(f"File {objectSrc} successfully uploaded to {bucketName} with object name {objectName}")
    except Exception as e:
        print(f"Error uploading file: {e}")

# PutObjectIntoTemplateMatchBucket(testPUTPath, bucket_name, "testPUT")
        





