import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detect repo name for GitHub Pages builds (owner/repo)
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/').pop() : ''
// If deploying to user/organization pages (username.github.io), base must be '/'
const isUserPage = repo && /\.github\.io$/i.test(repo)
const base = repo && !isUserPage ? `/${repo}/` : '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 3002,
    open: true
  }
})
