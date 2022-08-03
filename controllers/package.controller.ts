import Package from '../models/package.model'
import { getValue, setValue, removeAll } from '../utils/redisHelper'

export const createPackage = async (req, args, context) => {
    try {
        let {packageInput} = args
        let tempPackage = new Package(packageInput)
        let newPackage = await tempPackage.save()
        if(newPackage){
            await removeAll()
            return {
                error: false,
                msg: 'Package added successfully'
            }
        }
        return {
            error: false,
            msg: 'Failed to add package'
        }
        
    } catch (e) {
        if (e?.code === 11000 && e?.keyPattern?.title) {
            return {
                error: true,
                msg: 'Package title is unique',
            }
        }
        if (e?.code === 11000 && e?.keyPattern?.cityName) {
            return {
                error: true,
                msg: 'One package is already availabe in this city',
            }
        }
        return {
            error: true,
            msg: 'Server failed'
        }
    }
}

export const searchAllPackages = async (req, args, context) => {
    try {
        let packages = []
        let {searchPackageInput} = args
        const checkFromRedis = await getValue(JSON.stringify(searchPackageInput))
        if(checkFromRedis){
            packages = JSON.parse(checkFromRedis)
        }else{
            packages = await Package.find(searchPackageInput)
            await setValue(JSON.stringify(searchPackageInput), JSON.stringify(packages))
        }
        return {
            error: false,
            msg: 'Package get successfully',
            data: packages
        }
    } catch (e) {
        return {
            error: true,
            msg: 'Server failed'
        }
    }
}

export const updatePackage = async (req, args, context) => {
    try {
        let {_id, packageInput} = args
        let updatePackage = await Package.updateOne({_id},packageInput)
        if(updatePackage.modifiedCount > 0){
            await removeAll()
            return {
                error: false,
                msg: 'Package updated successfully',
            }
        }
        return {
            error: true,
            msg: 'Package update failed',
        }
        
    } catch (e) {
        if (e?.code === 11000 && e?.keyPattern?.title) {
            return {
                error: true,
                msg: 'Package title is unique',
            }
        }
        if (e?.code === 11000 && e?.keyPattern?.cityName) {
            return {
                error: true,
                msg: 'One package is already availabe in this city',
            }
        }
        return {
            error: true,
            msg: 'Server failed'
        }
    }
}

export const deletePackage = async (req, args, context) => {
    try {
        let {_id} = args
        let updatePackage = await Package.deleteOne({_id})
        if(updatePackage.deletedCount > 0){
            await removeAll()
            return {
                error: false,
                msg: 'Package deleted successfully',
            }
        }
        return {
            error: true,
            msg: 'Package delete failed',
        }
        
    } catch (e) {
        return {
            error: true,
            msg: 'Server failed'
        }
    }
}