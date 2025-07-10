import { Inject, Injectable } from '@nestjs/common'
@Injectable()
export class UsersService {
    constructor(@Inject('CONFIG') private config) {}
    testConfig(){
        console.log(this.config)
    }

    getUserById(id: number) {
        this.testConfig()
        return { id, name: 'Jonh Doe' }
    }
}
