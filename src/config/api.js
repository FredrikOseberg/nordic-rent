// Backend base URL. Set VITE_API_URL in Netlify (and .env.development locally)
// to the deployed Railway URL; the fallback is the intended production domain.
export const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.nordicrent.no'

export const INQUIRIES_ENDPOINT = `${API_URL}/api/inquiries`
export const MCP_ENDPOINT = `${API_URL}/mcp`
