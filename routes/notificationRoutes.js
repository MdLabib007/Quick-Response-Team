const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead } = require('../controllers/notificationController');

// Get all notifications for a user
router.get('/:userId', getNotifications);

// Mark a notification as read
router.patch('/:id/read', markAsRead);

module.exports = router;