const Installer = require('../models/Installer');

exports.registerInstaller = async (req, res) => {
    try {
        const { full_name, phone, other_phone, address, photo_url } = req.body;

        if (!full_name || !phone || !address) {
            return res.status(400).json({ message: 'Full name, phone, and address are required' });
        }

        const installer = await Installer.create({
            full_name,
            phone,
            other_phone,
            address,
            photo_url
        });

        res.status(201).json({
            message: 'Registration successful',
            installer
        });
    } catch (error) {
        console.error('Error registering installer:', error);
        res.status(500).json({ message: 'Error registering installer' });
    }
};

exports.getAllInstallers = async (req, res) => {
    try {
        const installers = await Installer.findAll();
        res.json(installers);
    } catch (error) {
        console.error('Error fetching installers:', error);
        res.status(500).json({ message: 'Error fetching installers' });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'verified', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const success = await Installer.updateStatus(id, status);
        if (!success) {
            return res.status(404).json({ message: 'Installer not found' });
        }

        res.json({ message: 'Status updated successfully' });
    } catch (error) {
        console.error('Error updating installer status:', error);
        res.status(500).json({ message: 'Error updating installer status' });
    }
};

exports.deleteInstaller = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await Installer.delete(id);
        if (!success) {
            return res.status(404).json({ message: 'Installer not found' });
        }
        res.json({ message: 'Installer deleted successfully' });
    } catch (error) {
        console.error('Error deleting installer:', error);
        res.status(500).json({ message: 'Error deleting installer' });
    }
};
