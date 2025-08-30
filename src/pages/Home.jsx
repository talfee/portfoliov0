import { lazy, Suspense, useState } from "react";
import useCurrentLocation from "../hooks/useCurrentLocation";
import "./home.css";

const Hero3D = lazy(() => import("../three/Hero3D"));

export default function Home() {
  const { data, loading } = useCurrentLocation();
  const isDay = data?.isDay ?? true;

  // expansion toggles
  const [introOpen, setIntroOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <main className="home">
      {/* Intro block */}
      <section className="intro">
        <p>I’m Tal!</p>
        <button
          className="expander"
          onClick={() => setIntroOpen(!introOpen)}
        >
          {introOpen ? "(-)" : "(+)"}
        </button>

        {introOpen && (
          <>
            <p>
              Professionally, my interests lie in creating engaging visual
              experiences, creating useful applications (web and mobile), and
              working with data (ML, bioinformatics).
            </p>
            <p>
              It’s pretty broad since I’m really open to learning anything and
              honestly am still discovering what I like.
            </p>
            <p>
              Personally, I’m interested in <a href="#">reading</a>,{" "}
              <a href="#">running</a>, <a href="#">photography</a>, and{" "}
              <a href="#">trying new food</a>.
            </p>
          </>
        )}
      </section>

      {/* Hero zone */}
      <section className="hero-zone">
        <div className="micro-label">
          <p>(+)</p>
          <p style={{ marginTop: "4px" }}>Try dragging the clouds around.</p>
        </div>

        <div className="hero-canvas">
          <Suspense
            fallback={
              <img
                src="/hero-fallback.jpg"
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            }
          >
            <Hero3D isDay={isDay} />
          </Suspense>
        </div>
      </section>

      {/* Location */}
      <section className="location">
        <p>
          {loading
            ? "Loading location…"
            : `${data.city}, ${data.province}`}
        </p>
        <button
          className="expander"
          onClick={() => setLocationOpen(!locationOpen)}
        >
          {locationOpen ? "(-)" : "(+)"}
        </button>

        {locationOpen && (
          <p>
            This background is synced to the timezone where I am right now. If
            you see the sun, it’s daytime for me, so feel free to shoot me an{" "}
            <a href="#">Email</a> or <a href="#">LinkedIn</a>! If you see the
            moon, I’m blissfully sleeping. zzz.
          </p>
        )}
      </section>
    </main>
  );
}
