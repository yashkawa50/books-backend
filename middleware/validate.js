const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // validate body
    if (error) {
        const errorMessage = error.details.map((d) => d.message).join(", ");
        return res.status(400).json({ message: errorMessage });
    }
    next();
};

module.exports = validate;
