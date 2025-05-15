import React from 'react'

const Carousel = () => {
  return (
    <div>
    <section className="row">
        <div className="col-md-12">
            {/* Carousel */}
            <div className="carousel slide" data-bs-ride="carousel" id="mycarousel">
            {/* Carousel inner */}
            <div className="carousel-inner">
                {/* Image 1 */}
                <div className="carousel-item active">
                <img src="/images/slide10.jpg" alt="Slide6" className="d-block w-100" />
                </div>

                {/* Image 2 */}
                <div className="carousel-item">
                <img src="/images/slide2.webp" alt="Slide3" className="d-block w-100" />
                </div>

                {/* Image 3 */}
                <div className="carousel-item">
                <img src="/images/slide3.webp" alt="Slide" className="d-block w-100" />
                </div>
            </div>
            {/* Controls */}
            <a
                href="#mycarousel"
                className="carousel-control-prev"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon bg-danger"></span>
            </a>

            <a
                href="#mycarousel"
                className="carousel-control-next"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon bg-danger"></span>
            </a>
            </div>
        </div>
        </section>

    </div>
  )
}

export default Carousel