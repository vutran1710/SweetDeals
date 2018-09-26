import express from 'express'

const router = express.Router()

const getIndex = (req, res) => {
  res.status(200).send('hello')
}

router.get('/', getIndex)

export default router
