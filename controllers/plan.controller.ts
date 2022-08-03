import Package from '../models/package.model'
import { removeAll } from '../utils/redisHelper'

export const addPlan = async (req, args, context) => {
    try {
        let {packageId, planInput} = args
        let updatePackage = await Package.updateOne({_id: packageId},{
            $push: {
                plans: planInput
            }
        })
        if(updatePackage.modifiedCount > 0){
            await removeAll()
            return {
                error: false,
                msg: 'Plan added successfully'
            }
        }
        return {
            error: true,
            msg: 'Plan add failed'
        }
    } catch (e) {
        return {
            error: true,
            msg: 'Server failed'
        }
    }
}

export const deletePlan = async (req, args, context) => {
    try {
        let {packageId, planId} = args
        let updatePackage = await Package.updateOne({_id: packageId},{
            $pull: {
                plans: {
                    _id: planId
                }
            }
        })
        if(updatePackage.modifiedCount > 0){
            await removeAll()
            return {
                error: false,
                msg: 'Plan deleted successfully'
            }
        }
        return {
            error: true,
            msg: 'Plan deletion failed'
        }
    } catch (e) {
        return {
            error: true,
            msg: 'Server failed'
        }
    }
}

export const updatePlan = async (req, args, context) => {
    try {
        let {packageId, planId, planInput} = args
        let updatePackage = await Package.updateOne({_id: packageId, plans: {
            $elemMatch: {
                _id: planId
            }
        }},{
            $set: {
                'plans.$.singlePerPax': planInput.singlePerPax,
                'plans.$.doublePerPax': planInput.doublePerPax,
                'plans.$.twinPerPax': planInput.twinPerPax,
                'plans.$.triplePerPax': planInput.triplePerPax,
                'plans.$.child7To12': planInput.child7To12,
                'plans.$.child3To6': planInput.child3To6,
                'plans.$.infant': planInput.infant
            }
        })
        if(updatePackage.modifiedCount > 0){
            await removeAll()
            return {
                error: false,
                msg: 'Plan updated successfully'
            }
        }
        return {
            error: true,
            msg: 'Plan update failed'
        }
    } catch (e) {
        return {
            error: true,
            msg: 'Server failed'
        }
    }
}