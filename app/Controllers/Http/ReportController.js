'use strict'
var fonts = { 
    Roboto: {
            normal: './fonts/times-new-roman-14.ttf'
        }
  }
  
var axios = require('axios')
var PdfPrinter = require('pdfmake/src/printer')
var fs = require('fs')
var printer = new PdfPrinter(fonts)
var moment = require('moment')

const Driver = use('App/Models/Driver')
const Vehicle = use('App/Models/Vehicle')
const Travel = use('App/Models/Travel')
const Cart = use('App/Models/Cart')
const Itinerary = use('App/Models/Itinerary')

  
class ReportController {

    async driverReport ({ params}) {
        try{
          const driver = await Driver.query().where('uuid', params.id).firstOrFail()
    
          const driversLicense_validate =  moment(new Date(driver.driversLicense_validate)).format('DD/MM/YYYY')
          const admission_date =  moment(new Date(driver.admission_date)).format('DD/MM/YYYY')
          const resignation_date =  moment(new Date(driver.resignation_date)).format('DD/MM/YYYY')
    
          var docDefinition = {
            pageSize: 'A4',
            pageMargins: [ 40, 60, 40, 60 ],
            footer: {
              columns: [
                { text: 'SGFCaminhões', alignment: 'center' }
              ]
            },
            content: [
              { text: driver.name , fontSize: 15, alignment:'center'},
              { text: 'CPF: '+ driver.cpf_number, style: 'body'},
              { text: ['CNH: '+ driver.drivers_license, ' '+ 'Validade: '+ driversLicense_validate], style: 'body'},
              { text: 'Telefone 1: '+ driver.phone_1, style: 'body'},
              { text: 'Telefone 2: '+ driver.phone_2, style: 'body'},
              { text: 'Data de Admissão: '+ admission_date, style: 'body'},
              { text: 'Data de Demissao: '+  resignation_date, style: 'body'},
            ],
            
            styles: {
              body: {
                fontSize: 12,
                alignment: 'left'
              }
            }
          }
         
          var pdfDoc = printer.createPdfKitDocument(docDefinition)
          pdfDoc.pipe(fs.createWriteStream('../SGFCaminhoes-front/src/reports/motorista.pdf'))
          pdfDoc.end()
        }
        catch(error){
          console.log(error)
        }
    }    
}

module.exports = ReportController
