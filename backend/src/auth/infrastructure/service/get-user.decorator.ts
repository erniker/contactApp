import { createParamDecorator } from '@nestjs/common'
import { User } from '../repository/typeorm/user.typeorm.entity'

export const GetUser = createParamDecorator(
  (data, req): User => {
    return req.args[0].user || req.user
  },
)
