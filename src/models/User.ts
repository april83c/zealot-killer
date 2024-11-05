import mongoose, { Schema } from 'mongoose'

const UserSchema: Schema = new Schema({ 
    user: {
        type: String,
        required: true
    },
    summoningEyes: Number,
    zealotsKilled: Number,
    zealotsSinceLastEye: Number,
    zealuckLevel: Number,
    endermanPetLevel: Number
})

export default mongoose.model('users', UserSchema)