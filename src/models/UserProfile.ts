export interface UserProfileProps {
  userId?: string
  fullName?: string
  emailId?: string
  username?: string
  password?: string
  enabled?: boolean
  authorities?: string[]
  createdOn?: string
  updatedOn?: string

  // This code tells typescript the type of key and the list of possible values
  // This is the solution for the below error:
  /*
    Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'UserProfileProps'.
    No index signature with a parameter of type 'string' was found on type 'UserProfileProps'.me]
  */
  [key: string]: string | boolean | string[] | undefined
}

// export class UserProfile {
//   constructor(private profileData: UserProfileProps) {}

//   get(propName: string): string | boolean | string[] | undefined {
//     return this.profileData[propName]
//   }

//   getAll(): UserProfileProps {
//     return this.profileData
//   }

//   set(updatedProps: UserProfileProps): void {
//     Object.assign(this.profileData, updatedProps)
//   }
// }
