import icn_marker from "../../../assets/icons/icn_marker.svg";

export default function CustomMarker({ title }: { title: string }) {
  const contentArray = [
    '<div style="display:flex; flex-direction:column; align-items:center;">',
    '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="30" viewBox="0 0 26 30" fill="none">',
    '<g filter="url(#filter0_d_371_1293)">',
    '<path d="M12.513 23.2C12.513 23.2 20.0261 16.5217 20.0261 11.513C20.0261 7.3637 16.6624 4 12.513 4C8.3637 4 5 7.3637 5 11.513C5 16.5217 12.513 23.2 12.513 23.2Z" fill="#396951" shape-rendering="crispEdges"/>',
    '<path d="M12.513 23.2C12.513 23.2 20.0261 16.5217 20.0261 11.513C20.0261 7.3637 16.6624 4 12.513 4C8.3637 4 5 7.3637 5 11.513C5 16.5217 12.513 23.2 12.513 23.2Z" stroke="#396951" stroke-width="2" shape-rendering="crispEdges"/>',
    '<path d="M14.9134 11.2002C14.9134 12.5256 13.8388 13.6002 12.5134 13.6002C11.1879 13.6002 10.1134 12.5256 10.1134 11.2002C10.1134 9.87467 11.1879 8.80015 12.5134 8.80015C13.8388 8.80015 14.9134 9.87467 14.9134 11.2002Z" stroke="#396951" stroke-width="2" shape-rendering="crispEdges"/>',
    "</g>",
    '<circle cx="12.5" cy="11.5" r="3.5" fill="white"/>',
    "<defs>",
    '<filter id="filter0_d_371_1293" x="0" y="0" width="25.0261" height="29.538" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">',
    '<feFlood flood-opacity="0" result="BackgroundImageFix"/>',
    '<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>',
    '<feOffset dy="1"/>',
    '<feGaussianBlur stdDeviation="2"/>',
    '<feComposite in2="hardAlpha" operator="out"/>',
    '<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>',
    '<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_371_1293"/>',
    '<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_371_1293" result="shape"/>',
    "</filter>",
    "</defs>",
    "</svg>",
    '<div style="padding: 0 0.5rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: table-cell; vertical-align: middle; cursor: pointer; font-size: 0.625rem; font-weight: 500; background-color:white; border:1.5px solid #396951; border-radius: 1rem;">',
    title,
    "</div>",
    "</div>",
  ];
  return contentArray.join("");
}
