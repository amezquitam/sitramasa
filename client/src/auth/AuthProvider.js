
const AuthProvider = {
    token: null,
    username: null,
    userRole: null,
    isAuthenticated: false,

    setSignedIn: null,

    init: async () => {
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('username')
        const userRole = localStorage.getItem('userRole')

        if (!token || !userRole || !username) return

        // Test if token is valid
        const url = `http://localhost:8100/api/role/`
        const config = {
            method: 'GET',
            headers: { authorization: token },
        }

        try {
            await fetch(url, config)

            AuthProvider.token = token
            AuthProvider.username = username
            AuthProvider.userRole = userRole
            AuthProvider.isAuthenticated = true
        } catch(err) {
            console.error(err)
        }
    },

    signIn: async (credentials) => {
        const url = `http://localhost:8100/api/auth`
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
        AuthProvider.token = result.token
        AuthProvider.isAuthenticated = true

        localStorage.setItem('token', result.token)
        localStorage.setItem('username', AuthProvider.username)
        localStorage.setItem('userRole', AuthProvider.userRole)
        AuthProvider.setSignedIn(true)
    },

    signUp: async (credentials) => {
        const url = `http://localhost:8100/api/user/`
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...credentials, roleId: 4})
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