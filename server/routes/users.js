const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


const { protect, restrictTo } = require("../middleware/authMiddleware"); 

router.get("/me", protect, async (req, res) => {
    try {
        const user = await require("../models/User").findOne({ firebaseUid: req.user.uid });
        if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get("/", protect, restrictTo("admin"), userController.getUsers);

router.get("/me/:uid", protect, userController.getUserByFirebaseUid);

router.get("/dashboard", userController.getDashboardSummary);

router.get("/:id", protect, restrictTo("admin"), userController.getUserById);


router.post("/register-db", userController.registerDb);

router.post("/add", protect, restrictTo("admin"), userController.addUser);

router.patch("/:id", protect, restrictTo("admin"), userController.updateUser);

router.patch("/:id/password", protect, userController.updatePassword);


router.delete("/:id", protect, restrictTo("admin"), userController.deleteUser);

module.exports = router;