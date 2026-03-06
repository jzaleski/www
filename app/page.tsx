"use client";

import { useEffect } from "react";
import Header from "./components/Header";
import ContentArea from "./components/ContentArea";
import Footer from "./components/Footer";

const HomePage = () => {
  useEffect(() => {
    const launchDate = new Date(2009, 10, 27, 12, 18, 5, 0);

    const updateClock = () => {
      const element = document.getElementById("clock");
      if (element) {
        const currentTime = new Date();
        let currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const currentSeconds = currentTime.getSeconds();
        const currentMinutesPadded = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
        const currentSecondsPadded = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
        const currentTimeOfDay = currentHours < 12 ? "AM" : "PM";
        currentHours = currentHours > 12 ? currentHours - 12 : currentHours;
        currentHours = currentHours === 0 ? 12 : currentHours;
        const currentTimeString = `${currentHours}:${currentMinutesPadded}:${currentSecondsPadded}&nbsp;${currentTimeOfDay}`;
        element.innerHTML = currentTimeString;
      }
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    let counter = 0;
    let showLaunchDate = false;
    const message = "Coming Soon!!1!";

    const updateMessage = () => {
      const element = document.getElementById("coming_soon");
      if (element && counter < message.length) {
        let currentHtml = element.innerHTML;
        if (currentHtml === "&nbsp;") {
          currentHtml = "";
        }
        const nextCharacter = message.substring(counter, counter + 1);
        if (nextCharacter) {
          currentHtml += nextCharacter;
          element.innerHTML = currentHtml;
        }
        counter++;
      } else if (element && !showLaunchDate) {
        element.innerHTML += '<br/><div id="launch_date">(since: ' + launchDate + ")</div>";
        showLaunchDate = true;
      }
    };

    const messageInterval = setInterval(updateMessage, 500);

    return () => {
      clearInterval(clockInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <>
      <Header />
      <ContentArea />
      <Footer />
    </>
  );
};

export default HomePage;
