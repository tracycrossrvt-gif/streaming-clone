function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Featured Collection</p>

        <h1 className="hero__title">Into the Woods</h1>

        <p className="hero__description">
          Folk horror, haunted landscapes, and moonlit stories curated for the beautifully haunted.
        </p>

        <div className="hero__buttons">
          <button className="hero__button">
            Watch Now
          </button>

          <button className="hero__button hero__button--secondary">
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;