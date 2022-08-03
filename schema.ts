import { mergeSchemas } from '@graphql-tools/schema'
import packageSchema from './schema/package.schema'
import planSchema from './schema/plan.schema'

const schema = mergeSchemas({
    schemas: [
        packageSchema,
        planSchema
    ]
})
export default schema