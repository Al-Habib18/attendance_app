/** @format */

const router = require("express").Router();
const userController = require("../controller/user");
/**
 * Get user by id or email
 */
router.get("/:userId", userController.get_user_by_id);

/**
 * Update user by id or email
 *  @Method PUT
 */
router.put("/:userId", userController.put_user_by_id);

/**
 * Update user by id or email
 *  @Method Patch
 */
router.patch("/:userId", userController.patch_user_by_id);

/**
 * Delete user by id or email
 */
router.delete("/:userId", userController.delete_user_by_id);

/**
 * Create a new user
 */
router.post("/", userController.post_user);

/**
 * Get all users , including
 *  - filter
 *  - sort
 *  - pagination
 *  - select properties
 *  @route /api/v1/user?sort=["by","name"]
 *  @method GET
 *  @visibility private
 */

router.get("/", userController.get_user);

module.exports = router;
