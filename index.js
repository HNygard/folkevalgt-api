const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')

// Utilities
const handler = require('./lib/handler')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// ROUTES
router.get('/', handler.getFrontpage)
router.get('/kommuner', handler.getKommuner)
router.get('/fylker', handler.getFylker)
router.get('/:areaId', handler.getUtvalg)
router.get('/:areaId/:committeeId', handler.getUtvalg)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
