import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


 export default defineConfig({
 plugins: [react()],
 test: {
    globals: true,
        environment: 'jsdom',
            setupFiles: './setupTests.ts',
                css: true,
                    reporters: ['verbose'],
                        coverage: {
        reporter: ['text', 'json', 'html'],
            provider: 'v8'
    }
},
})