// Load the AWS SDK for Node.js
var aws = require('aws-sdk');

// Create a new SES object in ap-south-1 region
var ses = new aws.SES({region: 'eu-west-1'});

exports.sendTemplatedEmail = (event, context, callback) => {
    
    const body = JSON.parse(event.body);
    const { templateName, sendTo, data } = body;
    
    const params = {
    Template: templateName,
    Destination: { 
      ToAddresses: [
        sendTo
      ]
    },
    Source: 'Hippo Notify <stuart.kd@hippodigital.co.uk>',
    TemplateData: JSON.stringify(data)
    };

  ses.sendTemplatedEmail(params, function(err, data) {
    if (err) {
      console.log(err);
      context.fail(err);
    }else{
      
      console.log(data);
      context.succeed(data);
    }
  });
};