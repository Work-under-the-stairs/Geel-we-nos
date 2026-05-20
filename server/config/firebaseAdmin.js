const admin = require("firebase-admin");
// هذا المسار يعني: ابحث عن الملف في نفس المجلد الذي يوجد فيه firebaseAdmin.js
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;