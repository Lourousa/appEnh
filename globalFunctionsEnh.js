const https = require('https');

let globalFunctionsEnh = {};

globalFunctionsEnh.httprequest = (options, body=null, binary=false) => {
  return new Promise((resolve, reject) => { 
    const req = https.request(options, res => {
      if(res.statusCode > 204 || res.statusCode < 200){ 
        return reject(new Error(`Request Failed.\nStatus Code: ${res.statusCode}`))                                            
      }else if(!/^application\/json/.test(res.headers['content-type']) && options.headers['Content-Type'] !== res.headers['content-type']) {
        return reject(new Error(`Invalid content-type.\nExpected application/json but received ${res.headers['content-type']}`))
      }

      let resData
      if(binary){
        resData = []
      }else{
        resData = ''
        res.setEncoding('utf8') 
      } 

      res.on('data', chunk => { 
        if(binary){
          resData.push(chunk)
        }else{
          resData += chunk
        }                                                                                                  
      })

      res.on('end', () => {
        try {                                  
          let parsedData
          if(resData !== '' && resData !== undefined){
            if(binary){
              parsedData = Buffer.concat(resData)
            }else{
              parsedData = JSON.parse(resData)
            }
          }                                                                      
          return resolve(parsedData)                                                                              
        } catch(error) {
          return reject(`httprequest ${options.path} parse error: ${error}`)                                                                         
        }                                            
      })
    })
          
    req.on('error', error => {
      return reject(`httprequest ${options.path} error: ${error}`)   ;                          
    })

    if (body !== null){
      req.write(body)
    }

    req.end()

  })                   
}
 
module.exports = globalFunctionsEnh;