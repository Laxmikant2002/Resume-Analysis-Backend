const Applicant = require('../models/Applicant');
const { encrypt, decrypt } = require('../services/encryptionService');
const { extractData } = require('../services/geminiService');
const dotenv = require('dotenv');
dotenv.config();

exports.enrichResume = async (req, res) => {
  const { raw_text } = req.body;

  try {
    const data = await extractData(raw_text);

    if (!data.name && !data.email && !data.education && !data.experience && !data.skills && !data.summary) {
      return res.status(404).json({ error: 'No data detected' });
    }

    const encryptedName = encrypt(data.name);
    const encryptedEmail = encrypt(data.email);

    const applicant = new Applicant({
      name: encryptedName,
      email: encryptedEmail,
      education: data.education,
      experience: data.experience,
      skills: data.skills,
      summary: data.summary
    });

    await applicant.save();
    res.status(200).json(applicant);
  } catch (error) {
    console.error('Data enrichment error:', error);
    res.status(500).json({ error: 'Data enrichment failed' });
  }
};

exports.searchResume = async (req, res) => {
  const { name } = req.body;
  
  try {
    const decryptedName = decrypt(name);
    const applicants = await Applicant.find({
      name: { $regex: new RegExp(decryptedName, 'i') }
    });

    if (applicants.length === 0) {
      return res.status(404).json({ error: 'No matches found' });
    }

    const encryptedResults = applicants.map(applicant => ({
      ...applicant._doc,
      name: encrypt(applicant.name),
      email: encrypt(applicant.email)
    }));

    res.status(200).json(encryptedResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};