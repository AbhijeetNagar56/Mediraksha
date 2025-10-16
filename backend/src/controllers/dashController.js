export const uploadReport = async (req, res) => {
  try {
    const { patientId } = req.body;
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    const newReport = new Report({
      filename: req.file.filename,
      path: req.file.path,
      patient: patientId || null,
      uploadedBy: req.user.id,
    });

    await newReport.save();
    res.json({ msg: 'File uploaded successfully', report: newReport });
  } catch (err) {
    res.status(500).json({ msg: 'Upload failed', error: err.message });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await Report.find().populate('patient', 'name email');
    res.json(files);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching files' });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}, 'name email');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching patients' });
  }
};
