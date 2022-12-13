import { Client, Account, Databases} from 'appwrite'

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("6392b8f6eca7faa5788b");
    

// Account
export const account = new Account(client)

// Database

export const database = new Databases(client, "6392b8f6eca7faa5788b")