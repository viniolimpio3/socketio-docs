import dotenv from 'dotenv'

dotenv.config()

export default {
    //database 
    db_user: process.env.DATABASE_USER,
    db_pass: process.env.DATABASE_PASSWORD,
    mongo_cluster: process.env.MONGODB_CLUSTER,
    db: process.env.DATABASE,

    //server
    port: process.env.PORT
}