const http = require('http')
const axios = require('axios')


function streamToString(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}
function streamToBuf(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

async function convert(reporter, definition, req, res) {
  var options = {
    method: "POST",
    url: "https://www.responsivepaper.com/api/html2pdf/v2",

    data: {
      value: "https://examples.responsivepaper.com/invoice",
      apikey: "",
      waitForReadyToRender: false,
      disableCache: false,
      includeConsole: false,
      format: "",
      landscape: false,
      printMedia: false,
      timeout: 40000
    },
    responseType: 'stream'
  };

  const content = await res.content.toString()
  Object.assign(options.data, req.template.responsivepaperPdf)
  options.data.apikey = definition.options.hasOwnProperty('apikey') ? definition.options.apikey : ''

  options.data.value = content
  try {
    const result = await axios(options)

    res.meta.contentType = 'application/pdf'
    res.meta.fileExtension = 'pdf'
    res.content = await streamToBuf(result.data)
  }
  catch (error) {
    const body = await streamToString(error.response.data)
    res.meta.contentType = 'text/html'
    res.content = body
  }
}

module.exports = function (reporter, definition) {



  reporter.extensionsManager.recipes.push({
    name: 'responsivepaper-pdf',
    execute: async (req, res) => {
      return await convert(reporter, definition, req, res)
    }
  })

  reporter.documentStore.registerComplexType('responsivepaperPdf', {
    waitForReadyToRender: { type: 'Edm.Boolean' },
    disableCache: { type: 'Edm.Boolean' },
    includeConsole: { type: 'Edm.Boolean' },
    waitForReadyToRender: { type: 'Edm.Boolean' },
    format: { type: 'Edm.String' },
    landscape: { type: 'Edm.Boolean' },
    printMedia: { type: 'Edm.Boolean' },
    timeout: { type: 'Edm.Number' }
  })

  // if (reporter.documentStore.model.entityTypes['TemplateType']) {
  //   reporter.documentStore.model.entityTypes['TemplateType'].responsivepaperPdf = { type: 'jsreport.responsivepaperPdf' }
  // }

}
