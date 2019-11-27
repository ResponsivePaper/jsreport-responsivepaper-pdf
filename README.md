# jsreport-responsivepaper-pdf

**This recipe allows jsreport to connect to the https://responsivepaper.com html to pdf conversion service.**

## Local Testing

1. git clone or download this project
2. npm install
3. get a free api key at https://responsivepaper.com
4. Update the apikey in package.json at the end of the "start" script
5. Remove comments from node_modules\jsreport-reports\studio\ReportEditor.scss
6. npm start

## Install into JsReport on Prem

1. install [jsreport](https://jsreport.net/on-prem) on premises
2. open terminal in jsreport app folder
3. `npm install jsreport-responsivepaper-pdf`
4. get a free api key at https://responsivepaper.com
5. Update the jsreport.config.json

```
"extensions": {
  "responsivepaper-pdf": {
    apikey: "_YOUR_API_KEY"
  }
}
```

## Use in Jsreport Studio

1. Set the "engine" to "none"
2. Set the recipe to "responsivepaper-pdf"
3. Enter a url or html in the template and click "Run" (e.g. https://examples.responsivepaper.com/stocks, https://examples.responsivepaper.com/invoice)
4. Update the options as needed, especially the "wait for render trigger" if using a url with complex rendering logic

More information on designing responsive paper compatible reports can be found here: https://docs.responsivepaper.com

