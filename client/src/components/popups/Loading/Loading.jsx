import "./Loading.css"

export default function Loading({ text = "Verbinde..." }) {
    return (
        <div className="connecting">
            <div className="connecting-text">
                <span>{text}</span>

                <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}