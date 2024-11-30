import React, { useEffect, useRef } from "react";
import * as VKID from "@vkid/sdk";

export default function SignInVk() {
  const containerRef = useRef(null);

  useEffect(() => {
    VKID.Config.init({
      app: 52208411,
      redirectUrl: "https://tools.ptahini.ru/signup/vk/",
      // Добавьте дополнительные параметры при необходимости
    });

    const oneTap = new VKID.OneTap();

    // Используйте setTimeout для небольшой задержки
    const timeoutId = setTimeout(() => {
      if (containerRef.current) {
        oneTap.render({
          container: containerRef.current,
          oauthList: ["mail_ru"],
        });
      } else {
        console.error("Container element is not available.");
      }
    }, 100); // Задержка в 100 мс

    // Очистка ресурсов при размонтировании
    return () => {
      clearTimeout(timeoutId); // Очистите таймер, если компонент размонтирован
      oneTap.close();
    };
  }, []);

  return <div ref={containerRef}></div>;
}
