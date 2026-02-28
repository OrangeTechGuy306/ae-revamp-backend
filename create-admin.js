const pool = require('./src/config/db');
const User = require('./src/models/User');

const createAdmin = async () => {
    try {
        const adminEmail = 'admin@aerenewable.com';
        const existing = await User.findByEmail(adminEmail);
        
        if (existing) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        await User.create({
            email: adminEmail,
            password: 'AdminPassword123!',
            full_name: 'System Admin',
            role: 'admin'
        });

        console.log('Admin user created successfully');
        console.log('Email: admin@aerenewable.com');
        console.log('Password: AdminPassword123!');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdmin();
