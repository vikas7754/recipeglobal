const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/freecodez/image/upload/v1689877588/other/mtbqkio8fzr6gmw6878c.webp",
    },
    username: {
      type: String,
      required: true,
      maxlength: 100,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      maxlength: 100,
      default: "Hey, I am a good cook! check out my recipes on RecipeGlobal.",
    },
    social: {
      type: Object,
      default: {
        linkedin: "https://www.linkedin.com/in/vikas7754/",
        github: "https://github.com/vikas7754",
        website: "https://vikask.in/",
      },
    },
    role: {
      type: String,
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("validate", function (next) {
  this.username = this.username.toLowerCase().trim();
  this.email = this.email.toLowerCase().trim();
  this.name = this.name.trim();
  this.password = this.password.trim();
  next();
});

userSchema.pre("find", function (next) {
  const filter = this.getFilter();
  if (filter.isActive === undefined) {
    this.where({ isActive: true });
  } else if (filter.isActive !== true) {
    this.where({ isActive: false });
  } else {
    this.where({ isActive: true });
  }
  next();
});

//to login
userSchema.methods.comparepassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

// generate token
userSchema.methods.generateToken = async function () {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), SECRET);
  user.token = token;
  await user.updateOne({ $set: { token: token } });
  return token;
};

// find by token
// userSchema.static("findByToken", async (token) => {
//   try {
//     const decode = jwt.verify(token, confiq.SECRET);
//     const User = mongoose.model("User");
//     const userdata = await User.findOne({ _id: decode, token: token });
//     return userdata;
//   } catch (err) {
//     throw err;
//   }
// });

//delete token
// userSchema.methods.deleteToken = async (token, cb) => {
//   try {
//     const User = mongoose.model("User");
//     const user = await User.updateOne({ $unset: { token: 1 } });
//     return user;
//   } catch (err) {
//     throw err;
//   }
// };

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
