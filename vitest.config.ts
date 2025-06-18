import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.ts',
        include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
        exclude: ['src/e2e/**/*.spec.ts'],
        coverage: {
            provider: 'v8',
            include: ['src/common/ui/**/*.tsx'],
            exclude: ['src/common/ui/**/*.stories.tsx'],
            all: true,
            reporter: ['text', 'json', 'html'],
            thresholds: {
                statements: 80,
            }
        },
    },
}); 