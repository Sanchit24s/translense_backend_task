const { Router } = require("express");
const businessRoutes = require("./businessRoutes");
const ownerRoutes = require("./ownerRoutes");

const router = Router();

router.use("/api/business", businessRoutes);
router.use("/api/owner", ownerRoutes);

module.exports = router;