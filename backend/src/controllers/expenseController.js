const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  try {
    const { category, amount, date } = req.body;
    const newExpense = await Expense.create({
      userId: req.user.userId,
      category,
      amount,
      date,
    });

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.user.userId },
      order: [["date", "DESC"]],
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({ 
      where: { id, userId: req.user.userId } 
    });

    if (!expense) return res.status(404).json({ message: "Expense not found" });

    await expense.destroy();
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
