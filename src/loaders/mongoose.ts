import mongoose from 'mongoose';

export default async (): Promise<unknown> => {
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
    family: 4,
  };

  mongoose.Promise = global.Promise;

  return mongoose
    .connect('mongodb+srv://Admin:vZ7vg35CC34dVFZ@users.d1obt.mongodb.net/Users', mongooseOptions)
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err));
};
