import { DynamicModule, Module } from '@nestjs/common'

@Module({})
export class ConfigModule {
    static forRoot(env: 'dev' | 'prod'): DynamicModule {
        const isProd = env === 'prod'
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: 'CONFIG',
                    useValue: {
                        debug: !isProd,
                        db: isProd ? 'proddb' : 'devdb',
                    }
                }
            ],
            exports: ['CONFIG']
        }
    }
}