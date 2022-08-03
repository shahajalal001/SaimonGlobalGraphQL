import {gql} from "apollo-server-express"
import {makeExecutableSchema} from "@graphql-tools/schema"

import {addPlan, deletePlan, updatePlan} from '../controllers/plan.controller'
const resolvers = {
    Mutation: {
        addPlan,
        deletePlan,
        updatePlan
    }
}

const typeDefs = gql`
    type Mutation {
        addPlan(packageId: ID!, planInput: PlanInput): PlanOutput
        deletePlan(packageId: ID!, planId: ID!): PlanOutput
        updatePlan(packageId: ID!, planId: ID!, planInput: PlanInput): PlanOutput
    }

    input PlanInput {
        singlePerPax: Float!
        doublePerPax: Float!
        twinPerPax: Float!
        triplePerPax: Float!
        child7To12: Float!
        child3To6: Float!
        infant: Float!
    }

    type PlanOutput {
        error: Boolean
        msg: String
    }
`

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
export default schema