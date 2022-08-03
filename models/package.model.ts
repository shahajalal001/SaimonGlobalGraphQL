import {model, Schema} from 'mongoose'
let packageSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    startingPrice: {
        type: Number
    },
    duration: {
        type: Number
    },
    isMostPopular: {
        type: Boolean
    },
    isActive: {
        type: Boolean
    },
    cityName: {
        type: String,
        unique: true
    },
    plans: [{
        _id: {
            type: Schema.Types.ObjectId
        },
        singlePerPax: {
            type: Number
        },
        doublePerPax: {
            type: Number
        },
        twinPerPax: {
            type: Number
        },
        triplePerPax: {
            type: Number
        },
        child7To12: {
            type: Number
        },
        child3To6: {
            type: Number
        },
        infant: {
            type: Number
        }
    }]
}, {timestamps: true})
const Package = model('packages', packageSchema)
export default Package