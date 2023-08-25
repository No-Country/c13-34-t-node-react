import type { ObjectLiteral } from 'typeorm'
import { type User as UserEntity } from '../../entities/'

declare global {
  namespace Express {
    export interface Request {
      safeData?: Record<string, any>
      user?: UserEntity | null
      sessionUser?: ObjectLiteral | null
    }
  }
}
