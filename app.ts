require('dotenv').config()
import schema from "./schema"
import mongoose from "mongoose"
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'

// process.env.NODE_ENV = 'production'
mongoose.connect(process.env.DATABASE_URL!).then((response) => {
    console.log('MongoDB Connected Successfully.')
}).catch((err) => {
    console.log('Database connection failed.')
})

const start = async() => {
    const app = express()
    const server = new ApolloServer({
        persistedQueries: false,
        schema: schema,
        plugins: [
            process.env.NODE_ENV === 'production'
                ? ApolloServerPluginLandingPageDisabled()
                : ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
    })
    await server.start()
    server.applyMiddleware({app})
    app.listen(process.env.PORT, () =>
        console.log(`Server is now running on http://localhost:${process.env.PORT}/graphql`)
    )
}

start().then(() => {})