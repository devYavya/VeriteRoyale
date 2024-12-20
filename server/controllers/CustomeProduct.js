

const { sendMail } = require('../Mail/Mail');
const CustomPerfume = require('../modles/Custome'); 
const User = require('../modles/User'); 


exports.createCustomPerfume = async (req, res) => {
  try {
    const { userId, baseScent, concentration, size, packaging, customization, totalPrice } = req.body;

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User  not found'
      });
    }

    const customPerfume = new CustomPerfume({
      userId,
      baseScent,
      concentration,
      size,
      packaging,
      customization,
      totalPrice
    });

    const savedPerfume = await customPerfume.save();

    const emailBody = `
      Hello ${user.name},

      Thank you for your order! Here are the details of your custom perfume:

      - Base Scent: ${baseScent}
      - Concentration: ${concentration}
      - Size: ${size}
      - Packaging: ${packaging}
      - Customization: ${customization}
      - Total Price: $${totalPrice}

      We appreciate your business and hope you enjoy your custom creation!

      Best regards,
      The VÉRITÉ ROYALE Team
    `;

    try {
      await sendMail(user.email, "Order Confirmation - Thank You for Your Purchase!", emailBody);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    res.status(201).json({
      success: true,
      data: savedPerfume
    });

  } catch (error) {
    console.error('Error creating custom perfume:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};


exports.getAllCustomPerfumes = async (req, res) => {
  try {
    const customPerfumes = await CustomPerfume.find().populate('userId', 'name email');;
  
    res.status(200).json({
      success: true,
      count: customPerfumes.length,
      data: customPerfumes
    });

  } catch (error) {
    res.status(500).json({
      success: false, 
      error: 'Server Error'
    });
  }
};


exports.getCustomPerfume = async (req, res) => {
  try {
    const customPerfume = await CustomPerfume.findById(req.params.id);

    if (!customPerfume) {
      return res.status(404).json({
        success: false,
        error: 'Custom perfume order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: customPerfume
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};


exports.updateCustomPerfume = async (req, res) => {
  try {
    const customPerfume = await CustomPerfume.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!customPerfume) {
      return res.status(404).json({
        success: false,
        error: 'Custom perfume order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: customPerfume
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};


exports.deleteCustomPerfume = async (req, res) => {
  try {
    const customPerfume = await CustomPerfume.findByIdAndDelete(req.params.id);

    if (!customPerfume) {
      return res.status(404).json({
        success: false,
        error: 'Custom perfume order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
