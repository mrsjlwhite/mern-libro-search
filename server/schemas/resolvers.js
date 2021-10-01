const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (parent, { user }) => {
      return User.findOne({ user })
        .select('-__v -password')
        .populate('savedBooks');
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    // saveBook: async (parent, args, context) => {
    //   if (context.user) {
    //     const book = await Book.create({ ...args, username: context.user.username });

    //     await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { savedBooks: book } },
    //       { new: true }
    //     );

    //     return user;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // removeBook: async (parent, { bookId }, context) => {
    //   if (context.user) {
    //     const updateUser = await User.findOneAndUpdate(
    //       { _id: context.user.id },
    //       { $push: { savedBooks: { bookId: bookId } } },
    //       { new: true, runValidators: true }
    //     );

    //     return updateUser;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
  }
};

module.exports = resolvers;