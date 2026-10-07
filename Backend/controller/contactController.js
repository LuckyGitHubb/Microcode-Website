const sendEmail = require('../utils/mailSent');
const Contact = require('../model/contactModel');

 

exports.getAllContact = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;
        const getAllContact = await Contact.find()
            // .skip(skip)
            // .limit(limit)
            .sort({ _id: -1 });

        const totalContact = await Contact.countDocuments();
        const totalPage = Math.ceil(totalContact / limit);

        return res.status(200).json({
            success:true,
            message: 'All Contact Fetched Successfully',
            data:getAllContact,
            totalContact,
            totalPage
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error While Fetching Contact', error });
    }
};

exports.updateContact = async (req, res) => {
    try {
        const { _id, ...updateData } = req.body;
        if (!_id) {
            return res.status(400).json({ message: 'Id is required' });
        }
        const updatedContact = await Contact.findByIdAndUpdate(_id, updateData, { new: true });
        return res.status(200).json({ message: 'Contact Updated Successfully', updatedContact });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error While Updating Contact', error });
    }
};

exports.getByContact = async (req, res) => {
    try {
        const { _id } = req.query;
        if (!_id) {
            return res.status(400).json({ message: 'Id is required' });
        }
        const contact = await Contact.findById(_id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        return res.status(200).json({ message: 'Single Contact Fetched Successfully', contact });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error While Fetching Contact', error });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ message: 'Id is required' });
        }
        const contactData = await Contact.findByIdAndDelete(_id);
        if (!contactData) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        return res.status(200).json({ message: 'Contact deleted successfully', contactData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};




const ContactModel = require('../model/contactModel');

exports.submitContact = async (req, res) => {
  try {
    const {token, name, mobile, email, description } = req.body;

    console.log("Received contact:", req.body);

    // const recaptchaRes = await axios.post(
    //     `https://www.google.com/recaptcha/api/siteverify`,
    //     new URLSearchParams({
    //       secret: '6LdhsjMrAAAAAM3pYTuMr7VL1Ifnmu0AE95XjqtN',
    //       response: token
    //     })
    //   );
  
    //   const { success, score } = recaptchaRes.data;
    //   if (!success || score < 0.5) {
    //     return res.status(400).json({ success: false, error: 'reCAPTCHA verification failed' });
    //   }

    // ✅ Save to DB
    const newContact = new ContactModel({ name, mobile, email, description });
    await newContact.save();

    // ✅ Send email after saving
    const emailResult = await sendEmail({ name, mobile, email, description });

    return res.status(200).json({
      success: true,
      message: "Contact submitted successfully",
      emailStatus: emailResult,
      data: newContact,
    });
  } catch (error) {
    console.error("❌ Error in submitContact:", error);
    return res.status(500).json({
      message: "Error submitting contact",
      error: error.message || error,
    });
  }
};


