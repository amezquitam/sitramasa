import express from 'express'

const router = express.Router({
    caseSensitive: true
})

router.get('/user/:id', (req, res) => {
    res.send(req.params.id)
})

export default router
