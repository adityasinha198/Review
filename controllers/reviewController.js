const reviewModelSchema = require('../models/reviewModelSchema')
const companySchema = require('../models/companyModelSchema')

const addReview = async (req, res) => {
  try {

    const existsreview = await reviewModelSchema.findOne({ userId: req.body.userId })
    if (existsreview) {
      res.status(409).json({
        success: "failure",
        error: 'Already rated',
      })
    }
    else {
      const addReview = await new reviewModelSchema(req.body)
      const saveInfo = await addReview.save()
      if (saveInfo) {
        res.status(201).json({
          success: "success",
          message: "Review added",
          reviewdata: saveInfo
        })

      }
    }
  } catch (err) {
    res.status(400).json({
      success: 'failure',
      error: "error" + err.message

    })
  }
}


const getReview = async (req, res) => {
  try {

    const info = await reviewModelSchema.find({ companyId: req.params.id });
    res.status(200).json({
      success: "success",
      reviewData: info,
    });
  } catch (err) {
    res.status(400).json({
      success: "false",
      error: `error-${err.message}`,
    });
  }
};

const detailReview = async (req, res) => {
  try {

    const value = await reviewModelSchema.findById(req.params.id).populate({
      path: "companyId",
      select: { "cname": 1, "location": 1, "city": 1, "founded": 1 }
    })
    console.log(value)
    const companyInfo = value.companyId
    if (companyInfo) {
      res.status(200).json({
        success: "success",
        reviewData: companyInfo
      })
    }

  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: "error -" + err.message
    })
  }
}

const updateReview = async (req, res) => {
  try {

    const value = await reviewModelSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      success: "success",
      message: "Review updated",
      updatedData: value,
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: `error-${err.message}`,
    });
  }
}

const deletereview = async (req, res) => {
  const id = req.params.id;
  try {

    const delval = await reviewModelSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: "success",
      message: "Review deleted"
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: `error-${err.message}`,
    });
  }
}

module.exports = {
  getReview,
  addReview,
  updateReview,
  deletereview,
  detailReview,

}