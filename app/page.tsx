"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import styles from "./page.module.css"

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0)
  const [counter, setCounter] = useState("")

  const images = [
    "/images/f1.jpeg",
    "/images/f2.jpeg",
    "/images/f3.jpeg",
    "/images/f4.jpeg",
    "/images/f5.jpeg",
    "/images/f6.jpeg",
    "/images/f7.jpeg",
    "/images/f8.jpeg",
    "/images/f9.jpeg",
    "/images/f10.jpg",
    "/images/f11.jpg",
  ]

  useEffect(() => {
    // Carrossel de imagens com rotação automática
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)

    // Contador de tempo
    const counterInterval = setInterval(updateCounter, 1000)
    updateCounter()

    return () => {
      clearInterval(interval)
      clearInterval(counterInterval)
    }
  }, [])

  function updateCounter() {
    const startDate = new Date("2015-04-26T15:00:00")
    const now = new Date()
    const diff = now.getTime() - startDate.getTime()

    const years = now.getFullYear() - startDate.getFullYear()
    const months = now.getMonth() - startDate.getMonth() + years * 12
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    setCounter(
      `Juntos há ${years} anos, ${months % 12} meses, ${days % 30} dias, ` +
        `${hours} horas, ${minutes} minutos e ${seconds} segundos`,
    )
  }

  // Corações flutuando
  const createHearts = () => {
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement("div")
      heart.classList.add(styles.heart)
      heart.style.left = Math.random() * 100 + "vw"
      heart.textContent = "❤️"
      document.body.appendChild(heart)
      setTimeout(() => heart.remove(), 3000)
    }
  }

  return (
    <main className={styles.main}>
      <h1>Gutemberg & Thais</h1>

      <div className={styles.carousel}>
        {images.map((src, index) => (
          <div key={src} className={`${styles.carouselItem} ${index === currentImage ? styles.active : ""}`}>
            <Image
              src={src || "/placeholder.svg"}
              alt={`Foto ${index + 1}`}
              fill
              sizes="(max-width: 600px) 100vw, 600px"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className={styles.counter}>{counter}</div>

      <button className={styles.heartBtn} onClick={createHearts}>
        ❤️
      </button>

      <div className={styles.loveText}>
        <p>
          Oi amor, hoje estou escrevendo essa mensagem para eternizar tudo que eu sinto por você. Espero que nosso amor
          dure pra sempre, e que Deus continue abençoando nosso relacionamento. Eu te amo, e tudo o que vivemos serviu
          de aprendizado para nossa vida. quando te pedi em namoro no mar, ali eu não imaginava por tudo o que a gente
          ia passar, comecei já a imaginar foi quando te beijei pela primeira vez, kkk, na calçada da sua mãe. Espero
          que a gente possa viver ainda muitas experiências juntos ainda somos jovens. Ps: Eu, você e os Planos de Deus!
        </p>
      </div>

      <div className={styles.videoContainer}>
        <video autoPlay controls className={styles.video}>
          <source src="/videos/john-legend-all-of-me.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo HTML5.
        </video>
      </div>
    </main>
  )
}
