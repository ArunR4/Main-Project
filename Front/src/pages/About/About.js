import { useEffect } from "react";
import Card from "../../components/AlgoCard/Card";
import "./About.css";
import { useState } from "react";

const About = () => {
    const [counter, setCounter] = useState(2)
    const aboutCards = [
        { name: "HEF", para: "Contrast Limited Adaptive Histogram Equalization (CLAHE) is an image enhancement technique that improves the local contrast of an image by redistributing pixel intensities. Unlike traditional histogram equalization, CLAHE divides the image into small regions and applies histogram equalization independently to each region. This adaptive approach prevents over-amplification of noise and ensures that contrast enhancement is tailored to the characteristics of each local area. CLAHE is particularly useful for improving the visual quality of images with uneven illumination or varying contrast levels." },
        { name: "UM", para: "Contrast Limited Adaptive Histogram Equalization (CLAHE) is an image enhancement technique that improves the local contrast of an image by redistributing pixel intensities. Unlike traditional histogram equalization, CLAHE divides the image into small regions and applies histogram equalization independently to each region. This adaptive approach prevents over-amplification of noise and ensures that contrast enhancement is tailored to the characteristics of each local area. CLAHE is particularly useful for improving the visual quality of images with uneven illumination or varying contrast levels." },
        { name: "HEF", para: "Contrast Limited Adaptive Histogram Equalization (CLAHE) is an image enhancement technique that improves the local contrast of an image by redistributing pixel intensities. Unlike traditional histogram equalization, CLAHE divides the image into small regions and applies histogram equalization independently to each region. This adaptive approach prevents over-amplification of noise and ensures that contrast enhancement is tailored to the characteristics of each local area. CLAHE is particularly useful for improving the visual quality of images with uneven illumination or varying contrast levels." }
    ]
    useEffect(() => {
        const slides = document.querySelectorAll(".about-card");
        slides.forEach((el, i) => {
            el.style.left = `${i * 60 - 33}%`
        })
        slides[counter - 1].childNodes[0].style.display = 'none'
    }, []);

    const goPre = () => {
        setCounter(counter - 1);
        const slides = document.querySelectorAll(".about-card");
        slides.forEach((el, i) => {
            // el.style.transform = `translateX(${(counter+1)*1}%)`
            let val = Number((el.style.left).replace('%', ''))
            el.style.left = `${val + 60}%`
        })
        slides[counter - 1].childNodes[0].style.display = 'block'
        slides[counter - 2].childNodes[0].style.display = 'none'
    }
    const goNext = () => {
        setCounter(counter + 1);
        const slides = document.querySelectorAll(".about-card");
        slides.forEach((el, i) => {
            // el.style.transform = `translateX(-${(counter+1) * 100}%)`
            let val = Number((el.style.left).replace('%', ''))
            el.style.left = `${val - 60}%`
        })
        slides[counter - 1].childNodes[0].style.display = 'block'
        slides[counter].childNodes[0].style.display = 'none'
    }

    return (
        <div className="about" id="algo">
            <div className="about-intro">
                <p>
                    The DR (digital radiography) images may be obscured due to noise interference,
                    improper exposure, and the excessive thickness of human tissues, resulting in
                    indistinct edges and reduced contrast.
                </p>
                <p>
                    An image-enhancement algorithm based on wavelet multiscale decomposition is proposed to address the shortcomings of
                    existing single-scale image-enhancement algorithms. The proposed algorithm is
                    taking advantage of the interpolation, smoothness and normalization properties.
                </p>
            </div>
            <div className="about-algo">
                <div className="about-algo-controls">
                    <button onClick={counter - 1 == 0 ? null : goPre} style={counter - 1 == 0 ? { cursor: "not-allowed", } : null}><i className="fa-solid fa-circle-chevron-left"></i></button>
                    <p>{counter} of 3</p>
                    <button onClick={counter - 1 == 2 ? null : goNext} style={counter - 1 == 2 ? { cursor: "not-allowed", } : null}><i className="fa-solid fa-circle-chevron-right"></i></button>
                </div>
                <div className="about-algo-cards">
                    {aboutCards.map(el=><Card name={el.name} para={el.para}/>)}
                </div>
            </div>
        </div>
    );
}

export default About;