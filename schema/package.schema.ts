import {gql} from "apollo-server-express"
import {makeExecutableSchema} from "@graphql-tools/schema"

import {createPackage, searchAllPackages, updatePackage, deletePackage} from '../controllers/package.controller'
const resolvers = {
    Query: {
        searchAllPackages
    },
    Mutation: {
        createPackage,
        updatePackage,
        deletePackage
    }
}

const typeDefs = gql`
    type Query {
        searchAllPackages(searchPackageInput: SearchPackageInput): PackagesOutput
    }
    type Mutation {
        createPackage(packageInput: PackageInput): PackageOutput
        updatePackage(_id: ID!, packageInput: PackageInputOptional): PackageOutput
        deletePackage(_id: ID!): PackageOutput
    }

    input PackageInput {
        title: String!
        description: String!
        startingPrice: Float!
        duration: Int!
        isMostPopular: Boolean!
        isActive: Boolean!
        cityName: String!
    }

    input PackageInputOptional {
        title: String
        description: String
        startingPrice: Float
        duration: Int
        isMostPopular: Boolean
        isActive: Boolean
        cityName: String
    }

    input SearchPackageInput {
        _id: ID
        title: String
        description: String
        startingPrice: Float
        duration: Int
        isMostPopular: Boolean
        isActive: Boolean
        cityName: String
    }
    
    type PackageOutput {
        error: Boolean
        msg: String
    }

    type PlanData {
        _id: ID
        singlePerPax: Float
        doublePerPax: Float
        twinPerPax: Float
        triplePerPax: Float
        child7To12: Float
        child3To6: Float
        infant: Float
    }

    type PackageData {
        _id: ID
        title: String
        description: String
        startingPrice: Float
        duration: Int
        isMostPopular: Boolean
        isActive: Boolean
        cityName: String
        plans: [PlanData]
    }

    type PackagesOutput {
        error: Boolean
        msg: String
        data: [PackageData]
    }
`

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
export default schema