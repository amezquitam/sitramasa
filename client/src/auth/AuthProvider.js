

const AuthProvider = {
    username: null,
    userRole: null,
    isAuthenticated: async () => {
        const rawRes = await fetch('/api/auth')
        return rawRes.status === 200
    },

    setSignedIn: null,

    init: async () => {
        const isAuthenticated = await AuthProvider.isAuthenticated()

        if (!isAuthenticated) return

        const username = localStorage.getItem('username')
        const userRole = localStorage.getItem('userRole')

        if (!userRole || !username) return

        AuthProvider.username = username
        AuthProvider.userRole = userRole

        AuthProvider.setSignedIn(true)
    },

    signIn: async (credentials) => {
        const url = `/api/auth`
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }

        const rawResult = await fetch(url, config)
        const result = await rawResult.json()

        AuthProvider.username = credentials.username
        AuthProvider.userRole = result.role

        localStorage.setItem('username', AuthProvider.username)
        localStorage.setItem('userRole', AuthProvider.userRole)
        AuthProvider.setSignedIn(true)
    },

    signUp: async (credentials) => {
        const url = `/api/user/`
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...credentials, roleId: 4 })
        }

        try {
            await fetch(url, config)
        } catch (err) {
            console.error(err)
            return
        }

        await AuthProvider.signIn(credentials)
    }
}

export default AuthProvider