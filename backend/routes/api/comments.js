const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

/**
 * Express router for comments API.
 * @module routes/api/comments
 */

module.exports = router;

/**
 * GET /api/comments
 * Get all comments.
 * @name GetComments
 * @route {GET} /api/comments
 */
router.get("/", (req, res, next) => {
    Comment.find()
        .then((comments) => {
            return res.json({ comments: comments.map((comment) => comment.toJSON()) });
        })
        .catch(next);
});

/**
 * DELETE /api/comments/:comment
 * Delete a comment by ID.
 * @name DeleteComment
 * @route {DELETE} /api/comments/:comment
 * @param {string} req.params.comment - The ID of the comment to be deleted.
 */
router.delete("/:comment", async (req, res, next) => {
    try {
        await Comment.findByIdAndDelete(req.comment._id);
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});
