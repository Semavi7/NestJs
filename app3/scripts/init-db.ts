import { createConnection } from 'mysql2/promise';
import { typeOrmConfig } from '../src/app.module';

async function initializeDatabase() {
    try {
        const connection = await createConnection({
            host: typeOrmConfig.host,
            port: typeOrmConfig.port,
            user: typeOrmConfig.username,
            password: typeOrmConfig.password,
        });

        await connection.query(
            `CREATE DATABASE IF NOT EXISTS \`${typeOrmConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci;`
        );

        console.log('✅ Veritabanı başarıyla oluşturuldu veya zaten mevcuttu.');
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Veritabanı oluşturulurken hata:', error);
        process.exit(1);
    }
}

initializeDatabase()