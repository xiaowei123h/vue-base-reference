declare module 'path-browserify' {
    export function join(...paths: string[]): string;
    export function resolve(...pathSegments: string[]): string;
}