const ownerModel = require("../models/ownerModel");
const businessModel = require("../models/businessInfoModel");
const validator = require("validator");
const { sendOTPByEmail } = require("../services/emailService");

const createOwner = async (req, res) => {
    try {
        const { businessId, email, mobileNumber } = req.body;

        const business = await businessModel.findById(businessId);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        if (business.email != email) {
            return res
                .status(400)
                .json({ message: "Email does not match the business email" });
        }

        if (business.mobileNumber != mobileNumber) {
            return res
                .status(400)
                .json({
                    message: "Mobile number does not match the business mobile number",
                });
        }

        const owner = new ownerModel(req.body);
        await owner.save();

        res.status(201).json({ message: "Owner added successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong. Please try again later..",
            error: error.message,
        });
    }
};

const getAllOwner = async (req, res) => {
    try {
        const owners = await ownerModel.find();
        res.status(200).json(owners);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong. Please try again later..",
            error: error.message,
        });
    }
};

const getOwnerById = async (req, res) => {
    try {
        const owner = await ownerModel.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ error: "Owner not found" });
        }
        res.status(200).json(owner);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong. Please try again later..",
            error: error.message,
        });
    }
};

const updateOwner = async (req, res) => {
    try {
        const ownerId = req.params.id;

        const updatedOwner = await ownerModel.findByIdAndUpdate(
            ownerId,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedOwner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        res.status(200).json({
            message: "Owner updated successfully",
            data: updatedOwner,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong. Please try again later..",
            error: error.message,
        });
    }
};

const deleteOwner = async (req, res) => {
    try {
        const ownerId = req.params.id;
        const owner = await ownerModel.findByIdAndDelete(ownerId);
        if (!owner) {
            return res.status(404).json({ error: "Business not found" });
        }
        res.status(200).json({ message: "Business deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Please try again later..",
            error: error.message,
        });
    }
};

const uploadProfilePicImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        const owner = await ownerModel.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
        const URL = `${BASE_URL}/image/${req.file.filename}`;

        if (!validator.isURL(URL) && !URL.startsWith("http://localhost")) {
            return res.status(400).json({ message: "Generated URL is not valid" });
        }

        owner.imageUrl = URL;

        await owner.save();

        res.json({
            message: "Image uploaded successfully",
            imageUrl: owner.imageUrl,
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

        const owner = await ownerModel.findOne({ email: email });
        console.log(otp, otpExpiration, owner);

        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        await ownerModel.findByIdAndUpdate(
            owner.id,
            {
                $set: {
                    otp: otp,
                    otpExpiration: otpExpiration
                }
            },
            { new: true }
        );

        sendOTPByEmail(email, otp);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {

    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const owner = await ownerModel.findOne({ email: email });

        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        if (owner.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const currentTime = new Date();
        if (currentTime > new Date(owner.otpExpiration)) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        const updatedOwner = await ownerModel.findOneAndUpdate(
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
    createOwner,
    getAllOwner,
    getOwnerById,
    updateOwner,
    deleteOwner,
    uploadProfilePicImage,
    sendOTP,
    verifyOTP
};
