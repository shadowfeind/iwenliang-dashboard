import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    userName: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [5, 'Password should be at least 5 characters long'],
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User',
        required: [true, 'Role is required'],
      },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model('User', userSchema);

export default User;