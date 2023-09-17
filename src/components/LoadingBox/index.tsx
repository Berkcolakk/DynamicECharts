import React from "react";
import injectStyle from "../../utils";
const LoadingBox = () => {
    injectStyle(`@keyframes s3 {
        to {
          transform: rotate(1turn);
        }
      }`);
    return (
        <div style={{
            display: "flex",
            placeContent: "center"
        }}>
            <div style={{
                WebkitMask: "radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0)",
                background: "conic-gradient(#0000 10%, #000000)",
                borderRadius: "50%",
                height: "50px",
                width: "50px",
                animation: "s3 1s infinite linear",
            }} className="custom-loader" />
        </div>
    );
};

export default LoadingBox;