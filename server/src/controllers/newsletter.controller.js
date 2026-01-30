import Newsletter from "../models/Newsletter.js";

// @desc    Get all newsletters
// @route   GET /api/newsletters
// @access  Public (filtered by status) / Admin (all)
export const getNewsletters = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const query = {};

    // If not admin, only show published
    if (!req.user || req.user.role !== "admin") {
      query.status = "published";
    } else if (status) {
      query.status = status;
    }

    const total = await Newsletter.countDocuments(query);
    const newsletters = await Newsletter.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      data: newsletters,
      meta: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single newsletter by ID
// @route   GET /api/newsletters/:id
// @access  Private/Admin
export const getNewsletterById = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }
    res.status(200).json(newsletter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single newsletter by slug
// @route   GET /api/newsletters/slug/:slug
// @access  Public
export const getNewsletterBySlug = async (req, res) => {
  try {
    const newsletter = await Newsletter.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }
    res.status(200).json(newsletter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new newsletter
// @route   POST /api/newsletters
// @access  Private/Admin
export const createNewsletter = async (req, res) => {
  try {
    const { title, month, year, description, sections } = req.body;

    const newsletter = await Newsletter.create({
      title,
      month,
      year,
      description,
      sections,
    });

    res.status(201).json(newsletter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update newsletter
// @route   PUT /api/newsletters/:id
// @access  Private/Admin
export const updateNewsletter = async (req, res) => {
  try {
    const { title, month, year, description, sections, status } = req.body;

    const newsletter = await Newsletter.findById(req.params.id);

    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    newsletter.title = title || newsletter.title;
    newsletter.month = month || newsletter.month;
    newsletter.year = year || newsletter.year;
    newsletter.description = description || newsletter.description;
    newsletter.sections = sections || newsletter.sections;
    newsletter.status = status || newsletter.status;

    const updatedNewsletter = await newsletter.save();
    res.status(200).json(updatedNewsletter);
  } catch (error) {
    console.error("Update Newsletter Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete newsletter
// @route   DELETE /api/newsletters/:id
// @access  Private/Admin
export const deleteNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);

    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    await newsletter.deleteOne();
    res.status(200).json({ message: "Newsletter removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
