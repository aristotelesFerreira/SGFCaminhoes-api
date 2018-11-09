var {locale} = require ('moment');

'use strict'
var fonts = { 
    Roboto: {
            normal: './fonts/times-new-roman-14.ttf'
        }
  }
var pdfmake = require ('pdfmake')
var axios = require('axios')
var PdfPrinter = require('pdfmake/src/printer')
var fs = require('fs')
var printer = new PdfPrinter(fonts)
var moment = require('moment')

const Driver = use('App/Models/Driver')
const User = use('App/Models/User')
const Vehicle = use('App/Models/Vehicle')
const Travel = use('App/Models/Travel')
const Cart = use('App/Models/Cart')
const Itinerary = use('App/Models/Itinerary')
const Database = use('Database')

var data = new Date();
var str_data = data.getDate() + '/' + (data.getMonth()+1) + '/' + data.getFullYear();
var str_hora = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();

class ReportController {

    async driverReport ({ params}) {
        try{
          const driver = await Driver.query().where('uuid', params.id).firstOrFail()
    
          const driversLicense_validate =  moment(new Date(driver.driversLicense_validate)).format('DD/MM/YYYY')
          const admission_date =  moment(new Date(driver.admission_date)).format('DD/MM/YYYY')
          const resignation_date =  moment(new Date(driver.resignation_date)).format('DD/MM/YYYY')
    
          var status = ''
          if(driver.status == 1){
            status = 'Ativo'
            } 
            else {
            status = 'Inativo'
            }

          var docDefinition = {
            pageSize: 'A4',
            pageMargins: [ 40, 60, 40, 60 ],
            footer: {
              columns: [
                { text: 'SGFCaminhões', alignment: 'center' }
              ]
            },
           
            content: [
                {
                  columns: [
                      {
                            image: 'C:/laragon/etc/apps/laragon/uploads/image.png',
                            width: 150
                      },
    
                      [
    
                        {
                          stack: [
                              
                            {
                                columns: [
                                    {
                                        text: 'SGF-Caminhões'
                                    },
                                    {
                                        text: 'Data: '+str_data,
                                        width: 100
                                         
                                    },
                                ]
                            },
                            {
                                columns: [
                                    {
                                        text:'xx.xxx.xxx/xxxx-xx',
                                      
                                    }, 
                                    {
                                        text: 'Horas: '+str_hora,
                                        style:'invoiceSubValue',
                                        width: 100,
                                    }
                                  ]
                            },
                            {
                              columns: [
                                  {
                                      text:'Rua Santa Fé, QD 29 LT 03 Jussara - GO',
                                    
                                  }, 
                                ]
                          },
                         
                        ]
    
                      }
                  ]     
                    
                ],
                  
              },
               {
                columns: [
                    {
                        text: 'Relatório de Motorista',
                        fontSize: '25',
                        alignment: 'center'
                    },
                   
                ]
              },
           
            '\n',
            {
    
            table: {
             
              headerRows: 1,
              widths: [ '*', '*' ],
      
              body: [
                // Item 1
                [ 
                    [
                        {
                            text: 'Nome',
                            style:'itemTitle'
                        },
                    ],
                    {
                      text: driver.name
                    } 
                   
                ],
                // Item 2
                [ 
                    [
                        {
                            text: 'CPF',
                            style:'itemTitle'
                        }, 
                        
                    ],
                    {
                      text:  driver.cpf_number
                    } 
                ],
                // Item 3
                [ 
                    [
                        {
                            text: 'CNH',
                            style:'itemTitle'
                        }, 
                        
                    ],
                    {
                      text:  driver.drivers_license
                    } 
                ],
                // Item 4
                [ 
                    [
                        {
                            text: 'Validade da CNH',
                        }, 
    
                    ],
                    {
                      text: driversLicense_validate
                    } 
                ],
                // Item 5
                [ 
                    [
                        {
                            text: 'Telefone 1',
                        }, 
                        
                    ],
                    {
                      text: driver.phone_1
                    } 
                ],
                // Item 6
                [ 
                    [
                        {
                            text: 'Telefone 2',
                        }, 
                        
                    ],
                    {
                      text:  driver.phone_2
                    } 
                ],
                // Item 7
                [ 
                    [
                        {
                            text: 'Data de Admissão',
                        }, 
                        
                    ],
                    {
                      text:  admission_date
                    } 
                ],
                // Item 8
                [ 
                    [
                        {
                            text: 'Data de Demissão',
                        }, 
                        
                    ],
                    {
                      text:  resignation_date
                    } 
                ],
                [ 
                    [
                        {
                            text: 'Status',
                        }, 
                        
                    ],
                    {
                      text:  status
                    } 
                ],
                // END Items
              ]
            }, // table
          //  layout: 'lightHorizontalLines'
          },
         
            { 
            text: 'Esse relatório foi emitido através do sistema SGF-Caminhões ',
            fontSize: '9'
           
            }
        ],
            
            styles: {
              body: {
                fontSize: 12,
                alignment: 'left'
              }
            }
          }
        
          var pdfDoc = printer.createPdfKitDocument(docDefinition)
          pdfDoc.pipe(fs.createWriteStream('C:/laragon/etc/apps/laragon/uploads/motorista.pdf'))
          pdfDoc.end()
          return 'sucesso'

        }
        
        catch(error){
          console.log(error)
        }
    }
    
    async vehicleReport ({ params }) { //arrumar aqui , validar campos
      try {

        const vehicle = await Vehicle.query().where('uuid', params.id).firstOrFail()

        const purchase_date =  moment(new Date(vehicle.purchase_date)).format('DD/MM/YYYY')

        var x = vehicle.km_current.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
        x =  x.toString()
        x = x.replace(',',' ')
        x = x.replace('.',',')
        var km_current = x.replace(' ','.')

        var y = vehicle.sale_value.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
        y =  y.toString()
        y = y.replace(',',' ')
        y = y.replace('.',',')
        var sale_value = y.replace(' ','.')

        var d = vehicle.purchase_price.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
        d =  d.toString()
        d = d.replace(',',' ')
        d = d.replace('.',',')
        var purchase_price = d.replace(' ','.')

        var docDefinition = {
          pageSize: 'A4',
          pageMargins: [ 40, 60, 40, 60 ],
          footer: {
            columns: [
              { text: 'SGFCaminhões', alignment: 'center' }
            ]
          },
         
          content: [
            {
              columns: [
                  {
                        image: 'C:/laragon/etc/apps/laragon/uploads/image.png',
                        width: 150
                  },

                  [

                    {
                      stack: [
                          
                        {
                            columns: [
                                {
                                    text: 'SGF-Caminhões'
                                },
                                {
                                    text: 'Data: '+str_data,
                                    width: 100
                                     
                                },
                            ]
                        },
                        {
                            columns: [
                                {
                                    text:'xx.xxx.xxx/xxxx-xx ',
                                  
                                }, 
                                {
                                    text: 'Horas: '+str_hora,
                                    style:'invoiceSubValue',
                                    width: 100,
                                }
                              ]
                        },
                        {
                          columns: [
                              {
                                  text: 'Rua Santa Fé, QD 29 LT 03 Jussara - GO                                 ',
                                
                              }, 
                            ]
                      },
                     
                    ]

                  }
              ]     
                
            ],
              
          },
           {
            columns: [
                {
                    text: 'Relatório de Veículo',
                    fontSize: '25',
                    alignment: 'center'
                },
               
            ]
          },

            
       
        '\n',
        {

        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ '*', '*' ],
  
          body: [
          
            // Items
            // Item 1
            [ 
                [
                    {
                        text: 'Marca',
                        style:'itemTitle'
                    },
                ],
                {
                  text: vehicle.brand
                } 
               
            ],
            // Item 2
            [ 
                [
                    {
                        text: 'Modelo',
                        style:'itemTitle'
                    }, 
                    
                ],
                {
                  text:  vehicle.model
                } 
            ],
            // Item 3
            [ 
                [
                    {
                        text: 'Tipo',
                        style:'itemTitle'
                    }, 
                    
                ],
                {
                  text:  vehicle.type
                } 
            ],
            // Item 4
            [ 
                [
                    {
                        text: 'KM atual',
                    }, 

                ],
                {
                  text:  km_current+'KM'
                } 
            ],
            // Item 5
            [ 
                [
                    {
                        text: 'Ano',
                    }, 
                    
                ],
                {
                  text:  vehicle.year
                } 
            ],
            // Item 6
            [ 
                [
                    {
                        text: 'Placa',
                    }, 
                    
                ],
                {
                  text:  vehicle.plate
                } 
            ],
            // Item 7
            [ 
                [
                    {
                        text: 'Nº Chassis',
                    }, 
                    
                ],
                {
                  text:  vehicle.chassis_number
                } 
            ],
            // Item 8
            [ 
                [
                    {
                        text: 'Valor de Compra',
                    }, 
                    
                ],
                {
                  text:  'R$ '+purchase_price
                } 
            ],
            // Item 9
            [ 
                [
                    {
                        text: 'Data de Compra',
                    }, 
                    
                ],
                {
                  text:  purchase_date
                } 
            ],
            // Item 10
            [ 
                [
                    {
                        text: 'Valor de Venda',
                    }, 
                    
                ],
                {
                  text:  'R$ '+sale_value
                } 
            ],
            // END Items
          ]
        }, // table
      //  layout: 'lightHorizontalLines'
      },
     
        { 
        text: 'Esse relatório foi emitido através do sistema SGF-Caminhões ',
        fontSize: '9'
       
        }
    ],
         

          footer: {
            columns: [
              { text: 'SGFCaminhões', alignment: 'center' }
            ]
          },

          styles: {
            body: {
              fontSize: 12,
              alignment: 'left'
            },
            
          }
        }

        var pdfDoc = printer.createPdfKitDocument(docDefinition)
        pdfDoc.pipe(fs.createWriteStream('C:/laragon/etc/apps/laragon/uploads/veiculo.pdf'))
        pdfDoc.end()
        return 'sucesso'

      } catch(error) {
        console.log(error)
      }
     
    }

    async cartReport ({ params }) { // aqui também
      try{
        const cart = await Cart.query().where('uuid', params.id).firstOrFail()

        const purchase_date =  moment(new Date(cart.purchase_date)).format('DD/MM/YYYY')

        var x = cart.km_current.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
        x =  x.toString()
        x = x.replace(',',' ')
        x = x.replace('.',',')
        var km_current = x.replace(' ','.')

        var y = cart.sale_value.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
        y =  y.toString()
        y = y.replace(',',' ')
        y = y.replace('.',',')
        var sale_value = y.replace(' ','.')

        var d = cart.purchase_price.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
        d =  d.toString()
        d = d.replace(',',' ')
        d = d.replace('.',',')
        var purchase_price = d.replace(' ','.')
        
        var t = cart.capacity.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
        t =  t.toString()
        t = t.replace(',',' ')
        t = t.replace('.',',')
        var capacity = t.replace(' ','.')

        var docDefinition = {
          pageSize: 'A4',
          pageMargins: [ 40, 60, 40, 60 ],
          footer: {
            columns: [
              { text: 'SGFCaminhões', alignment: 'center' }
            ]
          },
         
          content: [

            {
              columns: [
                  {
                        image: 'C:/laragon/etc/apps/laragon/uploads/image.png',
                        width: 150
                  },
                  [
                    {
                      stack: [
                        {
                            columns: [
                                {
                                    text: 'SGF-Caminhões'
                                },
                                {
                                    text: 'Data: '+str_data,
                                    width: 100
                                     
                                },
                            ]
                        },
                        {
                            columns: [
                                {
                                    text:'xx.xxx.xxx/xxxx-xx',
                                  
                                }, 
                                {
                                    text: 'Horas: '+str_hora,
                                    style:'invoiceSubValue',
                                    width: 100,
                                }
                              ]
                        },
                        {
                          columns: [
                              {
                                  text:'Rua Santa Fé, QD 29 LT 03 Jussara - GO                                  ',
                                
                              }, 
                            ]
                      },
                     
                    ]

                  }
              ]     
                
            ],
              
          },
           {
            columns: [
                {
                    text: 'Relatório de Carreta',
                    fontSize: '25',
                    alignment: 'center'
                },
            ]
          }, 
       
        '\n',
        {

        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ '*', '*' ],
  
          body: [
            // Table Header
            
            // Items
            // Item 1
            [ 
                [
                    {
                        text: 'Marca',
                        style:'itemTitle'
                    },
                ],
                {
                  text: cart.brand
                } 
               
            ],
            // Item 2
            [ 
                [
                    {
                        text: 'Modelo',
                        style:'itemTitle'
                    }, 
                    
                ],
                {
                  text:  cart.model
                } 
            ],
            // Item 2
            [ 
                [
                    {
                        text: 'Descrição',
                        style:'itemTitle'
                    }, 
                    
                ],
                {
                  text:  cart.description
                } 
            ],
            // Item 3
            [ 
                [
                    {
                        text: 'Tipo',
                        style:'itemTitle'
                    }, 
                    
                ],
                {
                  text:  cart.type
                } 
            ],
            // Item 4
            [ 
                [
                    {
                        text: 'KM atual',
                    }, 

                ],
                {
                  text:  km_current+' KM'
                } 
            ],
            // Item 5
            [ 
                [
                    {
                        text: 'Ano',
                    }, 
                    
                ],
                {
                  text:  cart.year
                } 
            ],
            // Item 6
            [ 
                [
                    {
                        text: 'Placa',
                    }, 
                    
                ],
                {
                  text:  cart.plate
                } 
            ],
            // Item 7
            [ 
                [
                    {
                        text: 'Nº Chassis',
                    }, 
                    
                ],
                {
                  text:  cart.chassis_number
                } 
            ],
            // Item 8
            [ 
                [
                    {
                        text: 'Capacidade',
                    }, 
                    
                ],
                {
                  text:  capacity
                } 
            ],
            // Item 8
            [ 
                [
                    {
                        text: 'Valor de Compra',
                    }, 
                    
                ],
                {
                  text:  'R$ '+purchase_price
                } 
            ],
            // Item 9
            [ 
                [
                    {
                        text: 'Data de Compra',
                    }, 
                    
                ],
                {
                  text:  purchase_date
                } 
            ],
            // Item 10
            [ 
                [
                    {
                        text: 'Valor de Venda',
                    }, 
                    
                ],
                {
                  text:  'R$ '+sale_value
                } 
            ],
            // END Items
          ]
        }, // table
      //  layout: 'lightHorizontalLines'
      },
     
        { 
        text: 'Esse relatório foi emitido através do sistema SGF-Caminhões ',
        fontSize: '9'
       
        }
    ],
          
          styles: {
            body: {
              fontSize: 12,
              alignment: 'left'
            }
          }
        }

        var pdfDoc = printer.createPdfKitDocument(docDefinition)
        pdfDoc.pipe(fs.createWriteStream('C:/laragon/etc/apps/laragon/uploads/carreta.pdf'))
        pdfDoc.end()
        return 'sucesso'

        
      }catch(error){

      }
    }

    async travelReport ({ params }){
      
        try{
           
            const travel = await Database
            .select('name', 'cpf_number', 'phone_1','phone_2',
            'brand','plate','type','model','km_current',
            'distance','arrivalDate', 'departureDate', 'travels.status', 'route_name',
            'initial_point', 'end_point', 'observation')
            .from('travels')
            .innerJoin('drivers', 'drivers.id', 'travels.driver_id')
            .innerJoin('vehicles', 'vehicles.id', 'travels.vehicle_id')
            .innerJoin('itineraries', 'itineraries.id', 'travels.itinerary_id')
            .where('travels.uuid', params.id)

            //filtrar as carretas
            const carts = await Database
            .select('brand', 'model', 'plate', 'type' )
            .from('cart_travels')
            .innerJoin('carts', 'carts.id', 'cart_travels.cart_id')
            .innerJoin('travels', 'travels.id', 'cart_travels.travel_id')
            .where('travels.uuid', params.id)
          


           
        const departureDate =  moment(new Date(travel[0].departureDate)).format('DD/MM/YYYY')
        const arrivalDate =  moment(new Date(travel[0].arrivalDate)).format('DD/MM/YYYY')

        var status = ''
        var x = travel[0].distance.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
        x =  x.toString()
        x = x.replace(',',' ')
        x = x.replace('.',',')
        var distance = x.replace(' ','.')
        
      
        var y = travel[0].km_current.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
        y =  y.toString()
        y = y.replace(',',' ')
        y = y.replace('.',',')
        var km_total = y.replace(' ','.')
 
        
        if(travel[0].status == 'in_progress'){
            status = 'Em Andamento'
        } else if(travel[0].status == 'finished'){
            status = 'Concluída'
        }else {
            status = 'Cancelada'
        }
       
            var docDefinition = {
              pageSize: 'A4',
              pageMargins: [ 40, 60, 40, 60 ],
              footer: {
                columns: [
                  { text: 'SGFCaminhões', alignment: 'center' }
                ]
              },
             
              content: [
    
                {
                  columns: [
                      {
                            image: 'C:/laragon/etc/apps/laragon/uploads/image.png',
                            width: 150
                      },
                      [
                        {
                          stack: [
                            {
                                columns: [
                                    {
                                        text: 'SGF-Caminhões'
                                    },
                                    {
                                        text: 'Data: '+str_data,
                                        width: 100
                                         
                                    },
                                ]
                            },
                            {
                                columns: [
                                    {
                                        text:'xx.xxx.xxx/xxxx-xx',
                                      
                                    }, 
                                    {
                                        text: 'Horas: '+str_hora,
                                        style:'invoiceSubValue',
                                        width: 100,
                                    }
                                  ]
                            },
                            {
                              columns: [
                                  {
                                      text:'Rua Santa Fé, QD 29 LT 03 Jussara - GO                                      ',
                                    
                                  }, 
                                ]
                          },
                         
                        ]
    
                      }
                  ]     
                    
                ],
                  
              },
               {
                columns: [
                    {
                        text: 'Relatório de Viagem',
                        fontSize: '25',
                        alignment: 'center'
                    },
                ]
              }, 
              '\n',
              {
                columns: [
                    {
                        text: 'Motorista',
                        fontSize: '18',
                        alignment: 'left'
                    },
                ]
              }, 
           
           
            {
    
            table: {
                headerRows: 1,
                widths: [ '*', '*'],

                body: [
                    // Item 1
                    [ 
                        [
                            {
                                text: 'Nome',
                            },
                        ],
                        {
                        text: travel[0].name
                        } 
                    
                    ],
                    // Item 2
                    [ 
                        [
                            {
                                text: 'CPF',
                            },
                        ],
                        {
                        text: travel[0].cpf_number
                        } 
                    
                    ],
                    // Item 3
                    [ 
                        [
                            {
                                text: 'Telefone',
                            },
                        ],
                        {
                        text: travel[0].phone_1
                        } 
                    
                    ],
                    // Item 4
                    [ 
                        [
                            {
                                text: 'Telefone Opcional',
                            },
                        ],
                        {
                        text: travel[0].phone_2
                        } 
                    
                    ],
                ]
            },
        },
        '\n',
        {
            columns: [
                {
                    text: 'Veículo',
                    fontSize: '18',
                    alignment: 'left'
                },
            ]
        }, 
        
        {

            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ '*', '*' ],
      
              body: [
                // Item 1
                [ 
                    [
                        {
                            text: 'Marca',
                            style:'itemTitle'
                        }, 
                        
                    ],
                    {
                      text: travel[0].brand
                    } 
                ],
                // Item 2
                [ 
                    [
                        {
                            text: 'Modelo',
                        }, 
                        
                    ],
                    {
                      text: travel[0].model
                    } 
                ],
                // Item 3
                [ 
                    [
                        {
                            text: 'Tipo',
                        }, 
                        
                    ],
                    {
                      text: travel[0].type
                    } 
                ],
                // Item 4
                [ 
                    [
                        {
                            text: 'Placa',
                            style:'itemTitle'
                        }, 
                        
                    ],
                    {
                      text: travel[0].plate
                    } 
                ],
                // Item 5
                [ 
                    [
                        {
                            text: 'Kilometragem atual',
                            style:'itemTitle'
                        }, 
                        
                    ],
                    {
                      text: km_total+'km'
                    } 
                ],
                
                // END Items
              ]
            }, // table
          //  layout: 'lightHorizontalLines'
        },
        '\n',
        {
            columns: [
                {
                    text: 'Carretas',
                    fontSize: '18',
                    alignment: 'left'
                }
            ]
        },
        {
            table: {
                headerRows: 1,
                widths: [ '*', '*'],
                body: [
                     // Item 1
                    carts[0] !== undefined ?
                        carts[0].type !== 'Dolly' ? 
                    [ 
                        [
                            {
                                text: 'Placa 1º Carreta',
                            }, 
                            
                        ],
                        {
                          text: carts[0].plate
                        } 
                    ] 
                    :
                    [ 
                        [
                            {
                                text: 'Placa Dolly',
                            }, 
                            
                        ],
                        {
                          text: carts[0].plate
                        } 
                    ]
                    : 
                    [ 
                        [
                            {
                                text: ''
                            }, 
                            
                        ],
                        {
                            text: ''
                        } 
                    ],
                    // Item 2
                    carts[1] !== undefined ?
                        carts[1].type !== 'Dolly' ? 
                    [ 
                        [
                            {
                                text: 'Placa 2º Carreta',
                            }, 
                            
                        ],
                        {
                          text: carts[1].plate
                        } 
                    ] 
                    :
                    [ 
                        [
                            {
                                text: 'Placa Dolly',
                            }, 
                            
                        ],
                        {
                          text: carts[1].plate
                        } 
                    ]
                    : 
                    [ 
                        [
                            {
                                text: ''
                            }, 
                            
                        ],
                        {
                            text: ''
                        } 
                    ],
                    // Item 3
                    carts[2] !== undefined ?
                    carts[2].type == 'Dolly' ? 
                [ 
                    [
                        {
                            text: 'Placa Dolly',
                        }, 
                        
                    ],
                    {
                      text: carts[2].plate
                    } 
                ] 
                :
                [ 
                    [
                        {
                            text: ''
                        }, 
                        
                    ],
                    {
                      text: ''
                    } 
                ]
                : 
                [ 
                    [
                        {
                            text: ''
                        }, 
                        
                    ],
                    {
                        text: ''
                    } 
                ],

                ]
            }
        },
        '\n',
        {
            columns: [
                {
                    text: 'Itinerário',
                    fontSize: '18',
                    alignment: 'left'
                }
            ]
        },
        {
            table: {
                headerRows: 1,
                widths: [ '*', '*'],
                body: [
                     // Item 1
                    [ 
                        [
                            {
                                text: 'Nome da Rota',
                            },
                            
                        ],
                        {
                        text:  travel[0].route_name
                        } 
                    ],
                     // Item 2
                    [ 
                        [
                            {
                                text: 'Ponto Inicial',
                            },
                            
                        ],
                        {
                        text:  travel[0].initial_point
                        } 
                    ],
                     // Item 3
                    [ 
                        [
                            {
                                text: 'Ponto Final',
                            },
                            
                        ],
                        {
                        text:  travel[0].end_point
                        } 
                    ],
                     // Item 4
                     [ 
                        [
                            {
                                text: 'Distância',
                            }, 
                            
                        ],
                        {
                          text:  distance+'km'
                        } 
                    ],
                ]
            }
        },
        '\n',
        {
            columns: [
                {
                    text: 'Informações complementares',
                    fontSize: '18',
                    alignment: 'left'
                },
            ]
        },
        {

            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ '*', '*' ],
      
              body: [
                 // Item 1
                [ 
                    [
                        {
                            text: 'Data de Partida',
                        }, 
                        
                    ],
                    {
                      text:  departureDate
                    } 
                ],
                // Item 2
                [ 
                    [
                        {
                            text: 'Data de Chegada',
                        }, 
                        
                    ],
                    {
                      text:  arrivalDate
                    } 
                ],
               
                // Item 3
                [ 
                    [
                        {
                            text: 'Status',
                        }, 
                        
                    ],
                    {
                      text:  status 
                    } 
                ],
    
              ],
        

        },
    },
         
            { 
            text: 'Esse relatório foi emitido através do sistema SGF-Caminhões ',
            fontSize: '9'
           
            }
        ],
              
              styles: {
                body: {
                  fontSize: 12,
                  alignment: 'left'
                }
              }
            }
    
            var pdfDoc = printer.createPdfKitDocument(docDefinition)
            pdfDoc.pipe(fs.createWriteStream('C:/laragon/etc/apps/laragon/uploads/viagem.pdf'))
            pdfDoc.end()
            return 'sucesso'
    
            
        }catch(error){
            console.log(error)
    
    }

    }
    
    async travelReportDate ({ params, request }) {
        const data = request.all()

        //const driver = Driver.query().where(data)
        var column = []
        var value = []
        var status = ''
       

        try {
            var cart = []
            var travel = []
            var filter = []

            if(data.cart_id){
              
                 cart = await Database
                .select('travel_id', 'cart_id')
                .from('cart_travels')
                .innerJoin('travels', 'travels.id', 'cart_travels.travel_id')
                .innerJoin('carts', 'carts.id', 'cart_travels.cart_id')
                .where('cart_id', data.cart_id)
               
                
                for(let i=0; i<cart.length; i++){
                    
                     travel = await Database
                    .select('route_name', 'vehicles.plate','name', 'distance', 'arrivalDate', 'departureDate', 'travels.status')
                    .from('travels')
                    .innerJoin('drivers', 'drivers.id', 'travels.driver_id')
                    .innerJoin('vehicles', 'vehicles.id', 'travels.vehicle_id')
                    .innerJoin('itineraries', 'itineraries.id', 'travels.itinerary_id')
                    .whereBetween(params.filter, [params.data, params.data2])
                    .orderBy(params.filter, 'cres')
                    //.where(data.travels_status.length == 2 ? 'travels.status'= '' : 'travels.status', data.travels_status )
                    .where('travels.status', data.travels_status)
                    .where( 'travels.id', cart[i].travel_id)
                   
                }
               
            }else {
                 travel = await Database
                .select('route_name', 'vehicles.plate','name', 'distance', 'arrivalDate', 'departureDate', 'travels.status')
                .from('travels')
                .innerJoin('drivers', 'drivers.id', 'travels.driver_id')
                .innerJoin('vehicles', 'vehicles.id', 'travels.vehicle_id')
                .innerJoin('itineraries', 'itineraries.id', 'travels.itinerary_id')
                .whereBetween(params.filter, [params.data, params.data2])
                .orderBy(params.filter, 'cres')
                .where(data)
            }
           
           
            var kmInProgress = 0
            var acrescentarDistancia = 0
            var kmCanceled = 0
            var totalCanceled = 0
            var totalFinished = 0
            var totalInProgress = 0
  
        if(travel == ''){
            return 'Não existe dados'
        }else {

        for(let i=0; i < travel.length ; i++) {
           
            //mascara distancia
            var x = travel[i].distance.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
            x =  x.toString()
            x = x.replace(',',' ')
            x = x.replace('.',',')
            var distance = x.replace(' ','.')
            
            

            if(travel[i].status == 'finished') {
                totalFinished = totalFinished+1
                acrescentarDistancia = acrescentarDistancia + travel[i].distance
            }else if(travel[i].status == 'in_progress'){
                totalInProgress = totalInProgress+1
                kmInProgress = kmInProgress + travel[i].distance
            }else {
                totalCanceled = totalCanceled+1
                kmCanceled = kmCanceled + travel[i].distance
            }
           

             // traduzir o status
             if(travel[i].status == 'in_progress'){
                status = 'Em Andamento'
            } else if(travel[i].status == 'finished'){
                status = 'Concluída'
            }else {
                status = 'Cancelada'
            }
            
                column.push([
                    
                        [
                            [
                                {
                                    text: 'Nome da Rota',
                                    fontSize: '11'
                                       
                                },
                            ],
                            {
                                text: travel[i].route_name,
                                fontSize: '11'
                               
                            }
                            
                        ],
                        [
                            [
                                {
                                text: 'Motorista',
                                fontSize: '11'
                                }, 
                            ],
                            {
                                text: travel[i].name,
                                fontSize: '11'
                            }
                            
                            
                        ],
                        [   [
                                {
                                    
                                    text: 'Veículo',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                              
                                text: travel[i].plate,
                                fontSize: '11'
                            }
                            
                        ],
                        [   [
                                {
                                    
                                    text: 'Distância',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                              
                                text: distance+'km',
                                fontSize: '11'
                            }
                            
                        ],
                        [   [
                                {
                                    text: 'Partida',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                                text: travel[i].departureDate =  moment(new Date(travel[i].departureDate)).format('DD/MM/YYYY'),
                                fontSize: '11'
                            }
                            
                        ],
                        [   
                            [
                                {
                                    text: 'Chegada',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                                text: travel[i].arrivalDate = moment(new Date(travel[i].arrivalDate)).format('DD/MM/YYYY'),
                                fontSize: '11'
                            }
                            
                        ],
                        [
                            [
                                {
                                    text: 'Status',
                                    fontSize: '11'
                                    
                                }, 
                            ],
                            {
                                text: status,
                                fontSize: '11'
                            }
                            
                        ],

                ])
                
        }
    }
        var DistanciaTotal = acrescentarDistancia.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
        DistanciaTotal =  DistanciaTotal.toString()
        DistanciaTotal = DistanciaTotal.replace(',',' ')
        DistanciaTotal = DistanciaTotal.replace('.',',')
        DistanciaTotal = DistanciaTotal.replace(' ','.')
        var KmEmAndamento = kmInProgress.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
        KmEmAndamento =  KmEmAndamento.toString()
        KmEmAndamento = KmEmAndamento.replace(',',' ')
        KmEmAndamento = KmEmAndamento.replace('.',',')
        KmEmAndamento = KmEmAndamento.replace(' ','.')
        var TotalKmCanceled = (kmCanceled).toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
        TotalKmCanceled =  TotalKmCanceled.toString()
        TotalKmCanceled = TotalKmCanceled.replace(',',' ')
        TotalKmCanceled = TotalKmCanceled.replace('.',',')
        TotalKmCanceled = TotalKmCanceled.replace(' ','.')

            var docDefinition = {
                pageSize: 'A4',
                pageMargins: [ 10, 10, 10, 10 ],
                footer: {
                  columns: [
                    { text: 'SGFCaminhões', alignment: 'center' }
                  ]
                },
                content: [
                  
                    {
                      columns: [
                          {
                                image: 'C:/laragon/etc/apps/laragon/uploads/image.png',
                                width: 150
                          },
                          [
                            {
                              stack: [
                                {
                                    columns: [
                                        {
                                            text: 'Sistema para Gerenciamento de Frotas'
                                        },
                                        {
                                            text: 'Data: '+str_data,
                                            width: 100
                                             
                                        },
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text:'xx.xxx.xxx/xxxx-xx',
                                            fontSize: '11'
                                          
                                        }, 
                                        {
                                            text: 'Horas: '+str_hora,
                                            style:'invoiceSubValue',
                                            width: 100,
                                        }
                                      ]
                                },
                                {
                                  columns: [
                                      {
                                          text:'Rua Santa Fé, QD 29 LT 03 Jussara - GO',
                                          fontSize: '11'
                                        
                                      }, 
                                    ]
                              },
                             
                            ]
        
                          }
                      ]     
                        
                    ],
                      
                  },
                   {
                    columns: [
                        {
                            text: 'Relatório de Viagens',
                            fontSize: '25',
                            alignment: 'center'
                        },
                    ]
                  }, 
               
                '\n',
                {
                    table: {
                          headerRows: 1,
                          widths: [ 100, 120, 60, 60, 55, 55, 70],
                          body: column 
                                    
                    }
                  },
                  { 
                    text: 'Esse relatório foi emitido através do sistema SGF-Caminhões '+'\n',
                    fontSize: '9'
                   
                  },
                  { 
                    text: '\n',
                    fontSize: '16'
                   
                  },
                  { 
                    text: 'Total concluídas: '+totalFinished+' ( '+DistanciaTotal+'KM )',
                    fontSize: '12',
                    color: 'green'
                   
                  },
                  { 
                    text: 'Total em andamento: '+ totalInProgress+' ( '+KmEmAndamento+'KM )',
                    fontSize: '12',
                    color: 'blue'
                   
                  },
                  { 
                    text: 'Total canceladas: '+ totalCanceled+' ( ' +TotalKmCanceled+'KM )',
                    fontSize: '12',
                    color: 'red'
                   
                  },
                
                 
                ]
                
            }
            var pdfDoc = printer.createPdfKitDocument(docDefinition)
            pdfDoc.pipe(fs.createWriteStream('C:/laragon/etc/apps/laragon/uploads/viagem_data.pdf'))
            pdfDoc.end()
            return 'sucesso'

        }catch(error){
            console.log(error)
        }
    }
    
    async driversByStatus ({ params, request }) {
        const data = request.all()
        var filter = []
        var totalAtivo = 0
        var totalInativo = 0
        var totalDrivers = 0
        var column = []
        var value = []
        var status = ''
       
        try {
            const driver = await Driver.query().where(data)
  
            filter = data.status
            if(filter == 1){
                filter = 'motoristas ativos'
            }else if(filter == 0){
                filter = 'motoristas inativos'
            }else{
                filter = 'todos'
            }
           
        if(driver == ''){
            return 'Não existe dados'
        }else {

        for(let i=0; i < driver.length ; i++) {
           
            //contar status
           if(driver[i].status == 1) {
            totalAtivo = totalAtivo+1
            totalDrivers = totalDrivers+1
            }else{
               totalInativo = totalInativo+1
               totalDrivers = totalDrivers+1
            }

             // traduzir o status
             if(driver[i].status == 1){
                status = 'Ativo'
            } else {
                status = 'Inativo'
            }
            
                column.push([
                    
                        [
                            [
                                {
                                    text: 'Nome',
                                    fontSize: '11'
                                       
                                },
                            ],
                            {
                                text: driver[i].name,
                                fontSize: '11'
                               
                            }
                            
                        ],
                        [
                            [
                                {
                                text: 'CPF',
                                fontSize: '11'
                                }, 
                            ],
                            {
                                text: driver[i].cpf_number,
                                fontSize: '11'
                            }
                            
                            
                        ],
                        [   [
                                {
                                    
                                    text: 'Telefone',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                              
                                text: driver[i].phone_1,
                                fontSize: '11'
                            }
                            
                        ],
                        [   [
                                {
                                    
                                    text: 'Telefone 2',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                              
                                text: driver[i].phone_2,
                                fontSize: '11'
                            }
                            
                        ],
                        [   [
                                {
                                    text: 'CNH',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                                text: driver[i].drivers_license,
                                fontSize: '11'
                            }
                            
                        ],
                        [   
                            [
                                {
                                    text: 'Validade',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                                text: driver[i].driversLicense_validate = moment(new Date(driver[i].driversLicense_validate)).format('DD/MM/YYYY'),
                                fontSize: '11'
                            }
                            
                        ],
                        [
                            [
                                {
                                    text: 'Status',
                                    fontSize: '11'
                                    
                                }, 
                            ],
                            {
                                text: status,
                                fontSize: '11'
                            }
                            
                        ],

                ])
                
        }
    }
        
            var docDefinition = {
                pageSize: 'A4',
                pageMargins: [ 10, 10, 10, 10 ],
                footer: {
                  columns: [
                    { text: 'SGFCaminhões', alignment: 'center' }
                  ]
                },
                content: [
                  
                    {
                      columns: [
                          {
                                image: 'C:/laragon/etc/apps/laragon/uploads/image.png',
                                width: 150
                          },
                          [
                            {
                              stack: [
                                {
                                    columns: [
                                        {
                                            text: 'Sistema para Gerenciamento de Frotas'
                                        },
                                        {
                                            text: 'Data: '+str_data,
                                            width: 100
                                             
                                        },
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text:'xx.xxx.xxx/xxxx-xx',
                                            fontSize: '11'
                                          
                                        }, 
                                        {
                                            text: 'Horas: '+str_hora,
                                            style:'invoiceSubValue',
                                            width: 100,
                                        }
                                      ]
                                },
                                {
                                  columns: [
                                      {
                                          text:'Rua Santa Fé, QD 29 LT 03 Jussara - GO',
                                          fontSize: '11'
                                        
                                      }, 
                                    ]
                              },
                             
                            ]
        
                          }
                      ]     
                        
                    ],
                      
                  },
                   {
                    columns: [
                        {
                            text: 'Relatório de Motoristas',
                            fontSize: '25',
                            alignment: 'center'
                        },
                       
                    ],
                   
                  }, 
               
                '\n',
                {
                    table: {
                          headerRows: 1,
                          widths: [ 150, 80, 70, 80, 30, 55, 50],
                          body: column 
                                    
                    }
                  },
                  { 
                    text: 'Esse relatório foi emitido através do sistema SGF-Caminhões '+'\n',
                    fontSize: '9'
                   
                  },

                  { 
                    text: 'Filtrado por '+  filter+'\n',
                    fontSize: '9'
                   
                  },
                  
                  { 
                    text: '\n',
                    fontSize: '16'
                   
                  },
                  filter == 'motoristas ativos' ?
                  { 
                    text: 'Total: '+ totalDrivers,
                    fontSize: '12',
                    color: 'blue'
                   
                  }: {},  
                  filter == 'motoristas inativos' ?
                  { 
                    text: 'Total: '+ totalDrivers,
                    fontSize: '12',
                    color: 'blue'
                   
                  }: {},
                  filter == 'todos' ?
                  [
                    { 
                        text: 'Ativos: '+ totalAtivo,
                        fontSize: '12',
                        color: 'green'
                    
                    },
                    { 
                        text: 'Inativos: '+ totalInativo,
                        fontSize: '12',
                        color: 'red'
                    
                    },
                    { 
                        text: 'Total: '+ totalDrivers,
                        fontSize: '12',
                        color: 'blue'
                   
                    }]: {},   
                 
                ]
                
            }
            var pdfDoc = printer.createPdfKitDocument(docDefinition)
            pdfDoc.pipe(fs.createWriteStream('C:/laragon/etc/apps/laragon/uploads/motoristas_filtros.pdf'))
            pdfDoc.end()
            return 'sucesso'

        }catch(error){
            console.log(error)
        }
    }
    
    async vehiclesByFilters ({ params, request }) {
        const data = request.all()
        var filter = []
        var totalAtivo = 0
        var totalInativo = 0
        var totalVehicles = 0
        var column = []
        var value = []
        var status = ''
       
        try {
            const vehicles = await Vehicle.query().where(data)
  
            filter = data.status
            if(filter == 1){
                filter = 'veículos ativos'
            }else if(filter == 0){
                filter = 'veículos inativos'
            }else{
                filter = 'todos'
            }
           
        if(vehicles == ''){
            return 'Não existe dados'
        }else {

        for(let i=0; i < vehicles.length ; i++) {
           
            var x = vehicles[i].km_current.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
            x =  x.toString()
            x = x.replace(',',' ')
            x = x.replace('.',',')
            var km_current = x.replace(' ','.')

            //contar status
           if(vehicles[i].status == 1) {
            totalAtivo = totalAtivo+1
            totalVehicles = totalVehicles+1
            }else{
               totalInativo = totalInativo+1
               totalVehicles = totalVehicles+1
            }

             // traduzir o status
             if(vehicles[i].status == 1){
                status = 'Ativo'
            } else {
                status = 'Inativo'
            }
            
                column.push([
                    
                        [
                            [
                                {
                                    text: 'Marca',
                                    fontSize: '11'
                                       
                                },
                            ],
                            {
                                text: vehicles[i].brand,
                                fontSize: '11'
                               
                            }
                            
                        ],
                        [
                            [
                                {
                                text: 'Modelo',
                                fontSize: '11'
                                }, 
                            ],
                            {
                                text: vehicles[i].model,
                                fontSize: '11'
                            }
                            
                            
                        ],
                        [   [
                                {
                                    
                                    text: 'Tipo',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                              
                                text: vehicles[i].type,
                                fontSize: '11'
                            }
                            
                        ],
                        [   [
                                {
                                    
                                    text: 'Placa',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                              
                                text: vehicles[i].plate,
                                fontSize: '11'
                            }
                            
                        ],
                        [   
                            [
                                {
                                    text: 'KM atual',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                                text: km_current,
                                fontSize: '11'
                            }
                            
                        ],
                        [
                            [
                                {
                                    text: 'Status',
                                    fontSize: '11'
                                    
                                }, 
                            ],
                            {
                                text: status,
                                fontSize: '11'
                            }
                            
                        ],

                ])
                
        }
    }
        
            var docDefinition = {
                pageSize: 'A4',
                pageMargins: [ 30, 10, 10, 10 ],
                footer: {
                  columns: [
                    { text: 'SGFCaminhões', alignment: 'center' }
                  ]
                },
                content: [
                  
                    {
                      columns: [
                          {
                            image: 'C:/laragon/etc/apps/laragon/uploads/image.png',    
                            width: 150
                          },
                          [
                            {
                              stack: [
                                {
                                    columns: [
                                        {
                                            text: 'Sistema para Gerenciamento de Frotas'
                                        },
                                        {
                                            text: 'Data: '+str_data,
                                            width: 100
                                             
                                        },
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text:'xx.xxx.xxx/xxxx-xx',
                                            fontSize: '11'
                                          
                                        }, 
                                        {
                                            text: 'Horas: '+str_hora,
                                            style:'invoiceSubValue',
                                            width: 100,
                                        }
                                      ]
                                },
                                {
                                  columns: [
                                      {
                                          text:'Rua Santa Fé, QD 29 LT 03 Jussara - GO',
                                          fontSize: '11'
                                        
                                      }, 
                                    ]
                              },
                             
                            ]
        
                          }
                      ]     
                        
                    ],
                      
                  },
                   {
                    columns: [
                        {
                            text: 'Relatório de Veículos',
                            fontSize: '25',
                            alignment: 'center'
                        },
                       
                    ],
                   
                  }, 
               
                '\n',
                {
                    table: {
                          headerRows: 1,
                          widths: [ 100, 100, 80, 50, 65, 55],
                          body: column 
                                    
                    }
                  },
                  { 
                    text: 'Esse relatório foi emitido através do sistema SGF-Caminhões '+'\n',
                    fontSize: '9'
                   
                  },

                  { 
                    text: 'Filtrado por '+  filter+'\n',
                    fontSize: '9'
                   
                  },
                  
                  { 
                    text: '\n',
                    fontSize: '16'
                   
                  },
                  filter == 'veículos ativos' ?
                  { 
                    text: 'Total: '+ totalVehicles,
                    fontSize: '12',
                    color: 'blue'
                   
                  }: {},  
                  filter == 'veículos inativos' ?
                  { 
                    text: 'Total: '+ totalVehicles,
                    fontSize: '12',
                    color: 'blue'
                   
                  }: {},
                  filter == 'todos' ?
                  [
                    { 
                        text: 'Ativos: '+ totalAtivo,
                        fontSize: '12',
                        color: 'green'
                    
                    },
                    { 
                        text: 'Inativos: '+ totalInativo,
                        fontSize: '12',
                        color: 'red'
                    
                    },
                    { 
                        text: 'Total: '+ totalVehicles,
                        fontSize: '12',
                        color: 'blue'
                   
                    }]: {},   
                 
                ]
                
            }
            var pdfDoc = printer.createPdfKitDocument(docDefinition)
            pdfDoc.pipe(fs.createWriteStream('C:/laragon/etc/apps/laragon/uploads/veiculos_filtros.pdf'))
            pdfDoc.end()
            return 'sucesso'

        }catch(error){
            console.log(error)
        }
    }
    
    async cartsByFilters ({ params, request }) {
        const data = request.all()
        var filter = []
        var totalAtivo = 0
        var totalInativo = 0
        var totalCarretas = 0
        var column = []
        var value = []
        var status = ''
       
        try {
            const carts = await Cart.query().where(data)
  
            filter = data.status
            if(filter == 1){
                filter = 'carretas ativas'
            }else if(filter == 0){
                filter = 'carretas inativas'
            }else{
                filter = 'todas'
            }
           
        if(carts == ''){
            return 'Não existe dados'
        }else {

        for(let i=0; i < carts.length ; i++) {
           
            var x = carts[i].km_current.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
            x =  x.toString()
            x = x.replace(',',' ')
            x = x.replace('.',',')
            var km_current = x.replace(' ','.')
    
            var y = carts[i].sale_value.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
            y =  y.toString()
            y = y.replace(',',' ')
            y = y.replace('.',',')
            var sale_value = y.replace(' ','.')
    
            var d = carts[i].purchase_price.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
            d =  d.toString()
            d = d.replace(',',' ')
            d = d.replace('.',',')
            var purchase_price = d.replace(' ','.')
            
            var t = carts[i].capacity.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
            t =  t.toString()
            t = t.replace(',',' ')
            t = t.replace('.',',')
            var capacity = t.replace(' ','.')

            //contar status
           if(carts[i].status == 1) {
            totalAtivo = totalAtivo+1
            totalCarretas = totalCarretas+1
            }else{
               totalInativo = totalInativo+1
               totalCarretas = totalCarretas+1
            }

             // traduzir o status
             if(carts[i].status == 1){
                status = 'Ativo'
            } else {
                status = 'Inativo'
            }
            
                column.push([
                    
                        [
                            [
                                {
                                    text: 'Marca',
                                    fontSize: '11'
                                       
                                },
                            ],
                            {
                                text: carts[i].brand,
                                fontSize: '11'
                               
                            }
                            
                        ],
                        [
                            [
                                {
                                text: 'Modelo',
                                fontSize: '11'
                                }, 
                            ],
                            {
                                text: carts[i].model,
                                fontSize: '11'
                            }
                            
                            
                        ],
                        [   [
                                {
                                    
                                    text: 'Tipo',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                              
                                text: carts[i].type,
                                fontSize: '11'
                            }
                            
                        ],
                        [   [
                                {
                                    
                                    text: 'Capacidade',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                              
                                text: capacity,
                                fontSize: '11'
                            }
                            
                        ],
                        [   
                            [
                                {
                                    
                                    text: 'Placa',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                              
                                text: carts[i].plate,
                                fontSize: '11'
                            }
                            
                        ],
                        [   
                            [
                                {
                                    text: 'KM atual',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                                text: km_current+' KM',
                                fontSize: '11'
                            }
                            
                        ],
                        [
                            [
                                {
                                    text: 'Status',
                                    fontSize: '11'
                                    
                                }, 
                            ],
                            {
                                text: status,
                                fontSize: '11'
                            }
                            
                        ],

                ])
                
        }
    }
        
            var docDefinition = {
                pageSize: 'A4',
                pageMargins: [ 10, 10, 10, 10 ],
                footer: {
                  columns: [
                    { text: 'SGFCaminhões', alignment: 'center' }
                  ]
                },
                content: [
                  
                    {
                      columns: [
                          {
                                image: 'C:/laragon/etc/apps/laragon/uploads/image.png',
                                width: 150
                          },
                          [
                            {
                              stack: [
                                {
                                    columns: [
                                        {
                                            text: 'Sistema para Gerenciamento de Frotas'
                                        },
                                        {
                                            text: 'Data: '+str_data,
                                            width: 100
                                             
                                        },
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text:'xx.xxx.xxx/xxxx-xx',
                                            fontSize: '11'
                                          
                                        }, 
                                        {
                                            text: 'Horas: '+str_hora,
                                            style:'invoiceSubValue',
                                            width: 100,
                                        }
                                      ]
                                },
                                {
                                  columns: [
                                      {
                                          text:'Rua Santa Fé, QD 29 LT 03 Jussara - GO',
                                          fontSize: '11'
                                        
                                      }, 
                                    ]
                              },
                             
                            ]
        
                          }
                      ]     
                        
                    ],
                      
                  },
                   {
                    columns: [
                        {
                            text: 'Relatório de Carretas',
                            fontSize: '25',
                            alignment: 'center'
                        },
                       
                    ],
                   
                  }, 
               
                '\n',
                {
                    table: {
                          headerRows: 1,
                          widths: [ 100, 80, 60, 95, 50, 70, 50],
                          body: column 
                                    
                    }
                  },
                  { 
                    text: 'Esse relatório foi emitido através do sistema SGF-Caminhões '+'\n',
                    fontSize: '9'
                   
                  },

                  { 
                    text: 'Filtrado por '+  filter+'\n',
                    fontSize: '9'
                   
                  },
                  
                  { 
                    text: '\n',
                    fontSize: '16'
                   
                  },
                  filter == 'carretas ativas' ?
                  { 
                    text: 'Total: '+ totalCarretas,
                    fontSize: '12',
                    color: 'blue'
                   
                  }: {},  
                  filter == 'carretas inativas' ?
                  { 
                    text: 'Total: '+ totalCarretas,
                    fontSize: '12',
                    color: 'blue'
                   
                  }: {},
                  filter == 'todas' ?
                  [
                    { 
                        text: 'Ativos: '+ totalAtivo,
                        fontSize: '12',
                        color: 'green'
                    
                    },
                    { 
                        text: 'Inativos: '+ totalInativo,
                        fontSize: '12',
                        color: 'red'
                    
                    },
                    { 
                        text: 'Total: '+ totalCarretas,
                        fontSize: '12',
                        color: 'blue'
                   
                    }]: {},   
                 
                ]
                
            }
            var pdfDoc = printer.createPdfKitDocument(docDefinition)
            pdfDoc.pipe(fs.createWriteStream('C:/laragon/etc/apps/laragon/uploads/carretas_filtros.pdf'))
            pdfDoc.end()
            return 'sucesso'

        }catch(error){
            console.log(error)
        }
    }
    
    async itinerariesByFilters ({ params, request }) {
        const data = request.all()
        var filter = []
        var totalAtivo = 0
        var totalInativo = 0
        var totalItinerarios = 0
        var column = []
        var value = []
        var status = ''
        var distanceMask = []
        var getValue = []
       
        try {
            const itineraries = await Itinerary.query().where(data)
  
            filter = data.status
            if(filter == 1){
                filter = 'itinerarios ativos'
            }else if(filter == 0){
                filter = 'itinerarios inativos'
            }else{
                filter = 'todos'
            }
            
        if(itineraries == ''){
            return 'Não existe dados'
        }else {
            
        for(let i=0; i < itineraries.length ; i++) {

            //Mascara distância
            getValue[i] =  itineraries[i].distance.toLocaleString('pt-BR', { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
            distanceMask[i] =  getValue[i].toString()
            distanceMask[i] = distanceMask[i].replace(',',' ')
            distanceMask[i] = distanceMask[i].replace('.',',')
            distanceMask[i] = distanceMask[i].replace(' ','.')
          
            console.log(distanceMask[i])
            //contar status
           if(itineraries[i].status == 1) {
            totalAtivo = totalAtivo+1
            totalItinerarios = totalItinerarios+1
            }else{
               totalInativo = totalInativo+1
               totalItinerarios = totalItinerarios+1
            }

             // traduzir o status
             if(itineraries[i].status == 1){
                status = 'Ativo'
            } else {
                status = 'Inativo'
            }
            
                column.push([
                    
                        [
                            [
                                {
                                    text: 'Nome da Rota',
                                    fontSize: '11'
                                       
                                },
                            ],
                            {
                                text: itineraries[i].route_name,
                                fontSize: '11'
                               
                            }
                            
                        ],
                        [
                            [
                                {
                                text: 'Ponto Inicial',
                                fontSize: '11'
                                }, 
                            ],
                            {
                                text: itineraries[i].initial_point,
                                fontSize: '11'
                            }
                            
                            
                        ],
                        [   [
                                {
                                    
                                    text: 'Ponto Final',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                              
                                text: itineraries[i].end_point,
                                fontSize: '11'
                            }
                            
                        ],
                        [   [
                                {
                                    
                                    text: 'Distância',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                              
                                text:  distanceMask[i]+' km',
                                fontSize: '11'
                            }
                            
                        ],
                        [
                            [
                                {
                                    text: 'Status',
                                    fontSize: '11'
                                    
                                }, 
                            ],
                            {
                                text: status,
                                fontSize: '11'
                            }
                            
                        ],

                ])
                
        }
    }
        
            var docDefinition = {
                pageSize: 'A4',
                pageMargins: [ 10, 10, 10, 10 ],
                footer: {
                  columns: [
                    { text: 'SGFCaminhões', alignment: 'center' }
                  ]
                },
                content: [
                  
                    {
                      columns: [
                          {
                                image: 'C:/laragon/etc/apps/laragon/uploads/image.png',
                                width: 150
                          },
                          [
                            {
                              stack: [
                                {
                                    columns: [
                                        {
                                            text: 'Sistema para Gerenciamento de Frotas'
                                        },
                                        {
                                            text: 'Data: '+str_data,
                                            width: 100
                                             
                                        },
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text:'xx.xxx.xxx/xxxx-xx',
                                            fontSize: '11'
                                          
                                        }, 
                                        {
                                            text: 'Horas: '+str_hora,
                                            style:'invoiceSubValue',
                                            width: 100,
                                        }
                                      ]
                                },
                                {
                                  columns: [
                                      {
                                          text:'Rua Santa Fé, QD 29 LT 03 Jussara - GO',
                                          fontSize: '11'
                                        
                                      }, 
                                    ]
                              },
                             
                            ]
        
                          }
                      ]     
                        
                    ],
                      
                  },
                   {
                    columns: [
                        {
                            text: 'Relatório de Itinerários',
                            fontSize: '25',
                            alignment: 'center'
                        },
                       
                    ],
                   
                  }, 
               
                '\n',
                {
                    table: {
                          headerRows: 1,
                          widths: [ 100, 150, 150, 75, 50],
                          body: column 
                                    
                    }
                  },
                  { 
                    text: 'Esse relatório foi emitido através do sistema SGF-Caminhões '+'\n',
                    fontSize: '9'
                   
                  },

                  { 
                    text: 'Filtrado por '+  filter+'\n',
                    fontSize: '9'
                   
                  },
                  
                  { 
                    text: '\n',
                    fontSize: '16'
                   
                  },
                  filter == 'itinerarios ativos' ?
                  { 
                    text: 'Total: '+ totalItinerarios,
                    fontSize: '12',
                    color: 'blue'
                   
                  }: {},  
                  filter == 'itinerarios inativos' ?
                  { 
                    text: 'Total: '+ totalItinerarios,
                    fontSize: '12',
                    color: 'blue'
                   
                  }: {},
                  filter == 'todos' ?
                  [
                    { 
                        text: 'Ativos: '+ totalAtivo,
                        fontSize: '12',
                        color: 'green'
                    
                    },
                    { 
                        text: 'Inativos: '+ totalInativo,
                        fontSize: '12',
                        color: 'red'
                    
                    },
                    { 
                        text: 'Total: '+ totalItinerarios,
                        fontSize: '12',
                        color: 'blue'
                   
                    }]: {},   
                 
                ]
                
            }
            var pdfDoc = printer.createPdfKitDocument(docDefinition)
            pdfDoc.pipe(fs.createWriteStream('C:/laragon/etc/apps/laragon/uploads/itinerarios_filtros.pdf'))
            pdfDoc.end()
            return 'sucesso'

        }catch(error){
            console.log(error)
        }
    }
    
    async usersByFilters ({ params, request }) {
        const data = request.all()
        var filter = []
        var totalAtivo = 0
        var totalInativo = 0
        var totalUsers = 0
        var column = []
        var status = ''
        var type = []
     
     
       
        try {
            const users = await User.query().where(data)
  
            filter = data.status
            if(filter == 1){
                filter = 'usuários ativos'
            }else if(filter == 0){
                filter = 'usuários inativos'
            }else{
                filter = 'todos'
            }

            
        if(users == ''){
            return 'Não existe dados'
        }else {
            
        for(let i=0; i < users.length ; i++) {
         
           if(users[i].acess == 'admin'){
               type[i] = 'Admin'
           }else {
               type[i] = 'Operador'
           }
            //contar status
           if(users[i].status == 1) {
            totalAtivo = totalAtivo+1
            totalUsers = totalUsers+1
            }else{
               totalInativo = totalInativo+1
               totalUsers = totalUsers+1
            }

             // traduzir o status
             if(users[i].status == 1){
                status = 'Ativo'
            } else {
                status = 'Inativo'
            }
            
                column.push([
                    
                        [
                            [
                                {
                                    text: 'Nome',
                                    fontSize: '11'
                                       
                                },
                            ],
                            {
                                text: users[i].name,
                                fontSize: '11'
                               
                            }
                            
                        ],
                        [
                            [
                                {
                                text: 'E-mail',
                                fontSize: '11'
                                }, 
                            ],
                            {
                                text: users[i].email,
                                fontSize: '11'
                            }
                            
                            
                        ],
                        [   [
                                {
                                    
                                    text: 'Tipo',
                                    fontSize: '11'
                                }, 
                            ],
                            {
                              
                                text: type[i],
                                fontSize: '11'
                            }
                            
                        ],
                        [
                            [
                                {
                                    text: 'Status',
                                    fontSize: '11'
                                    
                                }, 
                            ],
                            {
                                text: status,
                                fontSize: '11'
                            }
                            
                        ],

                ])
                
        }
    }
        
            var docDefinition = {
                pageSize: 'A4',
                pageMargins: [ 40, 10, 10, 10 ],
                footer: {
                  columns: [
                    { text: 'SGFCaminhões', alignment: 'center' }
                  ]
                },
                content: [
                  
                    {
                      columns: [
                          {
                            image: 'C:/laragon/etc/apps/laragon/uploads/image.png',
                            width: 150
                          },
                          [
                            {
                              stack: [
                                {
                                    columns: [
                                        {
                                            text: 'Sistema para Gerenciamento de Frotas'
                                        },
                                        {
                                            text: 'Data: '+str_data,
                                            width: 100
                                             
                                        },
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text:'xx.xxx.xxx/xxxx-xx',
                                            fontSize: '11'
                                          
                                        }, 
                                        {
                                            text: 'Horas: '+str_hora,
                                            style:'invoiceSubValue',
                                            width: 100,
                                        }
                                      ]
                                },
                                {
                                  columns: [
                                      {
                                          text:'Rua Santa Fé, QD 29 LT 03 Jussara - GO',
                                          fontSize: '11'
                                        
                                      }, 
                                    ]
                              },
                             
                            ]
        
                          }
                      ]     
                        
                    ],
                      
                  },
                   {
                    columns: [
                        {
                            text: 'Relatório de Usuários',
                            fontSize: '25',
                            alignment: 'center'
                        },
                       
                    ],
                   
                  }, 
               
                '\n',
                {
                    table: {
                          headerRows: 1,
                          widths: [ 170, 160, 60, 60],
                          body: column 
                                    
                    }
                  },
                  { 
                    text: 'Esse relatório foi emitido através do sistema SGF-Caminhões '+'\n',
                    fontSize: '9'
                   
                  },

                  { 
                    text: 'Filtrado por '+  filter+'\n',
                    fontSize: '9'
                   
                  },
                  
                  { 
                    text: '\n',
                    fontSize: '16'
                   
                  },
                  filter == 'usuários ativos' ?
                  { 
                    text: 'Total: '+ totalUsers,
                    fontSize: '12',
                    color: 'blue'
                   
                  }: {},  
                  filter == 'usuários inativos' ?
                  { 
                    text: 'Total: '+ totalUsers,
                    fontSize: '12',
                    color: 'blue'
                   
                  }: {},
                  filter == 'todos' ?
                  [
                    { 
                        text: 'Ativos: '+ totalAtivo,
                        fontSize: '12',
                        color: 'green'
                    
                    },
                    { 
                        text: 'Inativos: '+ totalInativo,
                        fontSize: '12',
                        color: 'red'
                    
                    },
                    { 
                        text: 'Total: '+ totalUsers,
                        fontSize: '12',
                        color: 'blue'
                   
                    }]: {},   
                 
                ]
                
            }
            var pdfDoc = printer.createPdfKitDocument(docDefinition)
            pdfDoc.pipe(fs.createWriteStream('C:/laragon/etc/apps/laragon/uploads/usuarios_filtros.pdf'))
            pdfDoc.end()
            return 'sucesso'

        }catch(error){
            console.log(error)
        }
    }
}

module.exports = ReportController
