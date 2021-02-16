const item1 = document.querySelector(".item1");
const item2 = document.querySelector(".item2");

const styles = {
  background: "#f40",
  color: "#fff",
  width: "100px",
  height: "100px",
  fontSize: "20px",
  marginBottom: "10px",
  textAlign: "center",
  lineHeight: "100px",
};

function useStyles(dom, styles) {
  for (const key in styles) {
    dom.style[key] = styles[key];
  }
}

useStyles(item1, styles);
useStyles(item2, styles);
