const { RedisFunctionFlags } = require('@redis/client/dist/lib/commands/generic-transformers')
const express = require('express')
const uuid = require('uuid')

const router = express.Router()
const redis = require('../core/redis/client')

router.get('/note/all', async (req, res) => {
    const data = await redis.client.KEYS('*')

    let result = []

    for (let i = 0; i < data.length; i++) {
        let value = await redis.client.GET(data[i])
        if(data[i] == 'timer') continue;
        
        result.push({ key: data[i], value })
    }

    res.json(result)
})

router.post('/note/addnote', async (req, res) => {
    const { note, time } = req.body
    if (time)
        await redis.client.SETEX(uuid.v4(), time, note);
    else
        await redis.client.SET(uuid.v4(), note);
    res.json('Value added')
})

router.get('/note/gettimer', async (req, res) => {
    const timer = await redis.client.GET('timer')
    if (timer == null) {
        await redis.client.SET('timer', 10)
        res.json(10)
    }
    else
        res.json(timer)
})

router.post('/note/increasetimer', async (req, res) => {
    const timer = await redis.client.GET('timer')
    if (timer == null)
        redis.client.SET('timer', 10)

    await redis.client.INCR('timer');

    res.json('timer increased')
})

router.post('/note/decreasetimer', async (req, res) => {
    const timer = await redis.client.GET('timer')
    if (timer == null)
        redis.client.SET('timer', 10)

    await redis.client.DECR('timer');

    res.json('timer increased')
})

module.exports = router