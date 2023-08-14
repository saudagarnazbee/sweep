import React, { useState, useRef } from "react";
import ShadowDomContainer from "./ShadowDomContainer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const nonUglyCSS = {
    color: "white",
    background: "transparent",
    width: "100%",
    fontSize: 24,
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    outline: "none",
    border: "none",
    "&:focus": {
        outline: "none"
    },
    "&::placeholder": {
        color: "white"
    }
};

export default function App() {
  const [open, setOpen] = useState(false);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  document.onkeydown = function (e) {
    if (e.key === "Escape") {
        handleClose();
    } else if (e.key === "Enter" && e.ctrlKey) {
        handleOpen();
    }
};

  const handleSubmit = () => {
    if (!titleRef.current.value) {
        alert("Please fill out both fields");
        return;
    }

    const title = titleRef.current.value;
    const description = descriptionRef.current.value || "";

    const issue = {
        title: `Sweep: ${title}`,
        body: description,
        labels: ["sweep"],
    };

    (async () => {
        await new Promise(r => setTimeout(r, 1000));

        // process issue

        const url = "https://github.com/sweepai/sweep/issues/1235";
        window.open(url, "_blank");
    })()
  }

  return (
    <ShadowDomContainer>
      <Button
        onClick={handleOpen}
        variant="outlined"
        style={{ marginBottom: 12 }}
        color="primary"
        fullWidth={true}
      >
        Make Sweep issue
      </Button>
      {open && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#222a",
            zIndex: 999,
          }}
          onClick={handleClose}
        >
          <Box
            color="secondary"
            style={{
              backgroundColor: "#151215",
              borderColor: "0.5px solid #333",
              boxShadow: "0px 0px 20px 0 black",
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translate(-50%, 0)",
              padding: 32,
              borderRadius: 10,
              minWidth: 1000,
              zIndex: 9999,
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* MUI kinda monkey library tbh */}
            <input 
                placeholder='Write an api endpoint that does ... in the ... file ("Sweep:" prefix unneeded)'
                style={{
                    ...nonUglyCSS,
                    marginBottom: 12,
                }}
                onKeyDown={e => e.stopPropagation()}
                ref={titleRef}
                autoFocus
            />
            <textarea
                placeholder='The new endpoint should use the ... class from ... file because it contains ... logic.'
                style={{
                    ...nonUglyCSS,
                    fontSize: 16,
                    height: 300,
                    resize: "none",
                }}
                ref={descriptionRef}
                onKeyDown={e => e.stopPropagation()}
            />
            <Box style={{width: "100%", display: "flex", justifyContent: "right"}}>
                <Button onClick={handleSubmit}>Submit</Button>
            </Box>
          </Box>
        </Box>
      )}
    </ShadowDomContainer>
  );
}
