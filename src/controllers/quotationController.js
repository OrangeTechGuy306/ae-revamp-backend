const Quotation = require('../models/Quotation');

exports.createQuotation = async (req, res) => {
    try {
        const { fullName, contact, address, quoteRef, results, inputs } = req.body;
        
        if (!fullName || !contact || !address || !quoteRef || !results || !inputs) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const quotation = await Quotation.create({
            fullName,
            contact,
            address,
            quoteRef,
            results,
            inputs
        });

        res.status(201).json({
            message: 'Quotation created successfully',
            quotation
        });
    } catch (error) {
        console.error('Error creating quotation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.findAll();
        res.status(200).json(quotations);
    } catch (error) {
        console.error('Error fetching quotations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getQuotationById = async (req, res) => {
    try {
        const quotation = await Quotation.findById(req.params.id);
        if (!quotation) {
            return res.status(404).json({ message: 'Quotation not found' });
        }
        res.status(200).json(quotation);
    } catch (error) {
        console.error('Error fetching quotation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteQuotation = async (req, res) => {
    try {
        const deleted = await Quotation.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Quotation not found' });
        }
        res.status(200).json({ message: 'Quotation deleted successfully' });
    } catch (error) {
        console.error('Error deleting quotation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
