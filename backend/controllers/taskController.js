import pool from "../db.js";

/* =====================================
   ADMIN : GET ALL TASKS (with usernames)
===================================== */
export const getTasks = async (req,res)=>{
  try {
    const tasks = await pool.query(`
      SELECT tasks.*, users.name
      FROM tasks
      JOIN users ON users.id = tasks.assigned_to
      ORDER BY tasks.id DESC
    `);
    res.json(tasks.rows);
  } catch (err){
    res.status(500).json(err.message);
  }
};



/* =====================================
   ADMIN : GET USERS
===================================== */
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role FROM users ORDER BY id ASC"
    );

    res.status(200).json(result.rows);

  } catch (err) {
    console.error("GET USERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


/* =====================================
   ADMIN : ASSIGN TASK
===================================== */
export const assignTask = async (req,res)=>{
  const {title,description,assigned_to,deadline} = req.body;

  await pool.query(
    `INSERT INTO tasks(title,description,assigned_to,assigned_by,deadline,status)
     VALUES($1,$2,$3,$4,$5,'pending')`,
    [title,description,assigned_to,req.user.id,deadline]
  );

  res.json("Task assigned");
};


/* =====================================
   USER : GET MY TASKS
===================================== */
export const getMyTasks = async (req,res)=>{
  const tasks = await pool.query(
    "SELECT * FROM tasks WHERE assigned_to=$1 ORDER BY id DESC",
    [req.user.id]
  );
  res.json(tasks.rows);
};







/* =====================================
   UPDATE TASK
===================================== */
export const updateTask = async (req,res)=>{
  const {title,description} = req.body;

  await pool.query(
    "UPDATE tasks SET title=$1,description=$2 WHERE id=$3",
    [title,description,req.params.id]
  );

  res.json("Task updated");
};


/* =====================================
   DELETE TASK
===================================== */
export const deleteTask = async (req,res)=>{
  await pool.query("DELETE FROM tasks WHERE id=$1",[req.params.id]);
  res.json("Task deleted");
};


/* =====================================
   ADMIN : STATS
===================================== */
export const getStats = async (req,res)=>{
  const users = await pool.query("SELECT COUNT(*) FROM users");
  const pending = await pool.query("SELECT COUNT(*) FROM tasks WHERE status='pending'");
  const completed = await pool.query("SELECT COUNT(*) FROM tasks WHERE status='completed'");

  res.json({
    users: users.rows[0].count,
    pending: pending.rows[0].count,
    completed: completed.rows[0].count
  });
};

/* =====================================
   USER SUBMIT WORK → status = inreview
===================================== */
export const submitWork = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    await pool.query(
      `UPDATE tasks 
       SET comment=$1, status='inreview' 
       WHERE id=$2`,
      [comment, id]
    );

    res.json({ message: "Work submitted for review" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error submitting work");
  }
};


/* =====================================
   ADMIN APPROVE TASK → completed
===================================== */

export const approveTask = async (req,res)=>{
  try{
    const { id } = req.params;

    await pool.query(
      `UPDATE tasks 
       SET status='completed', completed_at=NOW()
       WHERE id=$1`,
      [id]
    );

    res.json("Task approved and completed");
  }catch(err){
    res.status(500).json(err.message);
  }
};


