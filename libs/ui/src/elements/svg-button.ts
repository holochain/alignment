import {css, html, LitElement} from "lit";
import {property, query} from "lit/decorators.js";

import {sharedStyles} from "../sharedStyles";
import {ScopedElementsMixin} from "@open-wc/scoped-elements";
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import { action_destroyer } from "svelte/internal";


const SVG = {
  plus: `<svg width="30" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 5C25.0555 5 20.222 6.46622 16.1107 9.21326C11.9995 11.9603 8.7952 15.8648 6.90301 20.4329C5.01082 25.0011 4.51573 30.0277 5.48036 34.8773C6.44499 39.7268 8.82601 44.1814 12.3223 47.6777C15.8186 51.174 20.2732 53.555 25.1227 54.5196C29.9723 55.4843 34.9989 54.9892 39.5671 53.097C44.1352 51.2048 48.0397 48.0005 50.7867 43.8893C53.5338 39.778 55 34.9445 55 30C55 26.717 54.3534 23.4661 53.097 20.4329C51.8406 17.3998 49.9991 14.6438 47.6777 12.3223C45.3562 10.0009 42.6002 8.15938 39.5671 6.90301C36.5339 5.64664 33.283 5 30 5ZM30 50C26.0444 50 22.1776 48.827 18.8886 46.6294C15.5996 44.4318 13.0362 41.3082 11.5224 37.6537C10.0087 33.9991 9.61259 29.9778 10.3843 26.0982C11.156 22.2186 13.0608 18.6549 15.8579 15.8579C18.6549 13.0608 22.2186 11.156 26.0982 10.3843C29.9778 9.61259 33.9991 10.0087 37.6537 11.5224C41.3082 13.0362 44.4318 15.5996 46.6294 18.8886C48.827 22.1776 50 26.0444 50 30C50 35.3043 47.8929 40.3914 44.1421 44.1421C40.3914 47.8929 35.3043 50 30 50ZM40 27.5H32.5V20C32.5 19.337 32.2366 18.7011 31.7678 18.2322C31.2989 17.7634 30.663 17.5 30 17.5C29.337 17.5 28.7011 17.7634 28.2322 18.2322C27.7634 18.7011 27.5 19.337 27.5 20V27.5H20C19.337 27.5 18.7011 27.7634 18.2322 28.2322C17.7634 28.7011 17.5 29.337 17.5 30C17.5 30.663 17.7634 31.2989 18.2322 31.7678C18.7011 32.2366 19.337 32.5 20 32.5H27.5V40C27.5 40.663 27.7634 41.2989 28.2322 41.7678C28.7011 42.2366 29.337 42.5 30 42.5C30.663 42.5 31.2989 42.2366 31.7678 41.7678C32.2366 41.2989 32.5 40.663 32.5 40V32.5H40C40.663 32.5 41.2989 32.2366 41.7678 31.7678C42.2366 31.2989 42.5 30.663 42.5 30C42.5 29.337 42.2366 28.7011 41.7678 28.2322C41.2989 27.7634 40.663 27.5 40 27.5Z" fill="black"/></svg>`,
  move: `<svg width="30" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.1487 31.421C14.8641 31.4209 14.5824 31.4769 14.3194 31.5858C14.0565 31.6946 13.8177 31.8542 13.6165 32.0554C13.4152 32.2567 13.2557 32.4955 13.1468 32.7584C13.0379 33.0213 12.9819 33.3031 12.982 33.5877V37.4493C10.1893 34.291 8.64804 30.2203 8.64868 26.0043C8.64828 25.3671 8.68644 24.7305 8.76293 24.0979C8.79801 23.8151 8.77692 23.528 8.70087 23.2533C8.62482 22.9786 8.49531 22.7216 8.31975 22.497C8.1442 22.2725 7.92605 22.0847 7.67782 21.9446C7.42958 21.8045 7.15614 21.7148 6.87316 21.6805C6.59017 21.6463 6.30322 21.6682 6.02873 21.7451C5.75424 21.8219 5.49761 21.9522 5.27356 22.1284C5.04951 22.3046 4.86244 22.5233 4.72306 22.772C4.58368 23.0206 4.49474 23.2944 4.46134 23.5774C4.3632 24.3827 4.31444 25.1932 4.31535 26.0043C4.31829 31.1744 6.17642 36.1717 9.5519 40.0877H6.48202C5.90738 40.0877 5.35628 40.3159 4.94995 40.7223C4.54362 41.1286 4.31535 41.6797 4.31535 42.2543C4.31535 42.829 4.54362 43.3801 4.94995 43.7864C5.35628 44.1927 5.90738 44.421 6.48202 44.421H15.1487C15.4875 44.4168 15.8205 44.3316 16.1198 44.1726C16.4191 44.0137 16.676 43.7855 16.8693 43.5071C16.8946 43.4738 16.9268 43.449 16.9504 43.4139C16.9648 43.3924 16.9652 43.3668 16.9787 43.3449C17.0819 43.1704 17.1593 42.9819 17.2083 42.7852C17.2404 42.6747 17.2632 42.5618 17.2764 42.4475C17.2826 42.3806 17.3154 42.3229 17.3154 42.2544V33.5877C17.3155 33.3032 17.2595 33.0214 17.1507 32.7585C17.0418 32.4956 16.8822 32.2567 16.681 32.0554C16.4798 31.8542 16.2409 31.6946 15.978 31.5858C15.715 31.4769 15.4332 31.4209 15.1487 31.421ZM18.3987 13.0043H14.5367C17.6952 10.2117 21.766 8.67052 25.982 8.67101C26.6189 8.66948 27.2552 8.70764 27.8874 8.78528C28.1699 8.81959 28.4565 8.79791 28.7307 8.72148C29.0049 8.64504 29.2614 8.51534 29.4855 8.33979C29.7096 8.16423 29.8969 7.94626 30.0367 7.69832C30.1766 7.45038 30.2662 7.17732 30.3005 6.89473C30.3348 6.61214 30.3132 6.32557 30.2367 6.05136C30.1603 5.77715 30.0306 5.52069 29.855 5.2966C29.6795 5.07252 29.4615 4.88521 29.2136 4.74536C28.9656 4.60552 28.6926 4.51588 28.41 4.48156C27.6043 4.38437 26.7935 4.33632 25.982 4.33767C20.812 4.34048 15.8147 6.19848 11.8987 9.57384V6.50434C11.8987 5.92971 11.6704 5.37861 11.2641 4.97228C10.8578 4.56595 10.3067 4.33767 9.73202 4.33767C9.15738 4.33767 8.60628 4.56595 8.19995 4.97228C7.79362 5.37861 7.56535 5.92971 7.56535 6.50434V15.171C7.57898 15.3142 7.60752 15.4556 7.65052 15.5929L7.65104 15.5955C7.70366 15.8621 7.80753 16.116 7.95691 16.343L7.98165 16.3796C8.12482 16.5879 8.30426 16.7687 8.5114 16.9134C8.53509 16.9307 8.54685 16.9573 8.57144 16.9738C8.6024 16.9943 8.63744 17.0008 8.66905 17.0196C8.79193 17.0935 8.92213 17.1545 9.05758 17.2016C9.24063 17.2652 9.43148 17.3038 9.6249 17.3161C9.66245 17.3181 9.69406 17.3377 9.73202 17.3377H18.3987C18.9733 17.3377 19.5244 17.1095 19.9307 16.7031C20.3371 16.2968 20.5654 15.7457 20.5654 15.1711C20.5654 14.5964 20.3371 14.0453 19.9307 13.639C19.5244 13.2327 18.9733 13.0044 18.3987 13.0044V13.0043ZM44.313 36.4132C44.2604 36.1465 44.1565 35.8925 44.007 35.6655L43.9825 35.6291C43.8392 35.4208 43.6597 35.2399 43.4524 35.0951C43.4287 35.078 43.4171 35.0512 43.3926 35.0348C43.3692 35.0194 43.3414 35.0188 43.3176 35.0043C43.0428 34.8515 42.7416 34.7519 42.4299 34.7109C42.3613 34.7044 42.3022 34.6709 42.232 34.6709H33.5654C32.9907 34.6709 32.4396 34.8992 32.0333 35.3055C31.627 35.7118 31.3987 36.2629 31.3987 36.8376C31.3987 37.4122 31.627 37.9633 32.0333 38.3696C32.4396 38.776 32.9907 39.0042 33.5654 39.0042H37.4272C34.2687 41.7969 30.198 43.3381 25.982 43.3376C25.3451 43.3384 24.7087 43.2995 24.0767 43.2212C23.5059 43.1519 22.9311 43.3121 22.4785 43.6667C22.026 44.0212 21.7328 44.541 21.6635 45.1117C21.5942 45.6825 21.7544 46.2573 22.109 46.7099C22.4635 47.1624 22.9833 47.4556 23.554 47.5249C24.3597 47.6221 25.1705 47.6708 25.982 47.6709C31.152 47.6681 36.1493 45.8101 40.0654 42.4348V45.5043C40.0654 46.079 40.2936 46.6301 40.7 47.0364C41.1063 47.4427 41.6574 47.671 42.232 47.671C42.8067 47.671 43.3578 47.4427 43.7641 47.0364C44.1704 46.6301 44.3987 46.079 44.3987 45.5043V36.8377C44.3851 36.6945 44.3565 36.5531 44.3135 36.4158L44.313 36.4132ZM45.482 11.921C46.0567 11.921 46.6078 11.6927 47.0141 11.2864C47.4204 10.8801 47.6487 10.329 47.6487 9.75434C47.6487 9.17971 47.4204 8.62861 47.0141 8.22228C46.6078 7.81595 46.0567 7.58767 45.482 7.58767H36.8153C36.6743 7.60127 36.535 7.62937 36.3997 7.67152L36.3853 7.67443C36.1222 7.72707 35.8716 7.82969 35.6471 7.97674L35.6047 8.00543C35.3974 8.14838 35.2174 8.32726 35.0732 8.53362C35.0561 8.55702 35.0298 8.56852 35.0137 8.59273C34.9982 8.616 34.9977 8.64351 34.9831 8.66717C34.8285 8.94362 34.7282 9.24712 34.6877 9.56127C34.6815 9.6282 34.6487 9.68585 34.6487 9.75434V18.421C34.6487 18.9956 34.877 19.5467 35.2833 19.9531C35.6896 20.3594 36.2407 20.5877 36.8153 20.5877C37.39 20.5877 37.9411 20.3594 38.3474 19.9531C38.7537 19.5467 38.982 18.9956 38.982 18.421V14.5581C41.7745 17.717 43.3157 21.788 43.3154 26.0042C43.3158 26.6414 43.2776 27.2781 43.2011 27.9107C43.1324 28.481 43.2928 29.0552 43.647 29.5074C44.0013 29.9597 44.5204 30.2529 45.0906 30.3228C45.1784 30.3329 45.2667 30.3379 45.3551 30.3376C45.8841 30.3369 46.3946 30.1426 46.7902 29.7914C47.1859 29.4402 47.4393 28.9564 47.5027 28.4312C47.6008 27.626 47.6496 26.8155 47.6487 26.0043C47.6457 20.8343 45.7875 15.837 42.4119 11.921H45.482Z" fill="black"/>
  </svg>`,
  question: `<svg width="30" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.6984 28.0317C20.6195 28.1189 20.546 28.2107 20.4784 28.3067C20.409 28.4089 20.3535 28.5199 20.3134 28.6367C20.2605 28.7407 20.2234 28.8519 20.2034 28.9667C20.1944 29.0888 20.1944 29.2114 20.2034 29.3334C20.1972 29.5739 20.2474 29.8125 20.35 30.0301C20.4324 30.2576 20.5637 30.4642 20.7348 30.6353C20.9059 30.8064 21.1125 30.9377 21.34 31.0201C21.5595 31.1171 21.7968 31.1672 22.0367 31.1672C22.2766 31.1672 22.5139 31.1171 22.7334 31.0201C22.9609 30.9377 23.1675 30.8064 23.3386 30.6353C23.5097 30.4642 23.641 30.2576 23.7234 30.0301C23.8048 29.8072 23.8421 29.5706 23.8334 29.3334C23.8348 29.0921 23.7885 28.853 23.6973 28.6296C23.606 28.4062 23.4716 28.2031 23.3017 28.0317C23.1313 27.8599 22.9285 27.7235 22.7051 27.6304C22.4817 27.5374 22.2421 27.4895 22 27.4895C21.758 27.4895 21.5184 27.5374 21.295 27.6304C21.0716 27.7235 20.8688 27.8599 20.6984 28.0317ZM22 3.66675C18.374 3.66675 14.8295 4.74198 11.8146 6.75647C8.79967 8.77096 6.44984 11.6342 5.06224 14.9842C3.67463 18.3342 3.31157 22.0204 4.01897 25.5767C4.72636 29.1331 6.47244 32.3997 9.0364 34.9637C11.6004 37.5277 14.8671 39.2738 18.4234 39.9811C21.9797 40.6885 25.6659 40.3255 29.0159 38.9379C32.3659 37.5503 35.2291 35.2004 37.2436 32.1855C39.2581 29.1706 40.3334 25.6261 40.3334 22.0001C40.3334 19.5925 39.8592 17.2085 38.9378 14.9842C38.0165 12.7599 36.6661 10.7389 34.9636 9.03646C33.2612 7.33405 31.2402 5.98363 29.0159 5.06229C26.7916 4.14095 24.4076 3.66675 22 3.66675ZM22 36.6667C19.0992 36.6667 16.2636 35.8066 13.8517 34.195C11.4397 32.5834 9.55988 30.2928 8.4498 27.6128C7.33971 24.9328 7.04926 21.9838 7.61518 19.1388C8.18109 16.2937 9.57796 13.6804 11.6291 11.6292C13.6803 9.57801 16.2936 8.18115 19.1387 7.61523C21.9838 7.04931 24.9327 7.33976 27.6127 8.44985C30.2927 9.55993 32.5833 11.4398 34.1949 13.8517C35.8065 16.2636 36.6667 19.0993 36.6667 22.0001C36.6667 25.8899 35.1215 29.6204 32.3709 32.371C29.6204 35.1215 25.8899 36.6667 22 36.6667ZM22 12.8334C21.034 12.8328 20.0848 13.0866 19.248 13.5694C18.4113 14.0521 17.7164 14.7468 17.2334 15.5834C17.1007 15.7921 17.0116 16.0254 16.9715 16.2694C16.9314 16.5134 16.941 16.763 16.9998 17.0031C17.0587 17.2433 17.1655 17.4691 17.3138 17.6669C17.4622 17.8647 17.649 18.0305 17.8631 18.1542C18.0771 18.2779 18.314 18.3571 18.5595 18.3869C18.8049 18.4167 19.0539 18.3966 19.2913 18.3277C19.5288 18.2588 19.7499 18.1426 19.9413 17.986C20.1327 17.8295 20.2904 17.6358 20.405 17.4167C20.5666 17.137 20.7991 16.9048 21.0792 16.7439C21.3593 16.5829 21.677 16.4988 22 16.5001C22.4863 16.5001 22.9526 16.6932 23.2964 17.0371C23.6402 17.3809 23.8334 17.8472 23.8334 18.3334C23.8334 18.8196 23.6402 19.286 23.2964 19.6298C22.9526 19.9736 22.4863 20.1667 22 20.1667C21.5138 20.1667 21.0475 20.3599 20.7037 20.7037C20.3598 21.0475 20.1667 21.5139 20.1667 22.0001V23.8334C20.1667 24.3196 20.3598 24.786 20.7037 25.1298C21.0475 25.4736 21.5138 25.6667 22 25.6667C22.4863 25.6667 22.9526 25.4736 23.2964 25.1298C23.6402 24.786 23.8334 24.3196 23.8334 23.8334V23.5034C25.0459 23.0635 26.0652 22.2113 26.7131 21.096C27.361 19.9807 27.5963 18.6731 27.3779 17.4019C27.1595 16.1306 26.5012 14.9766 25.5182 14.1415C24.5351 13.3064 23.2899 12.8434 22 12.8334Z" fill="black"/>
  </svg>`,
  edit: `<svg width="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
  </svg>
  `,
  close: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.71 8.28996C15.617 8.19623 15.5064 8.12183 15.3845 8.07107C15.2627 8.0203 15.132 7.99416 15 7.99416C14.8679 7.99416 14.7372 8.0203 14.6154 8.07107C14.4935 8.12183 14.3829 8.19623 14.29 8.28996L12 10.59L9.70996 8.28996C9.52165 8.10165 9.26626 7.99587 8.99996 7.99587C8.73366 7.99587 8.47826 8.10165 8.28996 8.28996C8.10165 8.47826 7.99587 8.73366 7.99587 8.99996C7.99587 9.26626 8.10165 9.52165 8.28996 9.70996L10.59 12L8.28996 14.29C8.19623 14.3829 8.12183 14.4935 8.07107 14.6154C8.0203 14.7372 7.99416 14.8679 7.99416 15C7.99416 15.132 8.0203 15.2627 8.07107 15.3845C8.12183 15.5064 8.19623 15.617 8.28996 15.71C8.38292 15.8037 8.49352 15.8781 8.61538 15.9288C8.73724 15.9796 8.86795 16.0058 8.99996 16.0058C9.13197 16.0058 9.26267 15.9796 9.38453 15.9288C9.50639 15.8781 9.61699 15.8037 9.70996 15.71L12 13.41L14.29 15.71C14.3829 15.8037 14.4935 15.8781 14.6154 15.9288C14.7372 15.9796 14.8679 16.0058 15 16.0058C15.132 16.0058 15.2627 15.9796 15.3845 15.9288C15.5064 15.8781 15.617 15.8037 15.71 15.71C15.8037 15.617 15.8781 15.5064 15.9288 15.3845C15.9796 15.2627 16.0058 15.132 16.0058 15C16.0058 14.8679 15.9796 14.7372 15.9288 14.6154C15.8781 14.4935 15.8037 14.3829 15.71 14.29L13.41 12L15.71 9.70996C15.8037 9.61699 15.8781 9.50639 15.9288 9.38453C15.9796 9.26267 16.0058 9.13197 16.0058 8.99996C16.0058 8.86795 15.9796 8.73724 15.9288 8.61538C15.8781 8.49352 15.8037 8.38292 15.71 8.28996ZM19.07 4.92996C18.1475 3.97486 17.044 3.21303 15.824 2.68894C14.604 2.16485 13.2918 1.88899 11.964 1.87745C10.6362 1.86591 9.31938 2.11893 8.09042 2.62174C6.86145 3.12455 5.74493 3.86708 4.80601 4.80601C3.86708 5.74493 3.12455 6.86145 2.62174 8.09042C2.11893 9.31938 1.86591 10.6362 1.87745 11.964C1.88899 13.2918 2.16485 14.604 2.68894 15.824C3.21303 17.044 3.97486 18.1475 4.92996 19.07C5.85243 20.0251 6.95587 20.7869 8.17591 21.311C9.39595 21.8351 10.7082 22.1109 12.0359 22.1225C13.3637 22.134 14.6805 21.881 15.9095 21.3782C17.1385 20.8754 18.255 20.1328 19.1939 19.1939C20.1328 18.255 20.8754 17.1385 21.3782 15.9095C21.881 14.6805 22.134 13.3637 22.1225 12.0359C22.1109 10.7082 21.8351 9.39595 21.311 8.17591C20.7869 6.95587 20.0251 5.85243 19.07 4.92996ZM17.66 17.66C16.352 18.9694 14.6305 19.7848 12.7888 19.9673C10.947 20.1497 9.09896 19.688 7.55948 18.6607C6.02 17.6334 4.88432 16.1042 4.34593 14.3334C3.80754 12.5627 3.89976 10.6601 4.60687 8.94974C5.31398 7.23938 6.59223 5.82711 8.22385 4.95352C9.85546 4.07993 11.7395 3.79909 13.555 4.15883C15.3704 4.51857 17.005 5.49665 18.1802 6.92642C19.3554 8.35619 19.9985 10.1492 20 12C20.0035 13.0512 19.7985 14.0928 19.3969 15.0643C18.9952 16.0359 18.4049 16.9181 17.66 17.66Z" fill="black"/>
  </svg>
  `,
  save:  `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.72 8.79L10.43 13.09L8.78 11.44C8.69036 11.3353 8.58004 11.2503 8.45597 11.1903C8.33191 11.1303 8.19678 11.0965 8.05906 11.0912C7.92134 11.0859 7.78401 11.1091 7.65568 11.1594C7.52736 11.2096 7.41081 11.2859 7.31335 11.3833C7.2159 11.4808 7.13964 11.5974 7.08937 11.7257C7.03909 11.854 7.01589 11.9913 7.02121 12.1291C7.02653 12.2668 7.06026 12.4019 7.12028 12.526C7.1803 12.65 7.26532 12.7604 7.37 12.85L9.72 15.21C9.81344 15.3027 9.92426 15.376 10.0461 15.4258C10.1679 15.4755 10.2984 15.5008 10.43 15.5C10.6923 15.4989 10.9437 15.3947 11.13 15.21L16.13 10.21C16.2237 10.117 16.2981 10.0064 16.3489 9.88458C16.3997 9.76272 16.4258 9.63201 16.4258 9.5C16.4258 9.36799 16.3997 9.23728 16.3489 9.11542C16.2981 8.99356 16.2237 8.88296 16.13 8.79C15.9426 8.60375 15.6892 8.49921 15.425 8.49921C15.1608 8.49921 14.9074 8.60375 14.72 8.79ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z" fill="black"/>
  </svg>
  `,
  defunct: `<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V0ZM10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84286 14.1566 2 12.1217 2 10C1.9978 8.22334 2.59302 6.49755 3.69 5.1L14.9 16.31C13.5025 17.407 11.7767 18.0022 10 18V18ZM16.31 14.9L5.1 3.69C6.49755 2.59302 8.22335 1.99779 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1572 5.84344 18 7.87827 18 10C18.0022 11.7767 17.407 13.5025 16.31 14.9Z" fill="black"/>
  </svg>
  `,
  checked: `<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.21 12.75C8.30296 12.8437 8.41356 12.9181 8.53542 12.9689C8.65728 13.0197 8.78799 13.0458 8.92 13.0458C9.05201 13.0458 9.18272 13.0197 9.30458 12.9689C9.42644 12.9181 9.53704 12.8437 9.63 12.75L13.71 8.67C13.8983 8.4817 14.0041 8.2263 14.0041 7.96C14.0041 7.6937 13.8983 7.4383 13.71 7.25C13.5217 7.0617 13.2663 6.95591 13 6.95591C12.7337 6.95591 12.4783 7.0617 12.29 7.25L8.92 10.63L7.71 9.41C7.5217 9.2217 7.2663 9.11591 7 9.11591C6.7337 9.11591 6.4783 9.2217 6.29 9.41C6.1017 9.5983 5.99591 9.8537 5.99591 10.12C5.99591 10.3863 6.1017 10.6417 6.29 10.83L8.21 12.75ZM19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM18 18H2V2H18V18Z" fill="black"/>
  </svg>`,
  unchecked: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2ZM20 20H4V4H20V20Z" fill="black"/>
  </svg>`,
  send: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.34 9.32001L6.34 2.32001C5.78749 2.04502 5.16362 1.94712 4.55344 2.03966C3.94326 2.1322 3.37646 2.41068 2.93033 2.83712C2.48421 3.26357 2.18046 3.81723 2.0605 4.42262C1.94054 5.02801 2.0102 5.65566 2.26 6.22001L4.66 11.59C4.71446 11.7198 4.74251 11.8592 4.74251 12C4.74251 12.1408 4.71446 12.2802 4.66 12.41L2.26 17.78C2.0567 18.2367 1.97076 18.737 2.00998 19.2354C2.0492 19.7337 2.21235 20.2144 2.48459 20.6337C2.75682 21.053 3.12953 21.3976 3.56883 21.6362C4.00812 21.8748 4.50009 21.9999 5 22C5.46823 21.9953 5.92949 21.886 6.35 21.68L20.35 14.68C20.8466 14.4302 21.264 14.0473 21.5557 13.5741C21.8474 13.1009 22.0018 12.5559 22.0018 12C22.0018 11.4441 21.8474 10.8992 21.5557 10.4259C21.264 9.9527 20.8466 9.56982 20.35 9.32001H20.34ZM19.45 12.89L5.45 19.89C5.26617 19.9783 5.05973 20.0082 4.85839 19.9759C4.65705 19.9435 4.47041 19.8503 4.32352 19.7089C4.17662 19.5674 4.07648 19.3844 4.03653 19.1844C3.99658 18.9845 4.01873 18.777 4.1 18.59L6.49 13.22C6.52094 13.1483 6.54766 13.0748 6.57 13H13.46C13.7252 13 13.9796 12.8946 14.1671 12.7071C14.3546 12.5196 14.46 12.2652 14.46 12C14.46 11.7348 14.3546 11.4804 14.1671 11.2929C13.9796 11.1054 13.7252 11 13.46 11H6.57C6.54766 10.9252 6.52094 10.8517 6.49 10.78L4.1 5.41001C4.01873 5.22297 3.99658 5.01556 4.03653 4.81558C4.07648 4.6156 4.17662 4.43261 4.32352 4.29115C4.47041 4.1497 4.65705 4.05654 4.85839 4.02416C5.05973 3.99178 5.26617 4.02174 5.45 4.11001L19.45 11.11C19.6138 11.1939 19.7513 11.3214 19.8473 11.4785C19.9433 11.6355 19.994 11.816 19.994 12C19.994 12.1841 19.9433 12.3645 19.8473 12.5216C19.7513 12.6786 19.6138 12.8061 19.45 12.89Z" fill="black"/>
  </svg>`,
  trash:  `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 18C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17V11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11V17C9 17.2652 9.10536 17.5196 9.29289 17.7071C9.48043 17.8946 9.73478 18 10 18ZM20 6H16V5C16 4.20435 15.6839 3.44129 15.1213 2.87868C14.5587 2.31607 13.7956 2 13 2H11C10.2044 2 9.44129 2.31607 8.87868 2.87868C8.31607 3.44129 8 4.20435 8 5V6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7C3 7.26522 3.10536 7.51957 3.29289 7.70711C3.48043 7.89464 3.73478 8 4 8H5V19C5 19.7956 5.31607 20.5587 5.87868 21.1213C6.44129 21.6839 7.20435 22 8 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7956 19 19V8H20C20.2652 8 20.5196 7.89464 20.7071 7.70711C20.8946 7.51957 21 7.26522 21 7C21 6.73478 20.8946 6.48043 20.7071 6.29289C20.5196 6.10536 20.2652 6 20 6ZM10 5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4H13C13.2652 4 13.5196 4.10536 13.7071 4.29289C13.8946 4.48043 14 4.73478 14 5V6H10V5ZM17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H8C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19V8H17V19ZM14 18C14.2652 18 14.5196 17.8946 14.7071 17.7071C14.8946 17.5196 15 17.2652 15 17V11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11V17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18Z" fill="black"/>
  </svg>`,
  comment_new: `<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13 7H11V5C11 4.73478 10.8946 4.48043 10.7071 4.29289C10.5196 4.10536 10.2652 4 10 4C9.73478 4 9.48043 4.10536 9.29289 4.29289C9.10536 4.48043 9 4.73478 9 5V7H7C6.73478 7 6.48043 7.10536 6.29289 7.29289C6.10536 7.48043 6 7.73478 6 8C6 8.26522 6.10536 8.51957 6.29289 8.70711C6.48043 8.89464 6.73478 9 7 9H9V11C9 11.2652 9.10536 11.5196 9.29289 11.7071C9.48043 11.8946 9.73478 12 10 12C10.2652 12 10.5196 11.8946 10.7071 11.7071C10.8946 11.5196 11 11.2652 11 11V9H13C13.2652 9 13.5196 8.89464 13.7071 8.70711C13.8946 8.51957 14 8.26522 14 8C14 7.73478 13.8946 7.48043 13.7071 7.29289C13.5196 7.10536 13.2652 7 13 7ZM17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V13C0 13.7956 0.316071 14.5587 0.87868 15.1213C1.44129 15.6839 2.20435 16 3 16H14.59L18.29 19.71C18.3834 19.8027 18.4943 19.876 18.6161 19.9258C18.7379 19.9755 18.8684 20.0008 19 20C19.1312 20.0034 19.2613 19.976 19.38 19.92C19.5626 19.845 19.7189 19.7176 19.8293 19.5539C19.9396 19.3901 19.999 19.1974 20 19V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0ZM18 16.59L15.71 14.29C15.6166 14.1973 15.5057 14.124 15.3839 14.0742C15.2621 14.0245 15.1316 13.9992 15 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V16.59Z" fill="black"/>
  </svg>`,
  comment_approve:`<svg width="25" height="25" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.76994 8.15019L10.2099 2.71019C10.3032 2.61695 10.3771 2.50626 10.4276 2.38443C10.4781 2.26261 10.504 2.13204 10.504 2.00019C10.504 1.86833 10.4781 1.73776 10.4276 1.61594C10.3771 1.49411 10.3032 1.38342 10.2099 1.29019C10.1167 1.19695 10.006 1.12299 9.88419 1.07253C9.76237 1.02207 9.6318 0.996094 9.49994 0.996094C9.23364 0.996094 8.97824 1.10188 8.78994 1.29019L4.05994 6.00019L2.20994 4.17019C2.02164 3.98188 1.76624 3.87609 1.49994 3.87609C1.23364 3.87609 0.978245 3.98188 0.789941 4.17019C0.601637 4.35849 0.49585 4.61388 0.49585 4.88019C0.49585 5.14649 0.601637 5.40188 0.789941 5.59019L3.34994 8.15019C3.4429 8.24391 3.55351 8.31831 3.67536 8.36908C3.79722 8.41985 3.92793 8.44598 4.05994 8.44598C4.19195 8.44598 4.32266 8.41985 4.44452 8.36908C4.56638 8.31831 4.67698 8.24391 4.76994 8.15019ZM16.4999 5.00019H10.9999C10.7347 5.00019 10.4804 5.10554 10.2928 5.29308C10.1053 5.48062 9.99994 5.73497 9.99994 6.00019C9.99994 6.2654 10.1053 6.51976 10.2928 6.70729C10.4804 6.89483 10.7347 7.00019 10.9999 7.00019H16.4999C16.7652 7.00019 17.0195 7.10554 17.207 7.29308C17.3946 7.48062 17.4999 7.73497 17.4999 8.00019V17.7202L15.9299 16.2702C15.7455 16.0975 15.5026 16.0011 15.2499 16.0002H6.49994C6.23472 16.0002 5.98037 15.8948 5.79283 15.7073C5.6053 15.5198 5.49994 15.2654 5.49994 15.0002V11.5002C5.49994 11.235 5.39458 10.9806 5.20705 10.7931C5.01951 10.6055 4.76516 10.5002 4.49994 10.5002C4.23472 10.5002 3.98037 10.6055 3.79283 10.7931C3.6053 10.9806 3.49994 11.235 3.49994 11.5002V15.0002C3.49994 15.7958 3.81601 16.5589 4.37862 17.1215C4.94123 17.6841 5.70429 18.0002 6.49994 18.0002H14.8599L17.8599 20.7302C18.0444 20.9028 18.2873 20.9993 18.5399 21.0002C18.6771 20.9987 18.8128 20.9716 18.9399 20.9202C19.1188 20.8421 19.2709 20.7134 19.3776 20.5499C19.4842 20.3865 19.5406 20.1954 19.5399 20.0002V8.00019C19.54 7.60283 19.4611 7.20943 19.3078 6.84282C19.1546 6.47621 18.93 6.1437 18.6472 5.8646C18.3643 5.58549 18.0289 5.36535 17.6603 5.21696C17.2917 5.06857 16.8973 4.99489 16.4999 5.00019V5.00019Z" fill="black"/>
  </svg>`,
  comment_reject:`<svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.0001 3.99999H13.0001C12.7349 3.99999 12.4805 4.10535 12.293 4.29289C12.1055 4.48042 12.0001 4.73478 12.0001 4.99999C12.0001 5.26521 12.1055 5.51956 12.293 5.7071C12.4805 5.89464 12.7349 5.99999 13.0001 5.99999H17.0001C17.2653 5.99999 17.5197 6.10535 17.7072 6.29289C17.8948 6.48042 18.0001 6.73478 18.0001 6.99999V16.72L16.4301 15.27C16.2457 15.0973 16.0027 15.0009 15.7501 15H7.00011C6.73489 15 6.48054 14.8946 6.293 14.7071C6.10547 14.5196 6.00011 14.2652 6.00011 14V13C6.00011 12.7348 5.89475 12.4804 5.70722 12.2929C5.51968 12.1054 5.26533 12 5.00011 12C4.73489 12 4.48054 12.1054 4.293 12.2929C4.10547 12.4804 4.00011 12.7348 4.00011 13V14C4.00011 14.7956 4.31618 15.5587 4.87879 16.1213C5.4414 16.6839 6.20446 17 7.00011 17H15.3601L18.3601 19.73C18.5343 19.8936 18.7614 19.9894 19.0001 20C19.1373 19.9985 19.2729 19.9714 19.4001 19.92C19.579 19.8419 19.7311 19.7132 19.8377 19.5497C19.9443 19.3863 20.0008 19.1952 20.0001 19V6.99999C20.0001 6.20434 19.684 5.44128 19.1214 4.87867C18.5588 4.31606 17.7958 3.99999 17.0001 3.99999ZM8.54011 8.53999C9.35903 7.72314 9.86941 6.64763 9.98431 5.49669C10.0992 4.34575 9.81152 3.19057 9.17025 2.22794C8.52899 1.26532 7.57381 0.554797 6.46744 0.217421C5.36107 -0.119954 4.17196 -0.0633141 3.10267 0.377693C2.03337 0.8187 1.15005 1.61679 0.603187 2.63601C0.0563183 3.65523 -0.120269 4.83253 0.103507 5.96734C0.327283 7.10215 0.93758 8.12427 1.83043 8.85959C2.72328 9.59491 3.84345 9.99793 5.00011 9.99999C5.65716 10.0012 6.308 9.87283 6.91542 9.62231C7.52283 9.37179 8.07492 9.00401 8.54011 8.53999ZM2.00011 4.99999C2.00011 4.20434 2.31618 3.44128 2.87879 2.87867C3.4414 2.31606 4.20446 1.99999 5.00011 1.99999C5.44371 2.00412 5.88087 2.10658 6.28011 2.29999L2.28011 6.29999C2.0907 5.89306 1.99502 5.44882 2.00011 4.99999ZM7.70011 3.70999C7.89496 4.11227 7.99746 4.55301 8.00011 4.99999C7.99789 5.50444 7.8685 6.00018 7.62391 6.44137C7.37932 6.88256 7.02743 7.25494 6.60078 7.52409C6.17413 7.79324 5.6865 7.95046 5.18299 7.9812C4.67947 8.01195 4.17634 7.91523 3.72011 7.69999L7.70011 3.70999Z" fill="black"/>
  </svg>`,
  comment_edit:`<svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.5001 3.49982H12.5001C12.2348 3.49982 11.9805 3.60517 11.793 3.79271C11.6054 3.98025 11.5001 4.2346 11.5001 4.49982C11.5001 4.76503 11.6054 5.01939 11.793 5.20692C11.9805 5.39446 12.2348 5.49982 12.5001 5.49982H16.5001C16.7653 5.49982 17.0196 5.60517 17.2072 5.79271C17.3947 5.98025 17.5001 6.2346 17.5001 6.49982V16.2198L15.9301 14.7698C15.7456 14.5972 15.5027 14.5007 15.2501 14.4998H6.50006C6.23484 14.4998 5.98049 14.3945 5.79295 14.2069C5.60542 14.0194 5.50006 13.765 5.50006 13.4998V12.4998C5.50006 12.2346 5.3947 11.9802 5.20717 11.7927C5.01963 11.6052 4.76528 11.4998 4.50006 11.4998C4.23484 11.4998 3.98049 11.6052 3.79295 11.7927C3.60542 11.9802 3.50006 12.2346 3.50006 12.4998V13.4998C3.50006 14.2955 3.81613 15.0585 4.37874 15.6211C4.94135 16.1837 5.70441 16.4998 6.50006 16.4998H14.8601L17.8601 19.2298C18.0445 19.4025 18.2874 19.4989 18.5401 19.4998C18.6772 19.4983 18.8129 19.4712 18.9401 19.4198C19.1189 19.3417 19.2711 19.213 19.3777 19.0496C19.4843 18.8861 19.5407 18.695 19.5401 18.4998V6.49982C19.5401 6.10246 19.4612 5.70906 19.3079 5.34245C19.1547 4.97584 18.9301 4.64333 18.6473 4.36423C18.3645 4.08512 18.029 3.86498 17.6604 3.71659C17.2918 3.5682 16.8974 3.49452 16.5001 3.49982ZM7.08006 10.4998H9.50006C9.76528 10.4998 10.0196 10.3945 10.2072 10.2069C10.3947 10.0194 10.5001 9.76503 10.5001 9.49982V7.07982C10.5008 6.94821 10.4756 6.81775 10.4258 6.69591C10.3761 6.57407 10.3027 6.46326 10.2101 6.36982L4.63006 0.789816C4.4427 0.603565 4.18925 0.499023 3.92506 0.499023C3.66087 0.499023 3.40742 0.603565 3.22006 0.789816L0.79006 3.21982C0.603809 3.40718 0.499268 3.66063 0.499268 3.92482C0.499268 4.189 0.603809 4.44245 0.79006 4.62982L6.37006 10.2098C6.4635 10.3025 6.57432 10.3758 6.69615 10.4256C6.81799 10.4754 6.94845 10.5006 7.08006 10.4998ZM3.92006 2.90982L8.50006 7.48982V8.48982H7.50006L2.91006 3.91982L3.92006 2.90982Z" fill="black"/>
  </svg>`,
  dislike:`<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 0H4.26998C3.56817 0.000233904 2.88865 0.246509 2.34966 0.695976C1.81066 1.14544 1.4463 1.76965 1.31998 2.46L0.0499768 9.46C-0.0291548 9.89244 -0.0122784 10.337 0.0994115 10.7622C0.211101 11.1874 0.414875 11.5828 0.696313 11.9206C0.977751 12.2583 1.32997 12.53 1.72806 12.7166C2.12614 12.9031 2.56036 12.9999 2.99998 13H7.55998L6.99998 14.43C6.76704 15.0561 6.68947 15.7294 6.77391 16.3921C6.85835 17.0548 7.10229 17.6871 7.48479 18.2348C7.86729 18.7825 8.37695 19.2292 8.97004 19.5367C9.56312 19.8441 10.2219 20.0031 10.89 20C11.0823 19.9996 11.2705 19.9437 11.4319 19.8391C11.5933 19.7344 11.7211 19.5854 11.8 19.41L14.65 13H17C17.7956 13 18.5587 12.6839 19.1213 12.1213C19.6839 11.5587 20 10.7956 20 10V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0ZM13 11.79L10.28 17.91C10.0017 17.8258 9.74355 17.6855 9.52152 17.4978C9.29949 17.31 9.11825 17.0788 8.98896 16.8183C8.85967 16.5579 8.78508 16.2737 8.76978 15.9834C8.75448 15.693 8.79878 15.4026 8.89998 15.13L9.42998 13.7C9.54291 13.3977 9.58104 13.0727 9.5411 12.7525C9.50117 12.4323 9.38436 12.1265 9.20064 11.8613C9.01693 11.596 8.77176 11.3791 8.48607 11.2292C8.20038 11.0792 7.88264 11.0006 7.55998 11H2.99998C2.85307 11.0002 2.70791 10.9681 2.57482 10.9059C2.44174 10.8437 2.324 10.7529 2.22998 10.64C2.13364 10.5287 2.06308 10.3975 2.02332 10.2557C1.98356 10.114 1.97559 9.96518 1.99998 9.82L3.26998 2.82C3.31257 2.58704 3.43646 2.37676 3.61959 2.2266C3.80271 2.07644 4.03319 1.99614 4.26998 2H13V11.79ZM18 10C18 10.2652 17.8946 10.5196 17.7071 10.7071C17.5195 10.8946 17.2652 11 17 11H15V2H17C17.2652 2 17.5195 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V10Z" fill="black"/>
  </svg>`,
  like: `<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19.3 8.08004C19.019 7.74269 18.6674 7.47113 18.27 7.28452C17.8726 7.0979 17.439 7.0008 17 7.00004H12.44L13 5.57004C13.2329 4.94393 13.3105 4.27065 13.2261 3.60797C13.1416 2.94528 12.8977 2.31297 12.5152 1.76527C12.1327 1.21758 11.623 0.770841 11.0299 0.463388C10.4369 0.155934 9.77804 -0.00305943 9.11 4.45912e-05C8.91764 0.000445953 8.72948 0.0563198 8.56807 0.160967C8.40666 0.265615 8.27887 0.414594 8.2 0.590044L5.35 7.00004H3C2.20435 7.00004 1.44129 7.31611 0.87868 7.87872C0.316071 8.44133 0 9.2044 0 10V17C0 17.7957 0.316071 18.5588 0.87868 19.1214C1.44129 19.684 2.20435 20 3 20H15.73C16.4318 19.9998 17.1113 19.7535 17.6503 19.3041C18.1893 18.8546 18.5537 18.2304 18.68 17.54L19.95 10.54C20.0286 10.1074 20.011 9.66283 19.8987 9.23772C19.7864 8.81262 19.582 8.4174 19.3 8.08004ZM5 18H3C2.73478 18 2.48043 17.8947 2.29289 17.7072C2.10536 17.5196 2 17.2653 2 17V10C2 9.73483 2.10536 9.48047 2.29289 9.29294C2.48043 9.1054 2.73478 9.00004 3 9.00004H5V18ZM18 10.18L16.73 17.18C16.6874 17.413 16.5635 17.6233 16.3804 17.7734C16.1973 17.9236 15.9668 18.0039 15.73 18H7V8.21004L9.72 2.09004C9.99998 2.17167 10.26 2.31045 10.4837 2.49763C10.7073 2.6848 10.8897 2.91631 11.0194 3.17754C11.1491 3.43876 11.2232 3.72404 11.2371 4.01535C11.2509 4.30666 11.2043 4.59768 11.1 4.87004L10.57 6.30005C10.4571 6.6023 10.4189 6.92739 10.4589 7.24758C10.4988 7.56776 10.6156 7.87353 10.7993 8.13878C10.983 8.40404 11.2282 8.62091 11.5139 8.77088C11.7996 8.92086 12.1173 8.99948 12.44 9.00004H17C17.1469 8.99981 17.2921 9.03194 17.4252 9.09416C17.5582 9.15638 17.676 9.24716 17.77 9.36004C17.8663 9.47137 17.9369 9.60259 17.9767 9.74434C18.0164 9.88608 18.0244 10.0349 18 10.18Z" fill="black"/>
  </svg>
  `
  
}
/**
 * @element svg-button
 */
export class SvgButton extends ScopedElementsMixin(LitElement) {
  constructor() {
    super();
  }

  @property() button: string = "";
  @property() info: string = "";
  @property() infoPosition: string = "left";
  @property() enabled = true;
  @property() click = ()=>{};

  handleClick(e:any) {
    if (this.enabled) {
      e.stopPropagation()
      this.click()
    }
  }
  render() {
    //@ts-ignore
    const svg = SVG[this.button]
    return html`
      <div class="button row" uselectable="on">
        ${this.info && this.infoPosition==="left" ? html`<div class="info-item-name">${this.info}</div>`:""}
        <div class="icon ${this.enabled ? '' : 'disabled'}" @click=${this.handleClick}> ${unsafeHTML(svg)}</div>
        ${this.info && this.infoPosition==="right" ? html`<div class="info-item-name">${this.info}</div>`:""}
      </div>
    `;
  }
  static get styles() {
    return [
      sharedStyles,
      css`
      .button {
        align-items: center;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
      .icon:hover {
        background-color: #eee;
      }
      .icon {
        border-radius: 50%;
        display: flex;
        justify-content: space-around;
        padding: 3px;
        cursor: pointer;
      }
      .disabled {
        opacity: 30%;
        cursor: default;
      }
      .icon:hover.disabled  {
        background-color: transparent
      }
      .info-item-name {
        margin-right: 7px;
      }
      `,
    ];
  }
}
