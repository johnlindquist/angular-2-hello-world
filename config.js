SystemJS.config({
    transpiler: "typescript",
    typescriptOptions: { "emitDecoratorMetadata": true },
    map: {
        "rxjs": "node_modules/rxjs",
        "angular2": "node_modules/angular2",
        "typescript": "node_modules/typescript/lib/typescript.js"
    },
    packages: {
        "rxjs": { "defaultExtension": "js" },
        "angular2": { "defaultExtension": "js" },
        "src": { "defaultExtension": "ts" },
        "build": { "defaultExtension": "ts" },
    }
});

