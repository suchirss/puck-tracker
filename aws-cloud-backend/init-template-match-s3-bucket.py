# Note: how to initialize s3 bucket was learned through 
# this medium article: https://medium.com/cloudnloud/creating-an-aws-s3-bucket-with-python-a-step-by-step-guide-2abacdbbac54

import boto3
from botocore.exceptions import NoCredentialsError, ClientError
import boto3.session

# Load AWS Credentials puck-tracker-dev IAMs profile
session = boto3.session.Session(profile_name='puck-tracker-dev')

s3 = session.client('s3')

bucket_name = "template-match-bucket"

# create bucket:
try:
    s3.create_bucket(
        Bucket=bucket_name, 
        CreateBucketConfiguration={'LocationConstraint': session.region_name}
        )
    print(f"Bucket {bucket_name} was created")

    # verify bucket's existence
    response = s3.head_bucket(Bucket=bucket_name)
    print(f"Bucket {bucket_name} exists and can be accessed")

except ClientError as e: 
    print(f"Client Error: {e}")
except NoCredentialsError as e:
    print(f"Credentials not found: {e}")    
except Exception as e: 
    print(f"An error occurred during creation of the bucket: {e}")
