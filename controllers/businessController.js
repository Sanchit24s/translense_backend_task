const businessInfoModel = require("../models/businessInfoModel");
const validator = require("validator");

const createBusinessInfo = async (req, res) => {
    try {
        const body = req.body;
        const business = new businessInfoModel(body);
        await business.save();

        res
            .status(201)
            .json({ message: "Business Info added successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong. Please try again later..",
            error: error.message,
        });
    }
};

const getAllBusinesses = async (req, res) => {
    try {
        const businesses = await businessInfoModel.find();
        res.status(200).json(businesses);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Please try again later..",
            error: error.message,
        });
    }
};

const getBusinessById = async (req, res) => {
    try {
        const business = await businessInfoModel.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ error: "Business not found" });
        }
        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Please try again later..",
            error: error.message,
        });
    }
};

const updateBusiness = async (req, res) => {
    try {
        const businessId = req.params.id;
        const body = req.body;

        const updatedBusiness = await businessInfoModel.findByIdAndUpdate(
            businessId,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedBusiness) {
            return res.status(404).json({ message: "Business not found" });
        }

        res.status(200).json({
            message: "Business info updated successfully",
            data: updatedBusiness,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Please try again later..",
            error: error.message,
        });
    }
};

const deleteBusiness = async (req, res) => {
    try {
        const businessId = req.params.id;
        const business = await businessInfoModel.findByIdAndDelete(businessId);
        if (!business) {
            return res.status(404).json({ error: "Business not found" });
        }
        res.status(200).json({ message: "Business deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Something went wrong. Please try again later..",
                error: error.message,
            });
    }
};

const uploadRestaurantImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        const business = await businessInfoModel.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
        const URL = `${BASE_URL}/image/${req.file.filename}`;

        if (!validator.isURL(URL) && !URL.startsWith("http://localhost")) {
            return res.status(400).json({ message: "Generated URL is not valid" });
        }

        business.imageUrl = URL;

        await business.save();

        res.json({
            message: "Image uploaded successfully",
            imageUrl: business.imageUrl,
        });
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Something went wrong. Please try again later..",
                error: error.message,
            });
    }
};

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const otp = Math.floor(100000 + Math.random() * 900000);

        const otpExpiration = new Date();
        otpExpiration.setMinutes(otpExpiration.getMinutes() + 5);

        const business = await businessInfoModel.findByIdAndUpdate(
            email,
            {
                $set: {
                    otp: otp,
                    otpExpiration: otpExpiration
                }
            },
            { new: true }
        );

        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {

    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const business = await businessInfoModel.findOne({ email: email });

        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        if (business.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const currentTime = new Date();
        if (currentTime > new Date(business.otpExpiration)) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        const updatedBusiness = await businessInfoModel.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    otp: null,
                    otpExpiration: null
                }
            },
            { new: true }
        );

        res.status(200).json({
            message: "OTP verified successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong. Please try again later.",
            error: error.message,
        });
    }
};


module.exports = {
    createBusinessInfo,
    getAllBusinesses,
    getBusinessById,
    updateBusiness,
    deleteBusiness,
    uploadRestaurantImage,
    sendOTP,
    verifyOTP
};
