import { UserPresenter } from 'src/auth/infrastructure/presenters/user.presenter'
export class ContactPresenter {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  createdAt: string
  updatedAt: string
  user: UserPresenter
}
