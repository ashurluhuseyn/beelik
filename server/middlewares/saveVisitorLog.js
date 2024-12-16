const VisitorLog = require("../models/visitorLog");

const saveVisitorLog = async (req, res, next) => {
    try {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      await VisitorLog.create({ ip });
      next();
    } catch (error) {
      console.error('Giriş məlumatı saxlanarkən xəta:', error);
      next();
    }
  };

module.exports = { saveVisitorLog };