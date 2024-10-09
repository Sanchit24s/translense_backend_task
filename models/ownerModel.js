const { Schema, model } = require("mongoose");
const validator = require("validator");

const isLocalOrValidURL = (value) => {
    return validator.isURL(value) || value.startsWith("http://localhost");
};

const ownerSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        maxlength: [100, "Full name cannot be more than 100 characters"],
    },
    profilePic: {
        type: String,
        validate: {
            validator: isLocalOrValidURL,
            message: "Please provide a valid URL for the profile picture",
        },
    },
    state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
        maxlength: [200, "Address cannot be more than 200 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    mobileNumber: {
        type: String,
        required: [true, "Mobile number is required"],
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: (props) => `${props.value} is not a valid 10-digit mobile number`,
        },
    },
    businessId: {
        type: Schema.Types.ObjectId,
        ref: "BusinessInfo",
        required: [true, "Business ID is required"],
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiration: {
        type: Date,
        default: null
    },
});

const ownerModel = model("OwnerInfo", ownerSchema);
module.exports = ownerModel;
