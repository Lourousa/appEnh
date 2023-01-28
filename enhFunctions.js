const httprequest = require('./globalFunctionsEnh').httprequest

let enhFunctions = {}

enhFunctions.cityGet = (city) => {
    return new Promise(async (resolve, _reject) => {
        try{
            const optWeather = {
                timeout: 120000,
                hostname: 'api.openweathermap.org',            
                path: '/data/2.5/weather?q='+city+'&appid=36b3f347483a8e9c99f88e3d5c0f1443',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let data = {city: city}
            data.weather = (await httprequest(optWeather)).weather
            const optShops = {
                timeout: 120000,
                hostname: 'api.yelp.com',            
                path: '/v3/businesses/search?location='+city+'&sort_by=best_match&limit=20',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer OMHpf5t93xGXZKSG7dPrdjzDVsb1wJl8TiITTga8eGyb-xCPD7BZwQCG-a13PDBbE4QAb6u-MotIZtlM13zPFl-8m5BY-7vjsAnpi4LT6_GUwTGNHLdW8npvatbSY3Yx',
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            }
            data.shops = (await httprequest(optShops)).businesses
            resolve(data)
        }catch(err){
            console.log('enhFunctions.cityGet err:' + err)
            resolve(500)
        }
    })
}

module.exports = enhFunctions;