import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        console.log('MongoDB Connection');
        if (mongoose.connections[0].readyState) {
            console.log('MongoDB Connection Exists')
        }
        else {
            await mongoose.connect('mongodb+srv://ELSA:slwgidaik1@cluster0.ae6gaxg.mongodb.net/?retryWrites=true&w=majority');
            console.log('MongoDB Connected...');
        }
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectMongo;