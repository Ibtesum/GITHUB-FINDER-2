import axios from 'axios'
const GITHUB_URL = import.meta.env.VITE_REACT_APP_GITHUB_URL


const github = axios.create({
  baseURL: GITHUB_URL,
  
})

// Get search results
export const search = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await github.get(`/search/users?${params}`)
  return response.data.items
}

// Get user and repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ])

  return { user: user.data, repos: repos.data }
}
