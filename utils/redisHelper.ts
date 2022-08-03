import { createClient } from 'redis'

const client = createClient()

client.on('error', (err) => console.log('Redis Client Error', err))

export const setValue = async(key,value) => {
    await client.connect()
    await client.set(key, value)
    await client.disconnect()
}

export const getValue = async(key) => {
    await client.connect()
    const value = await client.get(key)
    await client.disconnect()
    return value
}

export const removeAll = async() => {
    await client.connect()
    await client.flushAll()
    await client.disconnect()
}
