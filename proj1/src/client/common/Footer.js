import "./index.css";
// import { createFromIconfontCN } from "@ant-design/icons";
import {
  YoutubeOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const Footer = () => {
  // const IconFont = createFromIconfontCN({
  //   scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  // });

  return (
    <div className="Footer">
      <span>{"  "}@2022 All Rights Reserved.</span>
      {/* <input className="headSearch" /> */}
      <span className="footerIcons">
        <YoutubeOutlined className="footerIcon" />{" "}
        <FacebookOutlined className="footerIcon" />{" "}
        <TwitterOutlined className="footerIcon" />
      </span>
      <a
        href="https://www.google.com/"
        className="link"
        target="_blank"
        rel="noreferrer"
      >
        Contact us{"  "} Privacy policies {"  "}Help
      </a>
    </div>
  );
};
export default Footer;
