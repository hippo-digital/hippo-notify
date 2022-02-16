# hippo-notify
A notification service allowing any application to send notifications to users

This is a proof of concept for now but this repository contains both serverless and cloudformation templates for creating an API gateway endpoint
connected to a lambda function which can send any email template to any user.

For full documentation on setting these up see https://hippowiki.atlassian.net/wiki/spaces/HI/pages/1796702227/Proof+of+concept+for+Hippo+Notify


# Updating email templates

If you just need to update the email templates then you need to have a properly configured [AWS Cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

Update date the templates in the `hippo-email-templates\templates` folder. Once you are happy you can run `uploadTemplates.sh`.

> NOTE: The `uploadTemplates.sh` script accepts a single argument which allows you to name the profile you wish to use for commands ran using the `AWS CLI`. 
