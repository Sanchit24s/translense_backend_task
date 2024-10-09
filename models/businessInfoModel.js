const { Schema, model } = require("mongoose");
const validator = require("validator");

const isLocalOrValidURL = (value) => {
    return validator.isURL(value) || value.startsWith("http://localhost");
};

const businessInfoSchema = new Schema({
    businessName: {
        type: String,
        required: [true, "Business name is required"],
        trim: true,
        maxlength: [100, "Business name cannot be more than 100 characters"],
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
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
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
        maxlength: [200, "Address cannot be more than 200 characters"],
    },
    openingTime: {
        type: String,
        required: [true, "Opening time is required"],
        validate: {
            validator: function (v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: (props) => `${props.value} is not a valid time format (HH:MM)`,
        },
    },
    closingTime: {
        type: String,
        required: [true, "Closing time is required"],
        validate: {
            validator: function (v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: (props) => `${props.value} is not a valid time format (HH:MM)`,
        },
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
            message: (props) =>
                `${props.value} is not a valid 10-digit mobile number`,
        },
    },
    imageUrl: {
        type: String,
        validate: {
            validator: isLocalOrValidURL,
            message: "Please provide a valid URL for the image",
        },
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

const businessInfoModel = model("BusinessInfo", businessInfoSchema);
module.exports = businessInfoModel;
