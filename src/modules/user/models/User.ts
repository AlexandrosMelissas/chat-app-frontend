export interface User {
    id: string
    username: string
    password?: string
    email: string
    imageUrl: string | null
    jwtToken: string | null
    online: boolean
}
