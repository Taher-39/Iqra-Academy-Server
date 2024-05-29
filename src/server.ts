import mongoose from 'mongoose';
import config from './app/config/index';
import app from './app';

async function main() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const connection = await mongoose.connect(config.DB_URL as string);

    console.log(`MongoDB Connected: ${connection.connection.host}`);

    app.listen(config.PORT, () => {
      console.log(`Example app listening on PORT ${config.PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure code
  }
}

main().catch((err) => {
  console.error('Error in main function:', err);
  process.exit(1); // Exit process with failure code
});
