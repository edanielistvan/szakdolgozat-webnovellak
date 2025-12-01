import { renderToString } from 'react-dom/server'
import { createRouter } from '@tanstack/react-router'

import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { router } from './routes/routes'

const queryClient = useQueryClient()

// 2. Define the server entry handler
// This function takes the request context and returns the HTML string.
export function handler({ request }: { request: Request }) {
  // Use a promise to handle async data loading if necessary
  return new Promise(async (resolve, reject) => {
    try {
      // Set the router location based on the incoming request URL
      await router.preload() 

      // 🔑 CRITICAL FIX: Wrap StartServer with the same providers as the client
      const html = renderToString(
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <StartServer router={router} />
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      )

      resolve({
        html,
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      })
    } catch (error) {
      reject(error)
    }
  })
}

// 🔑 CRITICAL FIX FOR ROLLUP/NITRO: The server environment expects the 'default' export.
export default handler