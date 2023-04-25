export default function OgImageStyle({ text }: { text: string }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "1200px",
                height: "630px",
                backgroundColor: "#c4b98d",
            }}
        >
            <div
                style={{
                    background: "#ffffff",
                    width: "1140px",
                    height: "570px",
                    display: "flex",
                    flexFlow: "column",
                }}
            >
                <div
                    style={{
                        height: "70%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#a33206",
                        fontSize: "40px",
                        fontWeight: "bold",
                        padding: "10px",
                    }}
                >
                    {text}
                </div>
                <div
                    style={{
                        height: "30%",
                        width: "100%",
                        display: "flex",
                    }}
                >
                    <img
                        src="https://haobawotingnide.xyz/ogImage.png"
                        style={{
                            margin: "auto",
                            height: "100%",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
