function generateMarkdown(data) {
  return `
# ${data.title}

![picture](${resp.data.avatar_url})

${data.description}
# Table of content
- Installation
- Usage
- Licence
- Contributing
- Questions

# Installation
${data.installation}
# Usage
${data.usage}
# Licence
${data.licence}
# Contributors
${data.contributors}

`;
}

module.exports = generateMarkdown;
