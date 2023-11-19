const router = require('express').Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Healthcheck:
 *      type: object
 *      properties:
 *          status:
 *              type: string
 */

/**
 * @swagger
 * /healthcheck/basic:
 *   get:
 *      description: Returns a basic healthcheck status
 *      responses:
 *          200: 
 *              description: A successful response
 *              content:
 *                  application/json: 
 *                     schema: 
*                        $ref: '#/components/schemas/Healthcheck'
 */
router.get('/basic', (req, res) => {
    res.json({status: 'running'});
});

module.exports = router;