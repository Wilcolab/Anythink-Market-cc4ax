/**
 * Express router for handling comment-related API endpoints.
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
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response containing an array of comments
 * @throws {Error} - If an error occurs while retrieving comments
 */
router.get("/", async (req, res, next) => {
    try {
        const comments = await Comment.find().sort({ createdAt: "descending" });
        res.json({ comments: comments.map((comment) => comment.toJSON()) });
    } catch (error) {
        next(error);
    }
});

/**
 * DELETE /api/comments/:comment
 * Deletes a comment by its ID.
 * @name DELETE/api/comments/:comment
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {number} - HTTP status code 204 indicating successful deletion
 * @throws {Error} - If an error occurs while deleting the comment
 */
router.delete("/:comment", async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.comment);
        if (!comment) {
            return res.sendStatus(404);
        }
        await comment.remove();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});