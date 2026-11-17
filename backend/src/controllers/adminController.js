import Contact from "../models/Contact.js";

/* =========================================================
   GET ALL CONTACTS
========================================================= */

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Get Contacts Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch contact messages.",
    });
  }
};

/* =========================================================
   GET CONTACT STATS
========================================================= */

export const getContactStats = async (req, res) => {
  try {
    const total = await Contact.countDocuments();

    const newMessages = await Contact.countDocuments({
      status: "new",
    });

    const readMessages = await Contact.countDocuments({
      status: "read",
    });

    const repliedMessages = await Contact.countDocuments({
      status: "replied",
    });

    return res.status(200).json({
      success: true,
      data: {
        total,
        new: newMessages,
        read: readMessages,
        replied: repliedMessages,
      },
    });
  } catch (error) {
    console.error("Contact Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch contact statistics.",
    });
  }
};

/* =========================================================
   UPDATE CONTACT STATUS
========================================================= */

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "new",
      "read",
      "replied",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact status.",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    console.log("");
    console.log("📌 CONTACT STATUS UPDATED");
    console.log("--------------------------------");
    console.log(`Name  : ${contact.name}`);
    console.log(`Email : ${contact.email}`);
    console.log(`Status: ${contact.status}`);
    console.log("--------------------------------");
    console.log("");

    return res.status(200).json({
      success: true,
      message: "Contact status updated successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Update Contact Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update contact status.",
    });
  }
};