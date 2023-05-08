module.exports = {
    "arrowParens": "avoid",
    "semi": true,
    "tabWidth": 4,
    "printWidth": 80,
    "singleQuote": false,
    "jsxSingleQuote": false,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "endOfLine": "lf",
    plugins: [require("prettier-plugin-md-nocjsp")],
    "overrides": [
        {
            "files": ["*.md", "README"],
            "options": { "parser": "markdown-nocjsp" }
        },
        {
            "files": ["*.mdx"],
            "options": { "parser": "markdown-nocjsp" }
        }
    ]
}
