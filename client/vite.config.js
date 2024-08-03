import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
    // Load environment variables based on the current mode
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
        plugins: [react()],
        base: '/',
        define: {
            'process.env': {
                BASE_URL: JSON.stringify(env.VITE_BASE_URL),
                YOUR_BOOLEAN_VARIABLE: JSON.stringify(env.VITE_YOUR_BOOLEAN_VARIABLE === 'true')
            }
        }
    };
});