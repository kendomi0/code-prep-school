import "../../shared/basic-page-setup";
import "./bubble-sort.css";
import "./bubble-sort-logic";
import { BubbleSortAnimation } from "./bubble-sort-animation";

const container = document.querySelector(".animation-container");
new BubbleSortAnimation(container);
