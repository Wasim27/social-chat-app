require('dotenv').config();

const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
} = require('apollo-server');

const mongoose = require('mongoose');
const Channel = require('./models/channel');
const Message = require('./models/message');
// const User = require('./models/user');

const MONGODB_URI = process.env.DB_CONN;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

const typeDefs = gql`
  type Channel {
    name: String!
    messageCount: Int
    messages: [Message]
    id: ID!
  }

  type Message {
    body: String!
    published: Int!
    channel: Channel!
    id: ID!
  }

  type Query {
    channelCount: Int!
    messageCount: Int!
    allChannels: [Channel!]!
    findChannel(id: ID!): Channel
  }

  type Mutation {
    createChannel(name: String!): Channel
    createMessage(body: String!, published: Int!, channel: String!): Message
  }
`;

const resolvers = {
  Query: {
    channelCount: () => Channel.collection.countDocuments(),
    messageCount: () => Message.collection.countDocuments(),
    allChannels: async (root, args) => {
      return Channel.find({});
    },
    findChannel: async (root, args) => Channel.findOne({ id: args.id }),
  },

  Channel: {
    messageCount: async (root) => {
      const messages = await Message.find({ channel: root._id });
      return messages.length;
    },
    messages: async (root) => {
      const messages = await Message.find({ channel: root._id });
      return messages;
    },
  },

  Mutation: {
    createChannel: async (root, args) => {
      const channel = new Channel({ ...args });

      try {
        await channel.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return channel.save();
    },

    createMessage: async (root, args) => {
      const message = new Message({ ...args });

      try {
        await message.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return message.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
