/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
    return ({ opacityValue }) => {
        if (opacityValue !== undefined) {
            return `rgba(var(${variableName}), ${opacityValue})`;
        }
        return `rgb(var(${variableName}))`;
    };
}

module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    // darkMode: 'class',
    theme: {
        // Remove the following screen breakpoint or add other breakpoints
        // if one breakpoint is not enough for you
        // スクリーンサイズによる切り替えを行うブレイクポイントを設定します。
        // この例では 'sm' という名前のブレイクポイントのみ定義していますが、必要に応じて追加することができます。
        screens: {
            sm: "640px",
        },

        // Uncomment the following extend
        // if existing Tailwind color palette will be used
        // 既存のTailwindカラーパレットを使用する場合、以下のextendをコメント解除します

        extend: {
            textColor: {
                skin: {
                    base: withOpacity("--color-text-base"),
                    accent: withOpacity("--color-accent"),
                    inverted: withOpacity("--color-fill"),
                    pre: '#eaedf3',
                },
            },
            backgroundColor: {
                skin: {
                    fill: withOpacity("--color-fill"),
                    accent: withOpacity("--color-accent"),
                    inverted: withOpacity("--color-text-base"),
                    card: withOpacity("--color-card"),
                    "card-muted": withOpacity("--color-card-muted"),
                    "work-btn": withOpacity("--color-hongse"),
                },
            },
            outlineColor: {
                skin: {
                    fill: withOpacity("--color-accent"),
                },
            },
            borderColor: {
                skin: {
                    line: withOpacity("--color-border"),
                    fill: withOpacity("--color-text-base"),
                    accent: withOpacity("--color-accent"),
                },
            },
            fill: {
                skin: {
                    base: withOpacity("--color-text-base"),
                    accent: withOpacity("--color-accent"),
                    yase: withOpacity("--color-yase"),
                    hongse: withOpacity("--color-hongse"),
                    titlelogo: withOpacity("--color-title-logo"),
                },
                transparent: "transparent",
            },
            fontFamily: {
                noto: ['Noto Sans JP', 'sans-serif'],
                zh: ['ZCOOL XiaoWei', 'sans-serif'],
            },
            textUnderlineOffset: {
                5: '5px',
            },
            boxShadow: {
                'DEFAULT': '0 1px 3px 0 rgb(var(--color-shadow)), 0 1px 2px -1px rgb(var(--color-shadow))',
            },
            // https://tail-animista.vercel.app/play/text/focus-in/text-focus-in
            animation: {
                "text-focus-in": "text-focus-in 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both"
            },
            keyframes: {
                "text-focus-in": {
                    "0%": {
                        filter: "blur(12px)",
                        opacity: "0"
                    },
                    to: {
                        filter: "blur(0)",
                        opacity: "1"
                    }
                }
            }
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
