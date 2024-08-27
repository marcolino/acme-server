const jwt = require("jsonwebtoken");
const validateEmail = require("email-validator");
const { audit } = require("../helpers/messaging");
const emailService = require("../services/email.service");
const { normalizeEmail, localeDateTime, remoteAddress } = require("../helpers/misc");
const { logger } = require("./logger.controller");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const Plan = require("../models/plan.model");
const RefreshToken = require("../models/refreshToken.model");
const VerificationCode = require("../models/verificationCode.model");

const config = require("../config");

const signup = async(req, res, next) => {
  let roleName = "user";
  let planName = "free";
  let role, plan;
  
  if (!validateEmail.validate(req.parameters.email)) {
    return res.status(400).json({ message: req.t("Please supply a valid email") });
  }
  const email = normalizeEmail(req.parameters.email);

  if (config.mode.test) { // in test mode we allow role and plan to be forced by client
    if (req.parameters.forcerole) {
      roleName = req.parameters.forcerole;
    }
    if (req.parameters.forceplan) {
      planName = req.parameters.forceplan;
    }
  }

  // get the role
  try {
    role = await Role.findOne({name: roleName});
  } catch(err) {
    logger.error(`Error finding role ${roleName}:`, err);
    return next(Object.assign(new Error(err.message), { status: 500 }));
  }
  if (!role) {
    return res.status(400).json({ message: req.t("Invalid role name {{roleName}}", { roleName })});
  }
  

  // get plan
  try {
    plan = await Plan.findOne({name: planName});
  } catch(err) {
    logger.error(`Error finding plan ${planName}:`, err);
    return next(Object.assign(new Error(err.message), { status: 500 }));
  }
  if (!plan) {
    return res.status(400).json({ message: req.t("Invalid plan name {{planName}}", { planName })});
  }

  user = new User({
    email,
    password: req.parameters.password,
    firstName: req.parameters.firstName,
    lastName: req.parameters.lastName,
    roles: [role._id],
    plan: plan._id,
  });

  user.save(async(err, user) => {
    if (err) {
      // we don't check duplicated user email (err.code === 11000)
      // as it is done already as a route middleware
      logger.error("New user creation error:", err);
      return next(Object.assign(new Error(err.message), { status: 500 }));
    }

    // send verification code
    try {
      const signupVerification = user.generateSignupVerification(user._id);
      await signupVerification.save(); // save the verification code
  
      logger.info("VERIFICATION CODE:", signupVerification.code);
      
      await emailService.send(req, {
        to: user.email,
        subject: req.t("Signup Verification Code"),
        templateName: "signupVerificationCodeSent",
        templateParams: {
          userFirstName: user.firstName,
          userLastName: user.lastName,
          signupVerificationCode: signupVerification.code,
        },
      });
      return res.status(201).json({
        message: req.t("A verification code has been sent to {{email}}", { email: user.email }),
        codeDeliveryMedium: config.auth.codeDeliveryMedium,
        codeDeliveryEmail: user.email,
        ...(config.mode.test) && { code: signupVerification.code } // to enble test mode to verify signup
      });
    } catch(err) {
      logger.error(`Error sending verification code via ${config.auth.codeDeliveryMedium}:`, err);
      //return res.status(err.code).json({ message: req.t("Error sending verification code") + ": " + err.message + ".\n" + req.t("Please contact support at {{email}}", { email: config.email.support.to }) });
      return next(Object.assign(new Error(err.message), { status: 500 }));
    }
  });
};

const resendSignupCode = async(req, res, next) => {
  try {
    const email = normalizeEmail(req.parameters.email);
    const user = await User.findOne(
      { email },
      null,
      {
        allowUnverified: true,
      },
    );
    if (!user) {
      return res.status(401).json({ message: `The email address ${email} is not associated with any account. Double-check your email address and try again.`});
    }

    if (user.isVerified) {
      return res.status(400).json({ message: req.t("This account has already been verified, you can log in")});
    }

    const signupVerification = await user.generateSignupVerification(user._id);
    await signupVerification.save(); // save the verification code

    await emailService.send(req, {
      to: user.email,
      subject: req.t("Signup Verification Code Resent"),
      templateName: "signupVerificationCodeSent",
      templateParams: {
        userFirstName: user.firstName,
        userLastName: user.lastName,
        signupVerificationCode: signupVerification.code,
      },
    });

    res.status(200).json({ message: req.t("A verification code has been resent to {{to}} via {{codeDeliveryMedium}}", {to: user.email, codeDeliveryMedium: config.auth.codeDeliveryMedium}), codeDeliveryMedium: config.auth.codeDeliveryMedium });

  } catch(err) {
    logger.error("Error resending signup code:", err);
    return next(Object.assign(new Error(err.message), { status: 500 }));
  }
};

const signupVerification = async(req, res, next) => {
  if (!req.parameters.code) {
    return res.status(400).json({message: req.t("Code is mandatory")});
  }

  try {
    // find a matching code
    const code = await VerificationCode.findOne({ code: req.parameters.code });
    if (!code) {
      return res.status(400).json({ message: req.t("This code is not valid, it may be expired") });
    }

    // we found a code, find a matching user
    User.findOne(
      {
        _id: code.userId
      },
      null,
      {
        allowUnverified: true,
      },
      (err, user) => {
        if (err) {
          logger.error("Error finding user for the requested code:", err);
          res.status(err.code).json({message: err.message})
        }
        if (!user) {
          return res.status(400).json({ message: req.t("A user for this code was not found") });
        }
        if (user.isVerified) {
          return res.status(400).json({ message: req.t("This account has already been verified") });
        }

        // verify and save the user
        user.isVerified = true;
        user.save(async(err, user) => {
          if (err) {
            logger.error("Error saving user in signup verification:", err);
            return res.status(err.code).json({ message: err.message });
          }
          logger.info(`User signup: ${JSON.stringify(user)}`);
          audit({req, subject: `User ${user.email} signup completed`, htmlContent: `User: ${user.email}, IP: ${remoteAddress(req)}, on ${localeDateTime()}`});
          return res.status(200).json({ message: req.t("The account has been verified, you can now log in") });
        });
      }
    );
  } catch(err) {
    logger.error("Error verifying signup:", err);
    return next(Object.assign(new Error(err.message), { status: 500 }));
  }
}

const signin = async (req, res, next) => {
  const email = normalizeEmail(req.parameters.email);

  User.findOne(
    {
      email,
    },
    null,
    {
      allowDeleted: true,
      allowUnverified: true,
    }
  )
  .populate("roles", "-__v")
  .populate("plan", "-__v")
  .exec(async (err, user) => {
    if (err) {
      logger.error("Error finding user in signin request:", err);
      return next(Object.assign(new Error(err.message), { status: 500 }));
    }

    // check user is found
    if (!user) {
      return res.status(401).json({ message: req.t("User not found") });
    }

    // check user is not deleted
    if (user.isDeleted) {
      return res.status(401).json({ code: "AccountDeleted", message: req.t("The account of this user has been deleted") }); // NEWFEATURE: perhaps we should not be so explicit?
    }

    // check email is verified
    if (!user.isVerified) {
      return res.status(401).json({
        code: "AccountWaitingForVerification", message: req.t("This account is waiting for a verification; if you did register it, check your emails"),
      });
    }

    // check input password with user's crypted assword, then with passepartout password
    if (!user.comparePassword(req.parameters.password, user.password)) {
      if (!user.compareLocalPassword(req.parameters.password, process.env.PASSEPARTOUT_PASSWORD)) {
        return res.status(401).json({
          accessToken: null,
          // return "Wrong credentials", if we want to to give less info to attackers
          message: req.t("Wrong password"),
        });
      }
    }

    // creacte new access token
    user.accessToken = await RefreshToken.createToken(user, config.auth.accessTokenExpirationSeconds);

    // create new refresh token
    user.refreshToken = await RefreshToken.createToken(user, config.auth.refreshTokenExpirationSeconds);

    logger.info(`User signin: ${user.email}`);

    // notify administration about logins
    audit({req, subject: `User ${user.email} signin`, htmlContent: `User: ${user.email}, IP: ${remoteAddress(req)}, on ${localeDateTime()}`});
  
    // save user's language as from request
    User.findOneAndUpdate({ _id: user.id }, { $set: { language: req.language } }, { new: true }).then((user) => {
      logger.info("Saved user's language:", user.language);
    }).catch(err => {
      logger.error("Error saving user's language:", err);
      //res.status(500).send(err);
    })

    res.status(200).json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      plan: user.plan,
      justRegistered: user.justRegistered,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  });
};

const resetPassword = async(req, res, next) => {
  try {
    const { email } = req.parameters;
    if (!email) return res.status(400).json({ message: req.t("No email address to be reset")});
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: req.t("The email address {{email}} is not associated with any account; double-check your email address and try again", {email: email})});

    // generate and set password reset code
    const resetPassword = user.generatePasswordResetCode();
    user.resetPasswordCode = resetPassword.code;
    user.resetPasswordExpires = resetPassword.expires;

    // save the updated user object
    await user.save();

    // send email
    const subject = req.t("Password change request");
    const to = user.email;
    const from = process.env.FROM_EMAIL;
    logger.info(`Sending email: to: ${to}, from: ${from}, subject: ${subject}`);
    config.mode.production && logger.info(`Reset password code: ${user.resetPasswordCode}`);

    await emailService.send(req, {
      to: user.email,
      subject: req.t("Reset password code"),
      templateName: "resetPasswordCodeSent",
      templateParams: {
        userFirstName: user.firstName,
        userLastName: user.lastName,
        resetPasswordCode: user.resetPasswordCode,
      },
    });
    
    res.status(200).json({
      message: req.t("A reset code has been sent to {{email}} via {{codeDeliveryMedium}}", {email: user.email, codeDeliveryMedium: config.auth.codeDeliveryMedium}),
      codeDeliveryMedium: config.auth.codeDeliveryMedium,
      codeDeliveryEmail: user.email,
      ...(config.mode.test) && { code: user.resetPasswordCode } // to enble test mode to confirm reset password
    });
  } catch(err) {
    logger.error("Error resetting password:", err);
    return next(Object.assign(new Error(err.message), { status: 500 }));
  }
};

const resetPasswordConfirm = async(req, res, next) => {
  try {
    const { email } = req.parameters;
    const { password } = req.parameters;
    const { code } = req.parameters;

    if (!code) {
      return res.status(400).json({message: req.t("Password reset code not found"), code: "code"});
    }
     // if we want to distinguish among invalid / expired we have to split the following query
    const user = await User.findOne({email, resetPasswordCode: code, resetPasswordExpires: {$gt: Date.now()}});
    if (!user) {
      return res.status(400).json({message: req.t("Password reset code is invalid or has expired"), code: "code"});
    }

    // set the new password
    user.password = password;
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;

    // save the updated user object
    await user.save();

    return res.status(200).json({message: req.t("Your password has been updated")});

  } catch(err) {
    logger.error("Error in reset password confirm:", err);
    return next(Object.assign(new Error(err.message), { status: 500 }));
  }
};

/**
 * @route POST api/resendResetPasswordCode
 * @desc resend password reset code
 * @access public
 */
const resendResetPasswordCode = async(req, res, next) => {
  try {
    const { email } = req.parameters;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: `The email address ${req.parameters.email} is not associated with any account. Double-check your email address and try again.`});

    //if (user.isVerified) return res.status(400).json({ message: req.t("This account has already been verified") + ". " + req.t("You can log in")});

    user.generatePasswordResetCode();
      
    // save the updated user object
    await user.save();

    const subject = req.t("Reset Password Verification Code");
    const to = user.email;
    const from = process.env.FROM_EMAIL;
//     const html = `
// <p>Hi, ${user.firstName} ${user.lastName}.<p>
// <p>The code to reset your password is <b>${user.resetPasswordCode}</b>.</p>
// <p><i>If you did not request this, please ignore this email.</i></p>
//     `;
    logger.info("Sending email:", to, from, subject);
    config.mode.production && logger.info(`Reset password code: ${user.resetPasswordCode}`);

    await emailService.send(req, {
      to: user.email,
      subject: req.t("Reset password code"),
      templateName: "resetPasswordCodeSent",
      templateParams: {
        userFirstName: user.firstName,
        userLastName: user.lastName,
        resetPasswordCode: user.resetPasswordCode,
      },
    });

    return res.status(200).json({
      message: `A verification code has been sent to ${user.email}`,
      codeDeliveryMedium: config.auth.codeDeliveryMedium,
      codeDeliveryEmail: user.email,
    });

  } catch(err) {
    logger.error("Error resending reset password code:", err);
    return next(Object.assign(new Error(err.message), { status: 500 }));
  }
};

const refreshToken = async(req, res, next) => {
  const { token } = req.parameters;

  if (!token) { // refresh token is required
    return res.status(401).json({ message: req.t("Please make a new signin request") });
  }

  try {
    const refreshTokenDoc = await RefreshToken.findOne({ token });

    if (!refreshTokenDoc) { // refresh token not found
      return res.status(401).json({
        message: req.t("Session is expired, please make a new signin request"),
      });
    }

    if (RefreshToken.isExpired(refreshTokenDoc)) {
      // mongodb expired documents by default are disposed every minute
      RefreshToken.findByIdAndDelete(refreshTokenDoc._id, { useFindAndModify: false }).exec();
      return res.status(401).json({ // refresh token is expired
        message: req.t("Session is just expired, please make a new signin request"),
      });
    }

    let newAccessToken = jwt.sign({ id: refreshTokenDoc.user._id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: config.auth.accessTokenExpirationSeconds,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshTokenDoc.token,
    });
  } catch(err) {
    logger.error("Error refreshing token:", err);
    return next(Object.assign(new Error(err.message), { status: 500 }));
  }
};

module.exports = {
  signup,
  resendSignupCode,
  signupVerification,
  signin,
  resetPassword,
  resetPasswordConfirm,
  resendResetPasswordCode,
  refreshToken,
};
