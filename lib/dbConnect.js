// import mongoose from 'mongoose';

// let isConnected = false;

// export async function connectDb() {
//   mongoose.set('strictQuery', true);

//   if (isConnected) {
//     console.log('Database connection already established');
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: 'share_prompt',
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     isConnected = true;

//     console.log('Successfully connected to the database');
//   } catch (error) {
//     console.log(error);
//   }
// }
