const Router = require('express')
const enhFunctions = require('../enhFunctions')

let router = Router()

router.get('/cities', async (_req, res)=>{ 
    try {
        const citiesStub = ['Rome', 'Turin', 'Milan', 'London', 'Paris']
        const prms = citiesStub.map(city => enhFunctions.cityGet(city))
        // La promise cityGet non rigetta mai, se lo facesse sarebbe sbagliato perchè viene utilizzata dentro Promise.all. 
        // Se cityGet rigettasse, la response potrebbe venire restituita al client prima che si verifichino tutti i 
        // possibili rigetti delle varie httprequest effettuate dentro ciascuna di esse e quindi si avrebbero delle uncaughtException,
        // non verrebbe catchato il reject della chiamata http perchè la response è già stata restituita.
        const citiesData = await Promise.all(prms) 
        // se almeno una promise è fallita restituisco 500, altrimenti 200
        if(citiesData.some(item => item===500)){
            console.log("enh/cities some cityGet fails")
            res.status(500).send("internal error")
            res.end()
        }else{
            res.send(citiesData)
        }
    } catch (err) {
        console.log("enh/cities " + err)
        res.status(500).send("internal error")
        res.end()
    }
})

module.exports = router;