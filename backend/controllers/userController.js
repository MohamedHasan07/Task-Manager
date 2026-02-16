import pool from "../db.js";

/* =====================================
   ADMIN : GET ALL USERS
===================================== */
export const getUsers = async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT id, name, email, role FROM users ORDER BY id"
    );

    res.json(users.rows);
  } catch (err) {
    res.status(500).json("Failed to fetch users");
  }
};


/* =====================================
   ADMIN : DELETE USER
===================================== */
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // prevent admin deleting himself (important)
    if (req.user.id == userId) {
      return res.status(400).json("You cannot delete yourself");
    }

    // delete user's tasks first (foreign key safety)
    await pool.query("DELETE FROM tasks WHERE assigned_to=$1", [userId]);

    // delete user
    await pool.query("DELETE FROM users WHERE id=$1", [userId]);

    res.json("User deleted successfully");
  } catch (err) {
    res.status(500).json("Failed to delete user");
  }
};
