#!/bin/bash

shopt -s globstar


profile=${1:-default}
echo "Using profile: $profile"
echo "Generating templates"

node createEmailTemplates.js

templates=$(aws ses list-templates --profile $profile)

for i in templates/*.json; do
     fileName=$(basename $i .json)
     contents=$(cat $i)
     exists=$(jq '.[] | any(.Name == '\"$fileName\"')' <<< ${templates})

     if [[ $exists = "true" ]] 
     then
        echo "Updating email template: $fileName"
        aws ses update-template --cli-input-json file://$i --profile $profile
     else 
        echo "Creating email template: $fileName"
        aws ses create-template --cli-input-json file://$i --profile $profile
     fi
done