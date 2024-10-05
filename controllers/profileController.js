const { Profile } = require('../models');

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profiles' });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error creating profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const [updated] = await Profile.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const profile = await Profile.findByPk(req.params.id);
      res.status(200).json(profile);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const deleted = await Profile.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting profile' });
  }
};
