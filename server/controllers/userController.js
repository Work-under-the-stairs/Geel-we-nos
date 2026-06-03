const User = require("../models/User");
const News = require("../models/News");


exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = "", role = "" } = req.query;
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } }
      ];
    }

    if (role) {
      query.role = role;
    }

    const users = await User.find(query)
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments(query); 

    res.json({ 
      total, 
      page: Number(page), 
      totalPages: Math.ceil(total / limit),
      users 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerDb = async (req, res) => {
  try {
    const { firebaseUid, username, email, name, avatar } = req.body;

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(409).json({ message: "البريد الإلكتروني أو اسم المستخدم مستخدم بالفعل." });
    }

    const user = await User.create({
      firebaseUid,
      username,
      email,
      name,
      avatar: avatar || "",
      role: "user",
    });

    const userObj = user.toObject();
    res.status(201).json(userObj);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { username, password, email, name, avatar, role } = req.body;
    const user = await User.create({ username, password, email, name, avatar, role });
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserByFirebaseUid = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.firebaseUid !== req.params.uid) {
      return res.status(403).json({ message: "غير مصرح لك بعرض بيانات هذا المستخدم." });
    }

    const user = await User.findOne({ firebaseUid: req.params.uid });
    
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود في قاعدة البيانات" });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getUserById = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "غير مصرح لك بعرض بيانات هذا المستخدم." });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "غير مصرح لك بتعديل بيانات هذا المستخدم." });
    }

    const allowed = ["name", "avatar", "email", "role"];
    const updates = {};
    
    allowed.forEach((f) => { 
      if (req.body[f] !== undefined) {
        if (f === "role" && req.user.role !== "admin") {
          return; 
        }
        updates[f] = req.body[f]; 
      } 
    });

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "غير مصرح لك بتعديل كلمة مرور هذا المستخدم." });
    }

    const user = await User.findById(req.params.id).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const { currentPassword, newPassword } = req.body;
    if (!(await user.comparePassword(currentPassword)))
      return res.status(401).json({ message: "Current password is incorrect" });

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const admin = require("firebase-admin"); 

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    if (user.firebaseUid) {
      try {
        await admin.auth().deleteUser(user.firebaseUid);
        console.log(`✅ تم حذف المستخدم ${user.firebaseUid} من Firebase`);
      } catch (firebaseErr) {
        console.warn("⚠️ تحذير: المستخدم غير موجود في Firebase:", firebaseErr.message);
      }
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "تم حذف المستخدم من النظام بالكامل بنجاح" });
  } catch (err) {
    res.status(500).json({ message: "حدث خطأ أثناء الحذف: " + err.message });
  }
};

exports.getDashboardSummary = async (req, res) => {
  try {
    const [totalNews, totalUsers, recentNews, topViewedNews] = await Promise.all([
      News.countDocuments(),
      User.countDocuments(),
      
      News.find()
        .sort("-createdAt")
        .limit(5)
        .populate("category", "name")
        .populate("writer", "name")
        .select("title images category views createdAt status writer"),
        
      News.find()
        .sort("-views")
        .limit(5)
        .select("title images views ")
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayNews = await News.countDocuments({ createdAt: { $gte: today } });

    const totalViewsResult = await News.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]);
    const totalViews = totalViewsResult.length > 0 ? totalViewsResult[0].totalViews : 0;

    const categoryStats = await News.aggregate([
      {
        $lookup: {
          from: "categories", 
          localField: "category",
          foreignField: "_id",
          as: "catInfo"
        }
      },
      { $unwind: { path: "$catInfo", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$catInfo.name", 
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } } 
    ]);

    const colors = ["bg-[#FF6347]", "bg-[#2E8B57]", "bg-[#4682B4]", "bg-[#DAA520]", "bg-[#BA55D3]", "bg-[#A9A9A9]"];
    const categoryDistribution = categoryStats.map((item, index) => ({
      name: item._id || "غير مصنف",
      count: item.count,
      percentage: totalNews > 0 ? Math.round((item.count / totalNews) * 100) : 0,
      color: colors[index % colors.length]
    }));

    res.json({
      data: {
        topStats: [
          { title: "المقالات", value: totalNews, sub: "إجمالي المقالات" },
          { title: "المشاهدات", value: totalViews, sub: "إجمالي المشاهدات" }, 
          { title: "المستخدمين", value: totalUsers, sub: "نشط" },
          { title: "المقالات اليوم", value: todayNews, sub: "من أمس" },
        ],
        recentArticles: recentNews.map(news => ({
          id: news._id,
          title: news.title,
          image: (news.images && news.images.length > 0) ? news.images[0] : "https://via.placeholder.com/150",
          category: news.category ? news.category.name : "غير مصنف", 
          writer: news.writer,
          createdAt: news.createdAt,
          date: new Date(news.createdAt).toLocaleDateString('ar-EG'),
          status: news.status,
          views: news.views || 0,
          statusColor: "bg-green-50 text-green-600"
        })),
        topViewed: topViewedNews.map((news, i) => ({
          id: news._id,
          rank: i + 1,
          title: news.title,
          views: news.views || 0,
          image: (news.images && news.images.length > 0) ? news.images[0] : "https://via.placeholder.com/150"
        })),
        categoryDistribution: categoryDistribution,
        quickStats: [] 
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};