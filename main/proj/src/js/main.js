import MySuperSlider from "./slider/mySuperSlider";
import Anketa from "./anketa/anketa";

const slider = new MySuperSlider();
const anketa1 = new Anketa({
    wrapper: document.querySelector('.anketa-js'),
});

console.log(anketa1);

