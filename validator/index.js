exports.userSignupValidator = (req, res, next) => {
    req.check("username", "Username is required").notEmpty();
    req.check("username", "Username must be between 3 to 32 characters")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 8 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number")
        .matches(/[a-z]/)
        .withMessage("Password must contain a lower case character")
        .matches(/[A-Z]/)
        .withMessage("Password must contain a upper case character")
        .matches(/[!@#$%^&*]/)
        .withMessage("Password must contain a spacial character");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};