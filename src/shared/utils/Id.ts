import { v4 as uuidv4 } from 'uuid'

export class Id {
  static novo(): string {
    return uuidv4()
  }
}

export default Id
