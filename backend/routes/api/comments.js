/**
 * Express router for handling comments API endpoints.
 * @module routes/api/comments
 */

const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

/**
 * GET /api/comments
 * Retrieves all comments in descending order of creation.
 * @name GET/api/comments
 * @function
 * @memberof module:routes/api/comments
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response containing the comments
 */
router.get("/", (req, res, next) => {
    Comment.find()
        .sort({ createdAt: "descending" })
        .then((comments) => res.json({ comments: comments.map((comment) => comment.toJSON()) }))
        .catch(next);
});

/**
 * POST /api/comments/:comment/delete
 * Deletes a comment by its ID.
 * @name POST/api/comments/:comment/delete
 * @function
 * @memberof module:routes/api/comments
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response indicating success or failure
 */
router.post("/:comment/delete", async (req, res, next) => {
    try {
        await Comment.findByIdAndRemove(req.params.comment);
        res.json({ success: true });
    } catch (error) {
        next(error);
    }
});
