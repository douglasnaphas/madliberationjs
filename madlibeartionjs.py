import re
from troposphere import ImportValue, Join, Parameter, Ref, Template
from troposphere.s3 import Bucket, PublicRead

t = Template()
t.add_version('2010-09-09')
t.add_transform(['AWS::Serverless-2016-10-31', 'AWS::CodeStar'])
projectid = t.add_parameter(Parameter(
    "ProjectId",
    Description="AWS CodeStar projectID used to associate new resources to team members",
    Type="String"
))

# S3 bucket
t.add_resource(
    Bucket("MljsPlaceholderBucket",
           AccessControl=PublicRead)
)

for line in t.to_yaml().splitlines():
    if not re.search(r'^\s*CodeUri:', line):
        print(line)
