import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      projectType,
      message,
    } = req.body;

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!name || !email || !projectType || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    /* =====================================================
       SAVE CONTACT TO MONGODB
    ===================================================== */

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      projectType: projectType.trim(),
      message: message.trim(),
    });

    /* =====================================================
       TERMINAL LOG
    ===================================================== */

    console.log("");
    console.log("==========================================");
    console.log("📩 NEW CONTACT MESSAGE");
    console.log("==========================================");
    console.log(`Name       : ${contact.name}`);
    console.log(`Email      : ${contact.email}`);
    console.log(`Project    : ${contact.projectType}`);
    console.log(`Message    : ${contact.message}`);
    console.log(`Database ID: ${contact._id}`);
    console.log(`Status     : ${contact.status}`);
    console.log(
      `Received   : ${contact.createdAt.toLocaleString()}`
    );
    console.log("==========================================");
    console.log("");

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return res.status(201).json({
      success: true,
      message: "Your message has been received successfully.",
      data: {
        id: contact._id,
      },
    });
  } catch (error) {
    console.error("");
    console.error("==========================================");
    console.error("❌ CONTACT SUBMISSION ERROR");
    console.error("==========================================");
    console.error(error);
    console.error("==========================================");
    console.error("");

    return res.status(500).json({
      success: false,
      message: "Unable to submit your message right now.",
    });
  }
};