import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { ReactSVG } from 'react-svg';

export default function CircularMenu() {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        gyroscope: false,
      });
    }
  }, []);

  return (
    <section className="flex justify-center items-center">
      <div
        ref={tiltRef}
        className="tilt-elements w-full max-w-xl"
        data-tilt
        data-tilt-max="15"
        data-tilt-gyroscope="false"
      >
        <ReactSVG
          src="/imgs/circular_5_opt_2.svg"
          beforeInjection={(svg) => {
            svg.classList.add('svg_content');
            svg.setAttribute('id', 'infographic');

            // Map each modal to a /notebooks/{slug} route
	    // This should be <name>.ipynb, but skipping the file extension
            const modalMap: Record<string, string> = {
              modal_s1: 'polynomials_over_subspaces/',
              modal_s2: 'stochastic_polynomials/',
              modal_s3: 'polynomial_gradients/',
              modal_s4: 'sparse_polynomials/',
              modal_s5: 'kernels_as_polynomials/',
              modal_s6: 'moments_and_sensitivity_analysis/',
              modal_s7: 'numerical_integration/',
              modal_s8: 'polynomials_over_cubes/',
            };

            Object.entries(modalMap).forEach(([modalId, slug]) => {
              // Replace the old onclick="goToModal(...)" logic
              const el = svg.querySelector(`[onclick="goToModal('#${modalId}')"]`);
              if (el) {
                el.removeAttribute('onclick');
                el.addEventListener('click', () => {
                  // window.location.href = `/notebooks/${slug}`;
		  window.location.assign(`/notebooks/${slug}`);
                });
                el.style.cursor = 'pointer';
              }
            });
          }}
        />
      </div>
    </section>
  );
}

