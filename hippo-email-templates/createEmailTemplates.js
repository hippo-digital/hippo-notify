const path = require('path');
const fs = require('fs');

const templateList = [
  {
    templateId: 'projectEscalation',
    templateSubject: 'Project: {{projectName}} escalation',
  },
  {
    templateId: 'newProjectCreation',
    templateSubject: 'Project: {{projectName}} has been created',
  },
  {
    templateId: 'reportDelayed',
    templateSubject: 'Reminder to complete your SDL Report'
  },
  {
    templateId: 'employeesImported',
    templateSubject: 'Eploy Importer Summary'
  }
];

templateList.reduce((acc, templateInfo) => {
  const { templateId } = templateInfo;
  if (acc[templateId] === 1) {
    throw new Error(`Error: Duplicate SES template id "${templateId}", they should be unique`);
  }
  acc[templateId] = 1;
  return acc;
}, {});


createEmailTemplates = () => {
  // You can load template configuration from filesystem using serverless object + runtime options
  // or from any other source like database or API

  const sesEmailTemplates = templateList.map((templateInfo) => {
    const { templateId, templateSubject } = templateInfo;
    const templatePathHtml = path.join(__dirname, `templates/${templateId}.html`);
    const templatePathTxt = path.join(__dirname, `templates/${templateId}.txt`);

    return { 
      Template: {
        TemplateName: templateId,
        SubjectPart: templateSubject,
        HtmlPart: fs.readFileSync(templatePathHtml).toString(),
        TextPart: fs.readFileSync(templatePathTxt).toString(),
      }
    };
  });

  sesEmailTemplates.forEach(element => {
    fs.writeFileSync(`templates/${element.Template.TemplateName}.json`, JSON.stringify(element, null, 2)); 
  });

  
};

createEmailTemplates();