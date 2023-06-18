import Categorymodel from "../models/Categorymodel.js";
import slugify from "slugify";
export const createcategorycontroller = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "name is required" });
    }
    const existingcategory = await Categorymodel.findOne({ name });
    if (existingcategory) {
      return res.status(200).send({
        success: true,
        message: "category alreadt exists",
      });
    }
    const category = await new Categorymodel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "errors in category",
    });
  }
};

// update category
export const updatecategorycontroller = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Categorymodel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "category updated successfully",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "error in updation",
    });
  }
};

// get all cat
export const categorycontroller = async (req, res) => {
  try {
    const category = await Categorymodel.find({});
    res.status(200).send({
      success: true,
      message: "all categories list",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting all categories miss",
    });
  }
};

//single category
export const singlecategorycontroller = async (req, res) => {
  try {
    const category = await Categorymodel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "get single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting single category",
    });
  }
};
// delete category

export const deletecategorycontroller = async (req, res) => {
  try {
    const { id } = req.params;
    await Categorymodel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};
